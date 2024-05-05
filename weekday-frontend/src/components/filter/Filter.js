import React, { useState } from "react";
import { FILTER_DROPDOWN_OPTIONS } from "../../utils/constants";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import { addFilteredCardData } from "../../utils/cardDataSlice";

const Filter = () => {
  const [width, setWidth] = useState(15);
  const cardData = useSelector((store) => store.cardData.cardData);
  const dispatch = useDispatch();
  const handleOnchange = (val) => {
    if (val.length === 0) {
      dispatch(addFilteredCardData(cardData));
      setWidth(15);
      return;
    }

    console.log(val);
    const filterData = val.split(",");
    console.log(filterData);
    const filteredCardData = cardData.filter((e) => {
      console.log(e);
      if (
        filterData.includes(e.jobRole) ||
        filterData.includes(e.numberOfEmployees) ||
        filterData.includes(e.experience) ||
        filterData.includes(e.location)
      )
        return e;
      else return null;
    });
    dispatch(addFilteredCardData(filteredCardData));
    console.log(filteredCardData);
    setWidth(width + 5);
  };
  return (
    <div className="filter">
      {FILTER_DROPDOWN_OPTIONS.map((option, i) => (
        <>
          <MultiSelect
            onChange={handleOnchange}
            key={i}
            options={option?.options}
            style={{ margin: "2%", width: width + "%" }}
          />
        </>
      ))}
    </div>
  );
};

export default Filter;
