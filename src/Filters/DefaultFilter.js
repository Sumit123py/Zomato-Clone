import React, { useState, useContext, useEffect } from "react";
import AllRestaurants from "../data/AllRestaurants";
import { Link } from 'react-router-dom';  // Imported Link from react-router-dom
import { ProductContext } from "../data/ProductContext";
import DiningOutApi from "../data/DiningOutApi";

const DefaultFilter = () => {
  const [DeliveryRestaurantData] = useState(AllRestaurants);
  const [DiningRestaurantData] = useState(DiningOutApi);

  const { Ordervalue } = useContext(ProductContext);

  const [SearchFilter, setSearchFilter] = useState([]);
  const { RestaurantSearchData } = useContext(ProductContext);

  const { setDeliveryRestaurantProductPageData } = useContext(ProductContext);

  // Function to set product page data based on selected restaurant
  const toggleProductPage = (title, cuisine0, cuisine1, cuisine2, cuisine3, cuisine4, cuisine5, cuisine6, location, address, index) => {
    const Data = {
      title: title,
      cuisine0: cuisine0,
      cuisine1: cuisine1,
      cuisine2: cuisine2,
      cuisine3: cuisine3,
      cuisine4: cuisine4,
      cuisine5: cuisine5,
      cuisine6: cuisine6,
      location: location,
      address: address,
      id: index
    };
    setDeliveryRestaurantProductPageData(Data);
  }

  useEffect(() => {
    if (Ordervalue !== null) {
      setSearchFilter(Ordervalue === 0 ? (RestaurantSearchData !== null ? (DeliveryRestaurantData.filter((item) => item.info.name.toLowerCase().includes(RestaurantSearchData))) : DeliveryRestaurantData) : DeliveryRestaurantData);
    }
  }, [Ordervalue, RestaurantSearchData, DeliveryRestaurantData, DiningRestaurantData, SearchFilter])

  return (
    <>
      {SearchFilter.map((curelem, index) => {
        const cuisine0 = curelem.info.cuisine[0].name;
        const cuisine1 =
          curelem.info.cuisine && curelem.info.cuisine[1]
            ? curelem.info.cuisine[1].name
            : "";
        const cuisine2 =
          curelem.info.cuisine && curelem.info.cuisine[2]
            ? curelem.info.cuisine[2].name
            : "";
        const cuisine3 =
          curelem.info.cuisine && curelem.info.cuisine[3]
            ? curelem.info.cuisine[3].name
            : "";
        const cuisine4 =
          curelem.info.cuisine && curelem.info.cuisine[4]
            ? curelem.info.cuisine[4].name
            : "";
        const cuisine5 =
          curelem.info.cuisine && curelem.info.cuisine[5]
            ? curelem.info.cuisine[5].name
            : "";
        const cuisine6 =
          curelem.info.cuisine && curelem.info.cuisine[6]
            ? curelem.info.cuisine[6].name
            : "";

        return (
          <Link key={index} to='/MainProductPage' onClick={() => toggleProductPage(curelem.info.name, cuisine0, cuisine1, cuisine2, cuisine3, cuisine4, cuisine5, cuisine6, curelem.info.locality.name, curelem.info.locality.address, index)} className="item_card">
            <div className="img">
              <img src={curelem.info.image.url} alt="" />
              <p className="discount">
                {curelem.bulkOffers && curelem.bulkOffers[0]
                  ? curelem.bulkOffers[0].text
                  : ""}
              </p>
            </div>
            <div className="name_rating">
              <p className="name">{curelem.info.name}</p>
              <p className="rating">
                <p>{Number(curelem.info.rating.rating_text)}</p>
                <p className="rating_icon">
                  <i className="fa-solid fa-star"></i>
                </p>
              </p>
            </div>
            <div className="food_type_price">
              <p className="food_type">
                {cuisine0 +
                  ", " +
                  cuisine1 +
                  ", " +
                  cuisine2 +
                  ", " +
                  cuisine3 +
                  ", " +
                  cuisine4 +
                  ", " +
                  cuisine5 +
                  ", " +
                  cuisine6}
              </p>
              <p className="price">{curelem.info.cfo.text}</p>
            </div>
            <p className="delivery_time">{curelem.order.deliveryTime}</p>
          </Link>
        );
      })}
    </>
  );
};

export default DefaultFilter;
