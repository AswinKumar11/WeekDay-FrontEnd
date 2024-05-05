import React, { useEffect, useRef, useState } from "react";
import { CARD_DATA_API, FILTER_DROPDOWN_OPTIONS } from "../../utils/constants";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCurrentCount,
  addFilteredCardData,
  addTotalCount,
} from "../../utils/cardDataSlice";

const Filter = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const cardData = useSelector((store) => store.cardData.cardData);
  const currentCount = useSelector((store) => store.cardData.currentCount);
  const totalCount = useSelector((store) => store.cardData.totalCount);
  const dispatch = useDispatch();
  const [debounceText, setDebounceText] = useState("");
  const searchText = useRef(null);
  const fetchDataForFilter = async (limit, offset) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: limit,
      offset: offset,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    fetch(CARD_DATA_API, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        const currentDataCount = currentCount + data.jdList.length;
        dispatch(addCurrentCount(currentDataCount));
        dispatch(addFilteredCardData(data.jdList));
        totalCount === 0 && dispatch(addTotalCount(data.totalCount));
      })
      .catch((error) => console.error(error));
  };
  const handleOnchange = (val) => {
    if (val.length === 0) {
      setErrorMessage(false);
      fetchDataForFilter(50, 1);
    }
    const filterData = val.split(",");
    if (filterData.length > 0 && filterData[0] !== "") {
      const filteredCardData = cardData.filter((e) => {
        if (
          filterData.includes(e.jobRole) ||
          filterData.includes(e.numberOfEmployees) ||
          filterData.includes(e.experience) ||
          filterData.includes(e.location)
        )
          return e;
        else return null;
      });
      if (filteredCardData.length === 0) {
        dispatch(addFilteredCardData([]));
        setErrorMessage(true);
      } else {
        setErrorMessage(false);
        dispatch(addFilteredCardData(filteredCardData));
      }
    }
    else setErrorMessage(false);
  };
  useEffect(() => {
    handleSearch();
  }, [debounceText]);
  const handleSearch = () => {
    if (searchText.current.value.length === 0) {
      setErrorMessage(false);
      fetchDataForFilter(50, 1);
    } else {
      setErrorMessage(false);
      setTimeout(() => {
        const filteredCardData = cardData.filter((e) => {
          if (
            searchText.current.value.toLowerCase() ===
            e.companyName.toLowerCase()
          )
            return e;
          else return null;
        });
        if (filteredCardData.length === 0) {
          setErrorMessage(true);
          dispatch(addFilteredCardData([]));
        } else dispatch(addFilteredCardData(filteredCardData));
      }, 1000);
    }
  };
  const debounce = (cb, delay = 1000) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  const updateDebounce = debounce((text) => setDebounceText(text));
  return (
    <div className="filter-div">
      <div className="filter-dropdown">
        {FILTER_DROPDOWN_OPTIONS.map((option, i) => (
          <MultiSelect
            className="multi-select"
            placeholder={option?.name}
            onChange={handleOnchange}
            key={i}
            options={option?.options}
          />
        ))}
        <div>
          <input
            type="input"
            placeholder="Search For Companies"
            className="search-input"
            ref={searchText}
            onChange={() => updateDebounce(searchText.current.value)}
          ></input>
        </div>
      </div>
      {errorMessage === true && <h1>No Record Found</h1>}
    </div>
  );
};

export default Filter;
