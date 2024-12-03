import React, { useContext, useEffect } from "react";
import AllRestaurants from "../data/AllRestaurants";
import { ProductContext } from "../data/ProductContext";
import { Link } from "react-router-dom";
const Sorting = () => {
  // Getting SortingData and SortedData from ProductContext
  const { SortingData } = useContext(ProductContext);
  const { SortedData, setSortedData } = useContext(ProductContext);

  // Getting SelectedSort from ProductContext
  const { SelectedSort } = useContext(ProductContext);

  // Sorting logic based on SelectedSort
  useEffect(() => {
    if (SelectedSort === "Cost: High to Low") {
      setSortedData(
        [...SortingData].sort((b, a) =>
          a.info.cfo.text.localeCompare(b.info.cfo.text)
        )
      );
    } else if (SelectedSort === "Cost: Low to High") {
      setSortedData(
        [...SortingData].sort((a, b) =>
          a.info.cfo.text.localeCompare(b.info.cfo.text)
        )
      );
    } else if (SelectedSort === "Delivery Time") {
      setSortedData(
        [...SortingData].sort((a, b) =>
          a.order.deliveryTime.localeCompare(b.order.deliveryTime)
        )
      );
    } else if (SelectedSort === "Rating: High to Low") {
      setSortedData(
        [...SortingData].sort((a, b) =>
          Number(b.info.rating.rating_text) - Number(a.info.rating.rating_text)
        )
      );
    } else {
      setSortedData(AllRestaurants);
    }
  }, [SelectedSort, SortingData, setSortedData]);

  return (
    <>
      {SortedData.map((curelem, index) => {
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
                  <i className="fa-solid fa-star"></i>
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

export default Sorting;
