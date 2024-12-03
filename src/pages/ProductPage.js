import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../data/ProductContext";
import ProductNavbar from "../Components/ProductNavbar";
import TrackingSharingSaving from "../ProductPageComponents/Tracking_sharing_saving";
import { Link } from "react-router-dom";

const ProductPage = () => {
  // Get data from ProductContext using useContext
  const { DeliveryRestaurantProductPageData } = useContext(ProductContext);
  const { DiningRestaurantProductPageData } = useContext(ProductContext);
  const { NightlifeRestaurantProductPageData } = useContext(ProductContext);
  const { BookMarkData } = useContext(ProductContext);
  const { CartData } = useContext(ProductContext);
  const { Ordervalue } = useContext(ProductContext);

  // Set up state for ProductPageData
  const [ProductPageData, setProductPageData] = useState([]);

  useEffect(() => {
    // Depending on Ordervalue, set ProductPageData
    if (Ordervalue === 0) {
      setProductPageData(DeliveryRestaurantProductPageData);
    } else if (Ordervalue === 1) {
      setProductPageData(DiningRestaurantProductPageData);
    } else if (Ordervalue === 2) {
      setProductPageData(NightlifeRestaurantProductPageData);
    }
  }, [
    DeliveryRestaurantProductPageData,
    DiningRestaurantProductPageData,
    NightlifeRestaurantProductPageData,
    Ordervalue,
  ]);

  console.log(DeliveryRestaurantProductPageData);

  return (
    <>
      <div className="main_product_page">
        <div className="product-page_container">
          <div className="about_Restaurant_container">
            <div className="gallery_container">
              {/* Display images */}
              <div className="img1">
                <img
                  src={`https://source.unsplash.com/916x500/weekly?${ProductPageData.title}`}
                  alt={ProductPageData.title}
                  onError={(e) =>
                    (e.target.src = "https://picsum.photos/916/500")
                  }
                />
              </div>
              <div className="img2">
                <div className="img2-img1">
                  <img
                    src={`https://source.unsplash.com/305x250/weekly?${ProductPageData.title}`}
                    alt={ProductPageData.title}
                    onError={(e) =>
                      (e.target.src = "https://picsum.photos/305/250")
                    }
                  />
                </div>
                <div className="img2-img2">
                  <img
                    src={`https://source.unsplash.com/305x240/weekly?${ProductPageData.title}`}
                    alt={ProductPageData.title}
                    onError={(e) =>
                      (e.target.src = "https://picsum.photos/305/240")
                    }
                  />
                </div>
              </div>
              <div className="img3">
                <img
                  src={`https://source.unsplash.com/305x500/weekly?${ProductPageData.title}`}
                  alt={ProductPageData.title}
                  onError={(e) =>
                    (e.target.src = "https://picsum.photos/305/500")
                  }
                />
              </div>
            </div>

            <div className="about_restaurant">
              {/* Display restaurant information */}
              <div className="restaurant_name">
                <p>{ProductPageData.title}</p>
              </div>
              <div className="cuisines">
                {Array.from({ length: 7 }).map(
                  (_, i) =>
                    ProductPageData[`cuisine${i}`] && (
                      <p key={i}>
                        {i < 6 ? ProductPageData[`cuisine${i}`] + "," : null}
                      </p>
                    )
                )}
              </div>
              <div className="restaurant_location">
                <p>{ProductPageData.location}</p>
              </div>
              <TrackingSharingSaving />
            </div>
            <ProductNavbar />
          </div>
        </div>
        {/* Check if there are bookmarked items */}
        {BookMarkData.length > 0 ? (
          <Link to="/BookMarkItem" className="bookMark_float">
            Check BookMark Items
          </Link>
        ) : null}
        {/* Check if there are items in the cart */}
        {CartData.length > 0 ? (
          <Link to="/AddToCart" className="Cart_float">
            CheckCart
          </Link>
        ) : null}
      </div>
    </>
  );
};

export default ProductPage;
