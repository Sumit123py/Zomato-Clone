import React, { useState, useContext } from "react";
import All_filter from "../data/All_filter"; // Importing filter data
import SortingFilter from "../Filters/SortingFilterUI"; // Importing SortingFilterUI component
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import Cuisine from "../Filters/Cuisine"; // Importing Cuisine component
import RatingFilter from '../Filters/RatingFilterUI'; // Importing RatingFilterUI component
import CostFilter from "../Filters/CostFilterUI"; // Importing CostFilterUI component

const FiltersList = () => {
  // State to hold filter data
  const [AllFilterData] = useState(All_filter);
  const [value, setValue] = useState(0);

  // Accessing ShowFilterList and setShowFilterList functions from ProductContext
  const { ShowFilterList, setShowFilterList } = useContext(ProductContext);

  // Accessing SelectedSort from ProductContext
  const { SelectedSort } = useContext(ProductContext);

  // Function to handle closing filter list
  const handleShowFilterList = () => {
    setShowFilterList(false);
  }

  // Saving SelectedSort to sessionStorage
  // sessionStorage.setItem('selectedsort', SelectedSort)

  return (
    <>
      {/* Main filter container */}
      <div style={{ transform: `scale(${ShowFilterList ? '1.2' : '0'})`, transition: 'all 0.5s ease' }} className="main_filter_container"></div>

      {/* Filters list container */}
      <div style={{ transform: `scale(${ShowFilterList ? '1.2' : '0'})`, transition: 'all 0.5s ease' }} className="FiltersList_container">
        <div className="head_title">
          <p>Filters</p>
          <p onClick={handleShowFilterList}>
            <i className="fa-solid fa-xmark"></i>
          </p>
        </div>
        <div className="All_filters">
          <div className="left_container">
            {AllFilterData.map((curelem, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setValue(index)}
                  className={`filters ${value === index ? "active" : ""}`}
                >
                  <p className="sorting">{curelem.title}</p>
                  <p style={{ display: index === 0 ? 'block' : 'none' }} className="selected">{SelectedSort}</p>
                </div>
              );
            })}
            <p
              style={{ transform: `translateY(${value * 100}%)` }}
              className="left_border"
            ></p>
          </div>
          {/* Rendering corresponding filter component based on selected value */}
          {value === 0 ? <SortingFilter /> : value === 1 ? <Cuisine /> : value === 2 ? <RatingFilter /> : value === 3 ? <CostFilter /> : null}
        </div>
      </div>
    </>
  );
};

export default FiltersList;
