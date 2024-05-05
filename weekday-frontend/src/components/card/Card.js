import React, { useCallback, useRef, useState } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentOffset } from "../../utils/cardDataSlice";
import Shimmer from "../shimmer/Shimmer";
import Modal from "../modal/Modal";

const Card = () => {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const cardData = useSelector((store) => store.cardData.cardData);
  const offset = useSelector((store) => store.cardData.currentOffset);
  const currentCount = useSelector((store) => store.cardData.currentCount);
  const totalCount = useSelector((store) => store.cardData.totalCount);
  const observer = useRef();
  const lastCard = useCallback(
    (input) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (totalCount > currentCount) dispatch(addCurrentOffset(offset + 1));
        }
      });
      if (input) observer.current.observe(input);
    },
    [currentCount]
  ); //used useCallback to mark the last card with useRef and once the last card is visible will trigger the api with next batch and having count as the dependency which will avoid infinite loop of calling API.
  let salaryRangeMsg;
  if (cardData.length === 0) return <Shimmer />;
  return (
    <>
      {showModal && <Modal data={text} setShowModal={setShowModal} />}
      <div className="card-container">
        {cardData &&
          cardData.map((e, i) => {
            (e.minJdSalary === null) ? salaryRangeMsg = `Upto ${ e.salaryCurrencyCode + e.maxJdSalary } LPA ✅` : salaryRangeMsg = `${e.salaryCurrencyCode + e.minJdSalary} - ${ e.salaryCurrencyCode + e.maxJdSalary } LPA ✅`;
            return (
              <div
                className="card"
                key={i}
                ref={cardData.length === i + 1 ? lastCard : null}
              >
                <div className="company-logo-details">
                  <div className="logo-container">
                    <img src={e.logoUrl} alt="" className="company-logo" />
                  </div>
                  <div className="job-details">
                    <h4 className="company-name">{e.companyName}</h4>
                    <p className="job-role">{e.jobRole}</p>
                    <p className="location">{e.location}</p>
                  </div>
                </div>
                <p className="salary">Estimated Salary:{salaryRangeMsg} </p>
                <p
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "pre-wrap",
                    textAlign: "justify",
                  }}
                >
                  {e.jobDetailsFromCompany.slice(0, 85) + "..."}
                </p>
                <p
                  onClick={() => {
                    setShowModal(!showModal);
                    setText(e.jobDetailsFromCompany);
                  }} className="view-more"
                >
                  View More
                </p>
                <a href={e.jdLink} target="blank">
                  <button className="easy-apply-btn">⚡️ Easy apply</button>
                </a>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Card;
