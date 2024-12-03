import React, { useState, useContext } from "react";
import { ProductContext } from "../data/ProductContext";
import AllRestaurants from "../data/AllRestaurants";

const Cuisine = () => {
  // State for storing cuisine data
  const [cuisineData] = useState(AllRestaurants);
  const [check, setCheck] = useState(null)

  // Accessing checked state and setChecked function from ProductContext
  const { checked, setChecked } = useContext(ProductContext);

  // Function to handle checkbox changes
  const handleChange = (name) => {
    const isChecked = checked.includes(name);

    if (isChecked) {
      setChecked(checked.filter((item) => item !== name));
    } else {
      setChecked([...checked, name]);
    }
  };

  // Function to clear all checkboxes
  const ClearAll = () => {
    if(checked){

      setCheck(false)

    }
  };

  return (
    <>
      <div className="Cuisine_list">
        <div className="search_bar">
          <p>
            <i class="fa-solid fa-magnifying-glass"></i>
          </p>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search here"
          />
        </div>
        <div className="items_list">
          {[...cuisineData].sort((a, b) => a.info.cuisine[0].name.localeCompare(b.info.cuisine[0].name)).map((curelem, index) => {
            return (
              <>
                <div key={index} className="Items">
                  <input
                    value={checked}
                    onChange={() => handleChange(curelem.info.cuisine[0].name)}
                    type="checkbox"
                    name="check"
                    id="check"
                    checked={check}
                  />
                  <p className="item_name">{curelem.info.cuisine[0].name}</p>
                </div>
              </>
            );
          })}
        </div>
        <div className="last_container">
          <div className="clear_apply">
            <p onClick={ClearAll} className="clear">
              Clear All
            </p>
            <p className="apply">Apply</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cuisine;
