import React, { useState } from "react";
import ProductNavbarApi from "../data/ProductPageData/productNavbarData";
import OrderOnline from "../ProductPageComponents/OrderOnline";
import Overview from "../ProductPageComponents/Overview";
import Photos from "../ProductPageComponents/Photos";
import Menu from "../ProductPageComponents/Menu";
import Reviews from "../ProductPageComponents/Reviews";

const ProductNavbar = () => {
  // Initialize state for ProductPageData with data from ProductNavbarApi
  const [ProductPageData] = useState(ProductNavbarApi);

  // Initialize state for ProductNavbarIndex
  const [ProductNavbarIndex, setProductNavbarIndex] = useState(0);

  // Initialize state for CurrentNavbar, starting with the Overview component
  const [CurrentNavbar, setCurrentNavbar] = useState(<Overview/>);

  // Function to toggle between different components based on the selected title
  const toggleProductNavbar = (title) => {
    if(title === 'Order Online'){
       setCurrentNavbar(<OrderOnline/>)
    }
    else if(title === 'Overview'){
      setCurrentNavbar(<Overview/>)
    }
    else if(title === 'Reviews'){
      setCurrentNavbar(<Reviews/>)
    }
    else if(title === 'Photos'){
      setCurrentNavbar(<Photos/>)
    }
    else if(title === 'Menu'){
      setCurrentNavbar(<Menu/>)
    }
  }

  return (
    <>
      <div className="product_navbar">
        {ProductPageData.map((curelem, index) => {
          return (
            <>
              {/* Render each navigation element */}
              <div key={index} onClick={() => toggleProductNavbar(curelem.title)}  className="navs">
                <p
                  style={{
                    color: ProductNavbarIndex === index ? "orangered" : "black",
                  }}
                  onClick={() => setProductNavbarIndex(index)}
                >
                  {curelem.title}
                </p>
                <p
                  style={{
                    transform: `scale(${
                      ProductNavbarIndex === index ? "1, 1" : "0, 1"
                    })`,
                    backgroundColor:
                      ProductNavbarIndex === index ? "orangered" : "grey",
                  }}
                  className="Product_Page_border_bottom"
                ></p>
              </div>
            </>
          );
        })}
      </div>
      {/* Render the currently selected component */}
      {CurrentNavbar}
    </>
  );
};

export default ProductNavbar;
