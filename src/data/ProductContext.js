import React, { createContext, useState, useEffect } from "react";
import AllRestaurants from "./AllRestaurants";

const ProductContext = createContext(null);

const ProductProvider = ({ children }) => {
  const [CartData, setCartData] = useState(() => {
    // Retrieve CartData from localStorage if it exists, else return an empty array
    const storedCart = localStorage.getItem("CartData");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Update localStorage whenever CartData changes
  useEffect(() => {
    localStorage.setItem("CartData", JSON.stringify(CartData));
  }, [CartData]);

  // Other states and logic
  const [value, setValue] = useState(0);
  const [checked, setChecked] = useState([]);
  const [SelectedSort, setSelectedSort] = useState(sessionStorage.getItem("title"));
  const [SelectedRating, setSelectedRating] = useState(null);
  const [ShowFilterList, setShowFilterList] = useState(null);
  const [SelectedCost, setSelectedCost] = useState(null);
  const [Ordervalue, setOrderValue] = useState(
    Number(sessionStorage.getItem("Ordervalue"))
  );
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);
  const [ShowExpandedImage, setShowExpandedImage] = useState(false);
  const [BookMarkData, setBookMarkData] = useState([]);
  const [SelectedBookMark, setSelectedBookMark] = useState([]);
  const [name, setName] = useState([]);
  const [Password, setPassword] = useState(null);
  const [FullName, setFullName] = useState(null);
  const [SignUpData, setSignUpData] = useState([]);
  const [Authenticated, setAuthenticated] = useState(false);
  const [SortingData] = useState(AllRestaurants);
  const [SortedData, setSortedData] = useState(SortingData);
  const [CuisineData, setCuisineData] = useState(SortedData);
  const [RatingData, setRatingData] = useState(CuisineData);
  const [DeliveryRestaurantProductPageData, setDeliveryRestaurantProductPageData] = useState([]);
  const [DiningRestaurantProductPageData, setDiningRestaurantProductPageData] = useState([]);
  const [NightlifeRestaurantProductPageData, setNightlifeRestaurantProductPageData] = useState([]);
  const [RestaurantSearchData, setRestaurantSearchData] = useState(null);

  return (
    <ProductContext.Provider
      value={{
        value,
        setValue,
        checked,
        setChecked,
        SelectedSort,
        setSelectedSort,
        ShowFilterList,
        setShowFilterList,
        SelectedRating,
        setSelectedRating,
        SelectedCost,
        setSelectedCost,
        SortingData,
        CuisineData,
        setCuisineData,
        RatingData,
        setRatingData,
        SortedData,
        setSortedData,
        DeliveryRestaurantProductPageData,
        setDeliveryRestaurantProductPageData,
        RestaurantSearchData,
        setRestaurantSearchData,
        Ordervalue,
        setOrderValue,
        ShowSignUp,
        setShowSignUp,
        ShowLogin,
        setShowLogin,
        ShowExpandedImage,
        setShowExpandedImage,
        BookMarkData,
        setBookMarkData,
        SelectedBookMark,
        setSelectedBookMark,
        name,
        setName,
        Password,
        setPassword,
        FullName,
        setFullName,
        SignUpData,
        setSignUpData,
        Authenticated,
        setAuthenticated,
        DiningRestaurantProductPageData,
        setDiningRestaurantProductPageData,
        NightlifeRestaurantProductPageData,
        setNightlifeRestaurantProductPageData,
        CartData,
        setCartData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
