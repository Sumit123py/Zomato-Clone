import React, { useState, useContext } from "react";
import { ProductContext } from "../data/ProductContext";
import RatingApi from "../data/RatingApi";

const RatingFilter = () => {
  // Initializing RatingData state with data from RatingApi
  const [RatingData] = useState(RatingApi);

  // Initializing selectedRatingIndex state for tracking the selected rating
  const [selectedRatingIndex, setSelectedRatingIndex] = useState(null);

  // Getting the setSelectedRating function from ProductContext
  const { setSelectedRating } = useContext(ProductContext);

  // Function to handle when a rating is selected
  const RatingSelected = (rating_text) => {
    setSelectedRating(rating_text); // Setting the selected rating using context function
  };

  return (
    <>
      <div className="right_container">
        {RatingData.map((curelem, index) => {
          return (
            <>
              <div
                key={index}
                onClick={() => setSelectedRatingIndex(index)}
                className="sort_method"
              >
                <div
                  onClick={() => RatingSelected(curelem.rating_text)}
                  style={{
                    border:
                      selectedRatingIndex === index
                        ? "1px solid rgb(239, 79, 95)"
                        : "1px solid rgb(156, 156, 156)",
                  }}
                  className="checkbox"
                >
                  <p
                    style={{
                      display: selectedRatingIndex === index ? "block" : "none",
                    }}
                    className="inner_circle"
                  ></p>
                </div>
                <p className="title">{curelem.rating_text}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RatingFilter;
