import React, { useState, useContext, useEffect } from "react";
import Sort from "../data/SortApi"; // Importing Sort data
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext

const SortingFilter = () => {
  const [SortData] = useState(Sort); // Initializing SortData state with Sort

  const [selected, setSelected] = useState(null); // Initializing selected state with null

  const { setSelectedSort } = useContext(ProductContext); // Getting setSelectedSort function from ProductContext

  useEffect(() => {
    const savedTitle = sessionStorage.getItem('title');
    if (savedTitle) {
      const savedIndex = SortData.findIndex(curelem => curelem.title === savedTitle);
      setSelected(savedIndex);
    }
  }, [SortData]);

  const SortSelected = (title, index) => {
    setSelectedSort(title);
    sessionStorage.setItem('title', title);
    setSelected(index);
  };

  return (
    <> 
      <div className="right_container">
        {SortData.map((curelem, index) => {
          return (
            <div key={index} onClick={() => setSelected(index)} className="sort_method">
              <div
                onClick={() => SortSelected(curelem.title)}
                style={{
                  border:
                    selected === index
                      ? "1px solid rgb(239, 79, 95)"
                      : "1px solid rgb(156, 156, 156)",
                }}
                className="checkbox"
              >
                <p
                  style={{ display: selected === index ? "block" : "none" }}
                  className="inner_circle"
                ></p>
              </div>
              <p className="title">{curelem.title}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SortingFilter;
