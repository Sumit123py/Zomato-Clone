import React, { useState, useContext } from "react";
import Restaurants_collection from "../data/RestaurantCollection"; // Importing restaurant collection data
import DiningRestaurants from "../Restaurants/DiningRestaurants"; // Importing DiningRestaurants component
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext from a file

const Dining = () => {
  // State to hold RestaurantCollection data
  const [RestaurantCollectionData] = useState(Restaurants_collection);

  // State to manage sliding through restaurant collections
  const [slideCollection, setSlideCollection] = useState(0);

  // Accessing Ordervalue from ProductContext
  const { Ordervalue } = useContext(ProductContext);

  // Storing Ordervalue in sessionStorage
  sessionStorage.setItem("Ordervalue", Ordervalue);

  return (
    <>
      {/* Main container for Dining section */}
      <div className="Dining_container">
        <div className="collection_container">
          {/* Title for restaurant collections */}
          <p className="collection_title">collections</p>
          
          {/* Container for restaurants collection */}
          <div className="restaurants_collection">
            <div className="restaurants_collection_list">
              {/* Mapping through RestaurantCollectionData */}
              {RestaurantCollectionData.map((curelem, index) => {
                return (
                  <div key={index} style={{ transform: `translate(-${slideCollection * 100}%)` }} className="bg">
                    <div className="img">
                      {/* Image for the restaurant collection */}
                      <img src={curelem.image} alt="" />
                      
                      {/* Title and number of places in the collection */}
                      <div className="restaurant_collection_title">
                        <p className="title">{curelem.title}</p>
                        <p className="places">{curelem.total_places}</p>
                      </div>
                      {/* Bottom element */}
                      <p className="bottom"></p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Slide buttons for restaurant collections */}
            <div className="slide_btn">
              <p style={{ display: slideCollection === RestaurantCollectionData.length - 4 ? 'none' : 'grid' }} onClick={() => setSlideCollection(slideCollection + 1)} className="btn_right">
                <i className="fa-solid fa-angle-right"></i>
              </p>
              <p style={{ display: slideCollection === 0 ? 'none' : 'grid' }} onClick={() => setSlideCollection(slideCollection - 1)} className="btn_left">
                <i className="fa-solid fa-angle-left"></i>
              </p>
            </div>
          </div>
        </div>
        {/* Component for displaying dining restaurants */}
        <DiningRestaurants />
      </div>
    </>
  );
};

export default Dining;
