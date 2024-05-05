import { useEffect } from "react";
import { CARD_DATA_API } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardData,
  addCurrentCount,
  addTotalCount,
} from "../cardDataSlice";

const useFetchDataApi = (limit) => {
  const dispatch = useDispatch();
  const offset = useSelector((store) => store.cardData.currentOffset);
  const currentCount = useSelector((store) => store.cardData.currentCount);
  const totalCount = useSelector((store) => store.cardData.totalCount);
  const fetchDataForMobile = async () => {
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
        dispatch(addCardData(data.jdList));
        totalCount === 0 && dispatch(addTotalCount(data.totalCount));
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchDataForMobile();
  }, [offset]);
};

export default useFetchDataApi;
