import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../data/ProductContext";
import CuisineFilter from "../Filters/CuisineFilterUI";
import DefaultFilter from "../Filters/DefaultFilter";
import Rating from "../Filters/Rating";
import Sorting from "../Filters/Sorting";
import CostFilter from "../Filters/CostFilter";


const DeliveryRestaurant = () => {

  window.dataLayer.push({ event: 'pageview' });

  // Get data and functions from ProductContext using useContext
  const { checked } = useContext(ProductContext);
  const { SelectedRating } = useContext(ProductContext);
  const { SelectedCost } = useContext(ProductContext);
  const { SelectedSort} = useContext(ProductContext);

  // Set up state for the filter component
  const [filterComponent, setFilterComponent] = useState(null)

  useEffect(() => {
    // Determine which filter component to render based on selected options
    if (
      SelectedSort !== null &&
      checked.length === 0 &&
      SelectedRating === null
    ) {
      setFilterComponent(<Sorting/>);
    } else if (
      SelectedRating === null &&
      checked.length > 0 &&
      SelectedSort !== null
    ) {
      setFilterComponent(<CuisineFilter/>)
    } else if (
      checked.length > 0 &&
      SelectedSort !== null &&
      SelectedRating !== null
    ) {
      setFilterComponent(<Rating/>);
    } 
    else if (
      checked.length > 0 &&
      SelectedSort !== null &&
      SelectedRating !== null && 
      SelectedCost !== null
    ) {
      setFilterComponent(<CostFilter/>);
    } 
     else {
      if((SelectedSort === null) && 
      (SelectedRating === null) && 
      checked.length > 0){
      setFilterComponent(<CuisineFilter/>)
      } else if (
        (SelectedSort === null) && 
        (checked.length > 0 || checked.length === 0) &&
        SelectedRating !== null
      ){
        setFilterComponent(<Rating/>)
      }
      else if (
        (checked.length > 0 || checked.length === 0) &&
        SelectedSort === null &&
        SelectedRating === null && 
        SelectedCost !== null
      ) {
        setFilterComponent(<CostFilter/>);
      } 
      else if (
        SelectedSort === null && 
        SelectedRating === null &&
        checked.length === 0
      ){
        setFilterComponent(<DefaultFilter/>)
      }
    }
  },[SelectedSort, SelectedRating, SelectedCost, checked])

  return (
    <>
      <div className="DeliveryRestaurant_container">
        <p className="collection_title">delivery restaurant in dehradun</p>
        <div className="restaurant_list">
          {filterComponent}
        </div>
      </div>
    </>
  );
};

export default DeliveryRestaurant;
