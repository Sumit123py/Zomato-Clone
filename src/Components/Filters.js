import React, { useState, useContext } from "react";
import FilterApi from "../data/FilterApi"; // Importing filter data
import AllRestaurants from "../data/AllRestaurants"; // Importing restaurant data
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import FiltersList from "./FiltersList"; // Importing FiltersList component

const Filters = () => {
  // State to hold filter data
  const [FilterApiData, setFilterApiData] = useState(FilterApi);
  const [cuisineData] = useState(AllRestaurants);

  // Accessing setShowFilterList function from ProductContext
  const { setShowFilterList } = useContext(ProductContext);

  // Accessing checked and setChecked functions from ProductContext
  const { checked, setChecked } = useContext(ProductContext);
  
  // State to manage applying filters
  const [Apply, setApply] = useState(false)

  // State to handle cuisine list visibility
  const [CuisineList, setCuisineList] = useState(false);

  // State to track selected filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Accessing setSelectedSort, setSelectedRating, and setSelectedCost functions from ProductContext
  const { setSelectedSort } = useContext(ProductContext);
  const { setSelectedRating } = useContext(ProductContext);
  const { setSelectedCost } = useContext(ProductContext);

  // Function to toggle filters
  const toggleFilter = (index, title) => {
    const nam = FilterApiData.find((curelem) => curelem.title === title);
    if (nam && nam.display === "none") {
      setSelectedFilters([...selectedFilters, title]);
    }
  };
  
  // Handling selected filters
  selectedFilters.find((item) =>
    item === "Rating 4+" ? setSelectedRating(4) : setSelectedRating(null)
  );

  // Function to remove filters
  const removeFilter = (index, title) => {
    if (!CuisineList) {
      setSelectedRating(null);
      const SelectedIndex = selectedFilters.indexOf(title);
      selectedFilters.splice(SelectedIndex, 1);
      setSelectedFilters(selectedFilters);

      const titleIndex = checked.indexOf(title);
      const FilterIndex = FilterApiData.indexOf(
        FilterApiData.find((item, i) => item.title === title)
      );
      checked.splice(titleIndex, 1);
      setChecked([...checked]);
      FilterApiData.splice(FilterIndex, 1);
      setFilterApiData([...FilterApiData]);
    }
  };

  // Function to show cuisine list
  const showCuisineList = () => {
    setCuisineList(true);
  };

  // Function to handle checkbox change
  const handleChange = (name, index) => {
    const isChecked = checked.includes(name);
    if (isChecked) {
      setChecked(checked.filter((item) => item !== name));
    } else {
      setChecked([...checked, name]);
      const newData = {
        title: name,
        index: index,
        close: <i class="fa-solid fa-xmark"></i>,
        bgColor: "rgb(0, 89, 255)",
        Color: "white",
        display: "block",
      };
      FilterApiData.unshift(newData);
    }
  };

  // Function to clear all filters
  const ClearAll = () => {
    setChecked([])
    setFilterApiData([])
    setCuisineList(false)
  };

  // Function to show filter list
  const handleShowFilterList = () => {
    setShowFilterList(true);
    setSelectedRating(null);
    setSelectedCost(null);
    setChecked([]);
  };

  return (
    <>
      <div className="filters_container">
        {/* Render FiltersList component */}
        <FiltersList />
        <div onClick={handleShowFilterList} className="filter">
          <p>
            <i class="fa-solid fa-filter"></i>
          </p>
          <p className="Filter-title">Filter</p>
        </div>
        {FilterApiData.map((curelem, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: selectedFilters.includes(curelem.title)
                  ? "rgb(0, 89, 255)"
                  : curelem.bgColor,
                color: selectedFilters.includes(curelem.title)
                  ? "white"
                  : curelem.Color,
              }}
              onClick={() => toggleFilter(index, curelem.title)}
              className="filter"
            >
              <p className="Filter-title">{curelem.title}</p>
              <p
                style={{
                  display: selectedFilters.includes(curelem.title)
                    ? "block"
                    : curelem.display,
                }}
                onClick={() => removeFilter(index, curelem.title)}
                className="remove_filter"
              >
                {curelem.close}
              </p>
            </div>
          );
        })}
        <div className="select">
          <div
            onClick={showCuisineList}
            style={{ color: "black" }}
            className="filter"
          >
            <p>Cuisines</p>
            <p>
              <i class="fa-solid fa-caret-down"></i>
            </p>
          </div>
          <div
            style={{ display: CuisineList ? "flex" : "none" }}
            className="filter_list"
          >
            <div className="nav">
              <p>Cuisines</p>
              <p
                onClick={() => setCuisineList(false)}
                className="close_cuisine_list"
              >
                <i class="fa-solid fa-xmark"></i>
              </p>
            </div>
            <div className="search_bar">
              <p>
                <i class="fa-solid fa-magnifying-glass"></i>
              </p>
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Search here"
              />
            </div>
            <div className="items_list">
              {cuisineData.map((curelem, index) => {
                return (
                  <div className="Items" key={index}>
                    <input
                      value={checked}
                      onChange={() => { handleChange(curelem.info.cuisine[0].name, index) }}
                      type="checkbox"
                      name="check"
                      id={`check${index}`}
                    />
                    <p className="item_name">
                      {curelem.info.cuisine[0].name}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="last_container">
              <div className="clear_apply">
                <p onClick={ClearAll} className="clear">
                  Clear All
                </p>
                <p onClick={() => {setCuisineList(false); setApply(true)}} className="apply">
                  Apply
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
