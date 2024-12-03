import React from "react";
import Filters from "./Filters"; // Importing the Filters component
import OrderOption from "./OrderOption"; // Importing the OrderOption component
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate()
  return (
    <>
      {/* Navbar container */}
      <div className="navbar_container">
        <div className="navbar">
          <div className="nav_top">
            <img
              onClick={() => navigate('/Delivery')}
              src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
              alt=""
              className="logo"
            />
            <div className="search_container">
              <div className="location">
                <div className="location_mark">
                  <p className="mark_logo">
                    <i class="fa-solid fa-location-dot"></i>
                  </p>
                  <p className="city">Dehradun</p>
                </div>
                <p className="caret">
                  <i class="fa-solid fa-caret-down"></i>
                </p>
              </div>
              <p className="search_icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </p>
              <input
                type="search"
                placeholder="Search for restaurant, cuisine or a dish"
                id="searchid"
                
              />
            </div>
            <div className="Registration">
              <p>Log in</p>
              <p>Sign up</p>
            </div>
          </div>
        </div>
      </div>

      {/* Render the OrderOption component */}
      <OrderOption/>

      {/* Render the Filters component */}
      <Filters/>
    </>
  );
};

export default Navbar;
