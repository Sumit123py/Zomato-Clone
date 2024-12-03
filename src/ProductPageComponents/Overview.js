import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../data/ProductContext";

const Overview = () => {
  // Accessing data from ProductContext
  const { DeliveryRestaurantProductPageData } = useContext(ProductContext);
  const { DiningRestaurantProductPageData } = useContext(ProductContext);
  const { NightlifeRestaurantProductPageData } = useContext(ProductContext);

  // Accessing Ordervalue from ProductContext and initializing ProductPageData state
  const { Ordervalue } = useContext(ProductContext);
  const [ProductPageData, setProductPageData] = useState([]);

  useEffect(() => {
    // Update ProductPageData based on Ordervalue
    if (Ordervalue === 0) {
      setProductPageData(DeliveryRestaurantProductPageData);
    } else if (Ordervalue === 1) {
      setProductPageData(DiningRestaurantProductPageData);
    } else if (Ordervalue === 2) {
      setProductPageData(NightlifeRestaurantProductPageData);
    }
  }, [DeliveryRestaurantProductPageData, DiningRestaurantProductPageData, NightlifeRestaurantProductPageData, Ordervalue]);

  return (
    <>
      <div className="overview_container">
        <div className="overview">
          {/* About this place section */}
          <p className="page_title">About this place</p>
          {/* Safety measures */}
          <div className="safety_measures">
            {/* Safety measure box 1 */}
            <div className="safety_box">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/ebd42529c3342bdaf8b624a63a571fcc1585754330.png"
                alt=""
              />
              <div className="safety_titles">
                <p className="title1">RESTAURANT SAFETY MEASURE</p>
                <p className="title2">Well Sanitized Kitchen</p>
              </div>
            </div>
            {/* Safety measure box 2 */}
            <div className="safety_box">
              <img
                src="https://b.zmtcdn.com/data/o2_assets/fa7443fb81df3ff2c54186672599c3db1585754076.png"
                alt=""
              />
              <div className="safety_titles">
                <p className="title1">RESTAURANT SAFETY MEASURE</p>
                <p className="title2">Rider Hand Wash</p>
              </div>
            </div>
          </div>

          {/* Menu section */}
          <div className="menu">
            <p className="title">Menu</p>
            <img
              src="https://b.zmtcdn.com/data/menus/424/3500424/0a7181e52bd8f369eaea942b331bbf27.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
              alt=""
              className="menu_img"
            />
            <p>Menu</p>
          </div>

          {/* Cuisines section */}
          <div className="cuisine">
            <p className="title">Cuisines</p>
            <div className="cuisine_list">
              <p>North Indian</p>
              <p>South Indian</p>
              <p>Chinese</p>
              <p>Momos</p>
              <p>Fast Food</p>
              <p>Bakery</p>
              <p>Desserts</p>
              <p>Beverages</p>
            </div>
          </div>

          {/* Popular Dishes section */}
          <div className="popular_dishes">
            <p className="title">Popular Dishes</p>
            <div className="dishes_list">
              <p>Pineapple Cake,</p>
              <p>Honey Chilli Potatoes,</p>
              <p>Noodle,</p>
              <p>Manchurian,</p>
              <p>Chicken Momos,</p>
              <p>Burgers</p>
            </div>
          </div>

          {/* People Say This Place Is Known For section */}
          <div className="place">
            <p className="title">People Say This Place Is Known For</p>
            <div className="place_list">
              Good Crowd, Cozy Ambiance, Prompt Service, Low Price, Reasonable Prices, Good Delivery
            </div>
          </div>

          {/* Average Cost section */}
          <div className="cost">
            <p className="title">Average Cost</p>
            <p className="price">₹300 for two people (approx.)</p>
          </div>

          {/* More Info section */}
          <div className="more_info">
            <p className="title">More Info</p>
            <div className="more">
              {/* Information 1 */}
              <div className="info">
                <p className="icon">
                  <i class="fa-solid fa-check"></i>
                </p>
                <p>Breakfast</p>
              </div>
              {/* Information 2 */}
              <div className="info">
                <p className="icon">
                  <i class="fa-solid fa-check"></i>
                </p>
                <p>Home Delivery</p>
              </div>
              {/* Information 3 */}
              <div className="info">
                <p className="icon">
                  <i class="fa-solid fa-check"></i>
                </p>
                <p>Takeaway</p>
              </div>
              {/* Information 4 */}
              <div className="info">
                <p className="icon">
                  <i class="fa-solid fa-check"></i>
                </p>
                <p>Desserts and Bakes</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information section */}
        <div className="contact_container">
          <div className="contact">
            <p className="title">Call</p>
            <p className="number">+919997390000</p>
          </div>

          {/* Direction section */}
          <div className="Direction">
            <p className="title">Direction</p>
            <img
              src="https://maps.zomato.com/php/staticmap?center=30.3240983328,78.0415578559&maptype=zomato&markers=30.3240983328,78.0415578559,pin_res32&sensor=false&scale=2&zoom=16&language=en&size=240x150&size=400x240&size=650x250"
              alt="map"
            />
            <p className="address">{ProductPageData.address}</p>
          </div>

          {/* Copy Direction Link */}
          <div className="copy_direction">
            <Link
              target="_blank"
              to={`https://www.google.co.in/maps/dir//${ProductPageData.address}`}
              className="Direction"
            >
              <p className="icon"><i class="fa-solid fa-diamond-turn-right"></i></p>
              <p>Direction</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
