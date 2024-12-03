import React, { useContext, useState } from "react";
import "./style.css";
import FoodItemApi from "../data/FoodItemApi";
import { ProductContext } from "../data/ProductContext";
import BrandApi from "../data/BrandApi";
import DeliveryRestaurant from "../Restaurants/DeliveryRestaurants";
import Filters from "./Filters";

const Delivery = () => {
  // State to hold FoodItem data and Brand data
  const [FoodItemData] = useState(FoodItemApi);
  const [BrandApiData] = useState(BrandApi);

  // Accessing context to check if Filter list should be shown
  const { ShowFilterList } = useContext(ProductContext);

  // State to manage sliding through FoodItems and Brands
  const [slideFoodItems, setSlideFoodItems] = useState(0);
  const [slideBrands, setSlideBrands] = useState(0);

  // Accessing functions from context
  const { setValue } = useContext(ProductContext);
  const { Ordervalue } = useContext(ProductContext);

  // Storing Ordervalue in sessionStorage
  sessionStorage.setItem("Ordervalue", Ordervalue);

  return (
    <>
      {/* Filters component */}
      <Filters />

      {/* Main content */}
      <main style={{ opacity: ShowFilterList === true ? "1.5" : "1" }} className="main_container">
        <div className="Delivery_container">
          {/* Food Items section */}
          <div className="food_items_container">
            <p className="collection_title">Inspiration for your first order</p>
            <div className="food_products">
              <div className="Product_container">
                <div className="food-product-list">
                  {/* Mapping through FoodItems */}
                  {FoodItemData.map((curelem, index) => {
                    return (
                      <div
                        key={index} // Adding a unique key prop
                        style={{ transform: `translate(-${slideFoodItems * 100}%)` }}
                        onClick={() => setValue(index)}
                        className="food-details"
                      >
                        <div className="img">
                          <img src={curelem.image} alt="" />
                        </div>
                        <p className="name">{curelem.name}</p>
                      </div>
                    );
                  })}
                </div>
                {/* Slide buttons for FoodItems */}
                <div className="slide_btn">
                  <p
                    style={{ display: slideFoodItems === FoodItemData.length - 5 ? "none" : "grid" }}
                    onClick={() => setSlideFoodItems(slideFoodItems + 1)}
                    className="btn_right"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </p>
                  <p
                    style={{ display: slideFoodItems === 0 ? "none" : "grid" }}
                    onClick={() => setSlideFoodItems(slideFoodItems - 1)}
                    className="btn_left"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Brands section */}
          <div className="top_brands_container">
            <p className="collection_title">top brands for you</p>
            <div className="food_products">
              <div className="Product_container">
                <div className="brand-list">
                  {/* Mapping through Brands */}
                  {BrandApiData.map((curelem, index) => {
                    
                    return (
                      <div
                        key={index} // Adding a unique key prop
                        style={{ transform: `translate(-${slideBrands * 100}%)` }}
                        onClick={() => setValue(index)}
                        className="food-details"
                      >
                        <div className="img">
                          <img src={curelem.image} alt="" />
                        </div>
                        <p className="name">{curelem.name}</p>
                        <p className="delivery_time">{curelem.delivery_time + " min"}</p>
                      </div>
                    );
                  })}
                </div>
                {/* Slide buttons for Brands */}
                <div className="slide_btn">
                  <p
                    style={{ display: slideBrands === BrandApiData.length - 5 ? "none" : "grid" }}
                    onClick={() => setSlideBrands(slideBrands + 1)}
                    className="btn_right"
                  >
                    <i className="fa-solid fa-angle-right"></i>
                  </p>
                  <p
                    style={{ display: slideBrands === 0 ? "none" : "grid" }}
                    onClick={() => setSlideBrands(slideBrands - 1)}
                    className="btn_left"
                  >
                    <i className="fa-solid fa-angle-left"></i>
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Delivery Restaurants component */}
          <DeliveryRestaurant />
        </div>
      </main>
    </>
  );
};

export default Delivery;
