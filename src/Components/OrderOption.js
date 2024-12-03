import React, { useContext, useState } from "react";
import Api1 from "../data/Api1";
import { Link } from "react-router-dom";
import { ProductContext } from "../data/ProductContext";

const OrderOption = () => {
  // Initialize state for ApiData with data from Api1
  const [ApiData] = useState(Api1);

  // Access Ordervalue and setOrderValue from ProductContext using useContext
  const { Ordervalue, setOrderValue } = useContext(ProductContext);

  // Set Ordervalue in sessionStorage
  sessionStorage.setItem("Ordervalue", Ordervalue);

  return (
    <>
      <div className="order_option_container">
        <div className="order_option">
          {ApiData.map((curelem, index) => {
            return (
              <>
                {/* Link to Mainpage and setOrderValue on click */}
                <Link
                  key={index}
                  to={`/Mainpage`}
                  onClick={() => setOrderValue(index)}
                  className="option_type"
                >
                  <div
                    style={{
                      background:
                        Ordervalue === index ? "orange" : "rgb(231, 236, 236)",
                    }}
                    className="img"
                  >
                    <img
                      style={{
                        filter:
                          Ordervalue === index ? "grayscale(0)" : "grayscale(1.9)",
                      }}
                      src={curelem.icon}
                      alt=""
                    />
                  </div>
                  <p
                    style={{
                      color: Ordervalue === index ? "orangered" : "black",
                    }}
                    className="name"
                  >
                    {curelem.name}
                  </p>
                  <p
                    style={{
                      transform: `scale(${
                        Ordervalue === index ? "1, 1" : "0, 1"
                      })`,
                    }}
                    className="border_bottom"
                  ></p>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderOption;
