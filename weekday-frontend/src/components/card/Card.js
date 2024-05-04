import React, { useCallback, useRef } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentOffset } from "../../utils/cardDataSlice";

const Card = () => {
  const dispatch = useDispatch();
  const cardData = useSelector((store) => store.cardData.cardData);
  const offset = useSelector((store) => store.cardData.currentOffset);
  const hasMoreData = useSelector((store) => store.cardData.hasMoreData);
  const observer = useRef();
  const lastCard = useCallback((input) => {
    if(observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        dispatch(addCurrentOffset(offset+1));
      }
    })
    if(input) observer.current.observe(input);
  },[hasMoreData]);
  // console.log(cardData);
  let salaryRangeMsg;
  return (
    <div className="card-container">
      {cardData &&
        cardData.map((e, i) => {
          if (e.minJdSalary === null)
            salaryRangeMsg = `Upto ₹${e.maxJdSalary} LPA ✅`;
          else salaryRangeMsg = `₹${e.minJdSalary} - ₹${e.maxJdSalary} LPA ✅`;
          if (cardData.length === i + 1) {
            return (
              <div className="card" key={i} ref={lastCard}>
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
              </div>
            );
          } else {
            return (
              <div className="card" key={i}>
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
              </div>
            );
          }
        })}
    </div>
  );
};

export default Card;
