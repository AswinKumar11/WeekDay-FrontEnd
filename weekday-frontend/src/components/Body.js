import React from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import useFetchDataApi from "../utils/customHooks/useFetchDataApi";
import { useSelector } from "react-redux";

const Body = () => {
  const offset = useSelector((store) => store.cardData.currentOffset);
  useFetchDataApi(50,offset);
  return (
    <div>
      <Filter />
      <Card />
    </div>
  );
};

export default Body;
