import React from "react";
import { Product } from "./Product";
import { getProduct } from "./actions/index";
import { useState, useEffect } from "react";
import { Pagination } from "antd";
export default function ProductListView({
  setIsLoading,
  setIsDetail,
  setShowList,
  setModifyProduct,
  offline,
  setOffline,
  setCreateProd,
}) {
  const [arr, setArr] = useState([]);
  const [minvalue, setMinValue] = useState(0);
  const [maxvalue, setMaxValue] = useState(1);
  const numEachPage = 4;
  function handleChange(value) {
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
  }
  useEffect(() => {
    async function getData() {
      const abc = await getProduct();
      // setArr(abc);
      // console.log(arr);
      //console.log(abc);
      abc.map((item) => {
        setArr((prevState) => {
          return [...prevState, item];
        });
      });

      setIsLoading(false);
    }
    getData();
    handleChange(1);
    return;
  }, []);
  return (
    <>
      <main className="container">
        <div className="list_view">
          <div className="row">
            {arr.slice(minvalue, maxvalue).map((product, index) => (
              <>
                <Product
                  key={product.id}
                  product={product}
                  index={index + minvalue}
                  setIsDetail={setIsDetail}
                  setShowList={setShowList}
                  setModifyProduct={setModifyProduct}
                  offline={offline}
                  setOffline={setOffline}
                  setCreateProd={setCreateProd}
                ></Product>
              </>
            ))}
          </div>
          <Pagination
            defaultCurrent={1}
            total={30}
            defaultPageSize={numEachPage} //default size of page
            onChange={handleChange}
          />
        </div>
      </main>
    </>
  );
}
