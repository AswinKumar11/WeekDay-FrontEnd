import React from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import useFetchDataApi from "../utils/customHooks/useFetchDataApi";
import { useSelector } from "react-redux";
import Header from "./header/Header";

const Body = () => {
  const offset = useSelector((store) => store.cardData.currentOffset);
  useFetchDataApi(50,offset);
  return (
    <div>
      <Header />
      <Filter />
      <Card />
    </div>
  );
};

export default Body;
