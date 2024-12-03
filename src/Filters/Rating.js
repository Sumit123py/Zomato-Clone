import React, { useContext, useEffect } from "react";
import { ProductContext } from "../data/ProductContext";
import { Link } from "react-router-dom";

const Rating = () => {
  const { CuisineData } = useContext(ProductContext);

  const { SelectedRating } = useContext(ProductContext);

  const { RatingData, setRatingData } = useContext(ProductContext);

  useEffect(() => {
    // When the CuisineData or SelectedRating changes, filter the data
    if (CuisineData !== null) {
      setRatingData(
        CuisineData.filter((item) => Number(item.info.rating.rating_text) > Number(SelectedRating))
      );
    }
  }, [CuisineData, SelectedRating, RatingData]); // Added RatingData to dependencies

  return (
    <>
      {RatingData.map((curelem, index) => {
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
              <div className="rating">
                <p>{Number(curelem.info.rating.rating_text)}</p>
                <p className="rating_icon">
                  <i className="fa-solid fa-star"></i>
                </p>
              </div>
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

export default Rating;
