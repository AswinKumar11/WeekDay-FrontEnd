import React, { useCallback, useRef } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentOffset } from "../../utils/cardDataSlice";
import ParagraphContainer from "../ParagraphContainer";
import Shimmer from "../shimmer/Shimmer";

const Card = () => {
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
    <div className="card-container">
      {cardData &&
        cardData.map((e, i) => {
          if (e.minJdSalary === null)
            salaryRangeMsg = `Upto ${
              e.salaryCurrencyCode + e.maxJdSalary
            } LPA ✅`;
          else
            salaryRangeMsg = `${e.salaryCurrencyCode + e.minJdSalary} - ${
              e.salaryCurrencyCode + e.maxJdSalary
            } LPA ✅`;
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
              <ParagraphContainer
                text={e.jobDetailsFromCompany}
                maxLength={75}
              />
              <a href={e.jdLink} target="blank">
                <button className="easy-apply-btn">⚡️ Easy apply</button>
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default Card;
