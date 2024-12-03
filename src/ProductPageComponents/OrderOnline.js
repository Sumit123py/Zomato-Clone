import React, { useContext, useState } from "react";
import ItemDataApi from "../data/ProductPageData/ItemData";
import OrderList from "../data/ProductPageData/OrderList";
import { ProductContext } from "../data/ProductContext";

const OrderOnline = () => {
  // Define state variables
  const [OrderListData] = useState(OrderList);
  const [OrderOnlineIndex, setOrderOnlineIndex] = useState(0);
  const [OrderType, setOrderType] = useState(null);

  // Access data from ProductContext
  const { CartData, setCartData } = useContext(ProductContext);
  const { Authenticated } = useContext(ProductContext);
  const { setShowSignUp } = useContext(ProductContext);

  // Initialize ItemData and searchData
  const [ItemData] = useState(ItemDataApi);
  const [searchData, setSearchData] = useState(null);

  // Function to toggle order online
  const ToggleOrderOnline = (index, title) => {
    setOrderOnlineIndex(index);
    setOrderType(title);
  };

  // Function to handle search filter
  const ToggleSearchFilter = (e) => {
    const val = e.target.value;
    setSearchData(val.toLowerCase());
  };

  // Function to scroll to element
  const scrollToElement = (title) => {
    const element = document.getElementById(title);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get titles from CartData
  const title = CartData.map((item) => item.title);

  // Function to handle adding items to cart
  const HandleAddCart = (title, image, Rating, Price) => {
    if (Authenticated) {
      const NewData = {
        title: title,
        image: image,
        Rating: Rating,
        Price: Price
      };
      setCartData([...CartData, NewData]);
    } else if (!Authenticated) {
      setShowSignUp(true);
    }
  };

  return (
    <>
      <div className="orderOnline_container">
        <div className="left-right_container">
          <div className="left_container">
            {(searchData !== null
              ? OrderListData.filter((item) =>
                  item.title.toLowerCase().includes(searchData)
                )
              : OrderListData
            ).map((curelem, index) => {
              const TotalItem = ItemData.filter(
                (item) => item.OrderType === curelem.title
              ).length;

              return (
                <>
                  <div
                    className="Order_item"
                    onClick={() => {
                      ToggleOrderOnline(index, curelem.title);
                      scrollToElement(curelem.title);
                    }}
                    style={{
                      borderRight:
                        OrderOnlineIndex === index ? "3px solid red" : "none",
                      color: OrderOnlineIndex === index ? "red" : "black",
                      fontSize:
                        OrderOnlineIndex === index ? "1.5rem" : "1.2rem",
                      background: `linear-gradient(${
                        OrderOnlineIndex === index
                          ? "90deg, transparent, rgba(255, 0, 0, 0.116)"
                          : "white, white"
                      })`,
                    }}
                  >
                    {curelem.title + `(${TotalItem})`}
                  </div>
                </>
              );
            })}
          </div>
          <div className="right_container">
            <div className="current-navs_search-bar">
              <p>Order Online</p>
              <div className="search_bar">
                <p>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </p>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search within menu"
                  onInput={ToggleSearchFilter}
                />
              </div>
            </div>
            <div className="main_title">
              {OrderListData.map((curitem, index) => {
                return (
                  <>
                    <p className="item-list_title">{curitem.title}</p>
                    <div className="list">
                      {(searchData !== null
                        ? ItemData.filter((item) =>
                            item.title.toLowerCase().includes(searchData)
                          )
                        : ItemData
                      ).map((curelem, index) =>
                        curelem.OrderType === curitem.title ? (
                          <>
                            <div key={index}  className="Orderlist_container">
                              <div
                                id={curitem.title}
                                key={index}
                                className="item_list"
                              >
                                <div className="img">
                                  <img
                                    src={
                                      curelem.image !== "" &&
                                      curelem.OrderType === curitem.title
                                        ? curelem.image
                                        : `https://source.unsplash.com/130x130/weekly?${curelem.title}`
                                    }
                                    alt=""
                                  />
                                </div>
                                <div
                                  className="item_details"
                                >
                                  <p className="title">
                                    {curelem.OrderType === curitem.title
                                      ? curelem.title
                                      : null}
                                  </p>
                                  <div className="rating">
                                    {Array.from({ length: 5 }).map((_, index) =>
                                      curelem.Rating >= index + 1 ? (
                                        <p key={index}>
                                          <i class="fa-solid fa-star"></i>
                                        </p>
                                      ) : (
                                        <p key={index}>
                                          <i class="fa-regular fa-star"></i>
                                        </p>
                                      )
                                    )}
                                  </div>
                                  <p className="price">{curelem.Price}</p>
                                  <p className="cuisine">{curelem.cuisine}</p>
                                </div>
                              </div>

                              <p onClick={() => HandleAddCart(curelem.title, curelem.image, curelem.Rating, curelem.Price)} style={{display: title.includes(curelem.title) ? 'none' : 'grid', backgroundColor: title.includes(curelem.title) ? 'rgb(255, 51, 0)' : 'white', color: title.includes(curelem.title) ? 'white' : 'red'}}  className="AddTOCart">Add</p>
                              <p style={{display: title.includes(curelem.title) ? 'grid' : 'none',backgroundColor: title.includes(curelem.title) ? 'rgb(255, 51, 0)' : 'white', color: title.includes(curelem.title) ? 'white' : 'red', border: title.includes(curelem.title) ? 'red' : 'black' }} className="addedToCart">Added</p>
                            </div>
                          </>
                        ) : null
                      )}
                    </div>
                    <p className="hr"></p>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderOnline;
