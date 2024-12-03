import React, { useContext, useState, useEffect } from "react";
import AllRestaurants from "../data/AllRestaurants";
import { ProductContext } from "../data/ProductContext";
import { Link } from "react-router-dom";

const CostFilter = () => {
  // Accessing RatingData from ProductContext
  const { RatingData } = useContext(ProductContext);
  const [DeliveryRestaurantData] = useState(AllRestaurants)
  
  // Accessing SelectedCost and SelectedRating from ProductContext
  const { SelectedCost } = useContext(ProductContext);
  const { SelectedRating } = useContext(ProductContext)

  // State to manage selected filter based on rating
  const [SelectedFilter, setSelectedFilter] = useState([])

  useEffect(() => {
    // Update SelectedFilter based on SelectedRating
    if(SelectedRating !== null){
      setSelectedFilter(RatingData)
    }
    else{
      setSelectedFilter(DeliveryRestaurantData)
    }
  },[SelectedRating, DeliveryRestaurantData, SelectedFilter, RatingData])

  return (
    <>
      {SelectedFilter.filter((item) => Number(item.info.cfo.text.replace('₹', '').replace('for one', '')) <= SelectedCost).map((curelem, index) => {
        // Extracting cuisine information
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

        return (
          <Link to='/MainProductPage' key={index} className="item_card">
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
                  <i class="fa-solid fa-star"></i>
                </p>
              </p>
            </div>
            <div className="food_type_price">
              <p className="food_type">
                {cuisine0 + ", " + cuisine1 + ", " + cuisine2 + ", " + cuisine3}
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

export default CostFilter;
