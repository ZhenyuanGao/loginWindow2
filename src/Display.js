import React from "react";
import { DetailsModal } from "./ExtraModal";
import { useState, useEffect } from "react";
import { getProduct } from "./actions/index";

export default function Display({
  isDetail,
  setIsDetail,
  offline,
  setOffline,
  setForShopping,
}) {
  const [arr1, setArr1] = useState([]);
  const [fetchD, setFetchData] = useState(true);
  useEffect(() => {
    async function getData() {
      const abc = await getProduct();
      // setArr(abc);
      // console.log(arr);
      //console.log(abc);
      abc.map((item) => {
        setArr1((prevState) => {
          return [...prevState, item];
        });
      });

      setFetchData(false);
    }
    getData();
    return;
  }, []);

  if (fetchD === true) {
    return <div></div>;
  } else {
    return (
      <DetailsModal
        imageLink={arr1[isDetail].image}
        showModal={!(isDetail === -1)}
        description={arr1[isDetail].description}
        setIsDetail={setIsDetail}
        forShopping={false}
        offline={offline}
        setOffline={setOffline}
        price={arr1[isDetail].price}
        name={arr1[isDetail].name}
        setForShopping={setForShopping}
      ></DetailsModal>
    );
  }
}
