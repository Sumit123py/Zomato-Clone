import React, { useState, useContext } from "react";
import { ProductContext } from "../data/ProductContext";
import CostApi from "../data/CostApi";

const CostFilterUI = () => {
  // Importing CostApi data
  const [CostData] = useState(CostApi);

  // State to manage the selected cost index
  const [selectedCostIndex, setSelectedCostIndex] = useState(null);

  // Accessing setSelectedCost function from ProductContext
  const { setSelectedCost } = useContext(ProductContext);

  // Function to handle when a cost option is selected
  const CostSelected = (title) => {
    setSelectedCost(title);
  };

  return (
    <>
      <div className="right_container">
        {CostData.map((curelem, index) => {
          return (
            <>
              <div key={index} onClick={() => setSelectedCostIndex(index)} className="sort_method">
                <div
                  onClick={() => CostSelected(curelem.cost)}
                  style={{
                    border:
                      selectedCostIndex === index
                        ? "1px solid rgb(239, 79, 95)"
                        : "1px solid rgb(156, 156, 156)",
                  }}
                  className="checkbox"
                >
                  <p
                    style={{ display: selectedCostIndex === index ? "block" : "none" }}
                    className="inner_circle"
                  ></p>
                </div>
                <p className="title">{curelem.cost}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CostFilterUI;
