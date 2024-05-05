import React from "react";
import { FILTER_DROPDOWN_OPTIONS } from "../../utils/constants";
import "./filter.css";

const Filter = () => {
  return (
    <div className="filter">
      {FILTER_DROPDOWN_OPTIONS.map((option) => (
        <select
          name={option.name}
          id={option.value}
          key={option.value}
          className="dropdown"
        >
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      ))}
    </div>
  );
};

export default Filter;
