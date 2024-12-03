import React, { useState, useContext } from "react";
import Restaurants_collection from "../data/RestaurantCollection";
import NightlifeRestaurants from "../Restaurants/NightlifeRestaurants";
import { ProductContext } from "../data/ProductContext";

const Nightlife = () => {
  // Initialize state for RestaurantCollectionData with data from Restaurants_collection
  const [RestaurantCollectionData] = useState(Restaurants_collection);

  // Access Ordervalue from ProductContext using useContext
  const { Ordervalue } = useContext(ProductContext);

  // Set Ordervalue in sessionStorage
  sessionStorage.setItem("Ordervalue", Ordervalue);

  return (
    <>
      <div className="Nightlife_container">
        <div className="collection_container">
          <p className="collection_title">collections</p>
          <div className="restaurants_collection">
            <div className="restaurants_collection_list">
              {/* Map over the RestaurantCollectionData array */}
              {RestaurantCollectionData.slice(5, 6).map((curelem, index) => {
                return (
                  <>
                    <div key={index} className="bg">
                      <div className="img">
                        {/* Display the image */}
                        <img src={curelem.image} alt="" />
                        <div className="restaurant_collection_title">
                          {/* Display the title and total_places */}
                          <p className="title">{curelem.title}</p>
                          <p className="places">{curelem.total_places}</p>
                        </div>
                        <p className="bottom"></p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        {/* Render the NightlifeRestaurants component */}
        <NightlifeRestaurants />
      </div>
    </>
  );
};

export default Nightlife;
