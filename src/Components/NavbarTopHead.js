import React, { useState, useContext } from "react";
import SignUp from "../User/SignUp"; // Importing the SignUp component
import { ProductContext } from "../data/ProductContext"; // Importing the ProductContext
import Login from "../User/Login"; // Importing the Login component
import { Link } from "react-router-dom"; // Importing Link from react-router-dom
import ReactGA from "react-ga4";
const NavbarTopHead = () => {
  const { setRestaurantSearchData } = useContext(ProductContext); // Getting setRestaurantSearchData function from ProductContext

  const { setShowSignUp } = useContext(ProductContext); // Getting setShowSignUp function from ProductContext
  const { setShowLogin } = useContext(ProductContext); // Getting setShowLogin function from ProductContext

  const { Authenticated } = useContext(ProductContext); // Getting Authenticated value from ProductContext

  const ToggleSearchRestaurant = (e) => {
    const val = e.target.value.toLowerCase();

    const delay = 1000;

    clearTimeout(ToggleSearchRestaurant.timer);

    ToggleSearchRestaurant.timer = setTimeout(() => {
      setRestaurantSearchData(val);
    }, delay);
  };

  const [showDropDown, setShowDropDown] = useState(false); // State to manage showing drop down menu

  return (
    <>
      {/* Navbar container */}
      <div className="navbar_container">
        <div className="navbar">
          <div className="nav_top">
            <img
              src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
              alt=""
              className="logo"
            />
            <div className="search_container">
              <Link to="/OTPComponent" className="location">
                {" "}
                {/* Link to OTPComponent */}
                <div className="location_mark">
                  <p className="mark_logo">
                    <i className="fa-solid fa-location-dot"></i>
                  </p>
                  <p className="city">Dehradun</p>
                </div>
                <p className="caret">
                  <i className="fa-solid fa-caret-down"></i>
                </p>
              </Link>
              <p className="search_icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </p>
              <input
                type="search"
                placeholder="Search for restaurant, cuisine or a dish"
                onInput={ToggleSearchRestaurant} // Call ToggleSearchRestaurant on input change
                id="searchId2"
              />
            </div>

            <div className="Registration">
              {Authenticated ? ( // If Authenticated is true (user is logged in)
                <div className="user_Profile">
                  {Authenticated && <p className="Main_profile">Profile</p>}{" "}
                  {/* Render Profile if Authenticated */}
                  <p
                    style={{
                      display: showDropDown ? "none" : "block",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDropDown(true)}
                    className="dropDown"
                  >
                    <i className="fa-solid fa-caret-left"></i>
                  </p>
                  <p
                    style={{
                      display: showDropDown ? "block" : "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDropDown(false)}
                    className="dropDown"
                  >
                    <i className="fa-solid fa-caret-right"></i>
                  </p>
                  <div
                    style={{
                      transform: `translateX(${showDropDown ? "0" : "120"}%)`,
                    }}
                    className="dropDown_container"
                  >
                    <button className="logout item">Log Out</button>
                    <Link to="/BookMarkItem" className="item">
                      {" "}
                      {/* Link to BookMarkItem */}
                      Check BookMarks
                    </Link>
                    <Link className="item" to="/AddToCart">
                      {" "}
                      {/* Link to AddToCart */}
                      Card CheckOut
                    </Link>
                  </div>
                </div>
              ) : (
                // If Authenticated is false (user is not logged in)
                <>
                  <p
                    className="login"
                    onClick={() => {
                      setShowLogin(true);
                      setShowSignUp(false);

                      window.dataLayer = window.dataLayer || [];
                      window.dataLayer.push({
                        event: "GA Event Tag",
                        product: 'Heloo'
                        
                      });

                      ReactGA.event({
                        product: "Dining",
                      });
                    }}
                  >
                    Log in
                  </p>
                  <p
                    className="signup"
                    onClick={() => {
                      setShowSignUp(true);
                      setShowLogin(false);
                    }}
                  >
                    Sign up
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Render SignUp component */}
      <SignUp />

      {/* Render Login component */}
      <Login />
    </>
  );
};

export default NavbarTopHead;
