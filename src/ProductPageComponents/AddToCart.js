import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import { Link } from "react-router-dom"; // Importing Link for routing
import CheckoutForm from "../Components/CheckoutForm";

const AddToCart = () => {
  const { CartData, setCartData } = useContext(ProductContext); // Getting CartData and setCartData from ProductContext
  const [QuantityData, setQuantityData] = useState({}); // Initializing state for quantity
  const [subtotal, setSubtotal] = useState(0); // Subtotal state
  const deliveryFee = 10; // Fixed delivery fee
  const total = subtotal + deliveryFee; // Total = Subtotal + Delivery Fee

  // Calculate subtotal whenever CartData or QuantityData changes
  useEffect(() => {
    const newSubtotal = CartData.reduce((acc, item, index) => {
      const quantity = QuantityData[index] || 1;
      const itemPrice = Number(item.Price.replace("₹", ""));
      return acc + itemPrice * quantity;
    }, 0);
    setSubtotal(newSubtotal);
  }, [CartData, QuantityData]);

  const IncreaseQuantity = (productId) => {
    setQuantityData((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const DecreaseQuantity = (productId) => {
    setQuantityData((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 1) - 1, 1),
    }));
  };

  const HandleClearItem = () => {
    setCartData([]); // Clearing the cart
  };

  const HandleDeleteItem = (title) => {
    const updatedCart = CartData.filter((item) => item.title !== title);
    setCartData(updatedCart); // Removing an item from the cart
  };

  return (
    <>
      <div className="cartItemList_container">
        <div className="cartItemList">
          <div className="cart_container">
            <div className="cartList_container">
              {CartData && CartData.length > 0 ? (
                CartData.map((item, index) => {
                  const productId = index;
                  const quantity = QuantityData[productId] || 1;
                  return (
                    <div key={index} className="cartItem">
                      <div className="item_list">
                        <div className="img">
                          <img
                            src={
                              item.image !== ""
                                ? item.image
                                : `https://source.unsplash.com/130x130/weekly?${item.title}`
                            }
                            alt={item.title}
                          />
                        </div>
                        <div className="item_details">
                          <p className="title">{item.title}</p>
                          <div className="rating">
                            {Array.from({ length: 5 }).map((_, idx) =>
                              item.Rating >= idx + 1 ? (
                                <i key={idx} className="fa-solid fa-star"></i>
                              ) : (
                                <i key={idx} className="fa-regular fa-star"></i>
                              )
                            )}
                          </div>
                          <p className="price">{item.Price}</p>
                          <p className="cuisine">{item.cuisine}</p>
                        </div>
                      </div>
                      <p className="totalPrice">
                        ₹{Number(item.Price.replace("₹", "")) * quantity}
                      </p>
                      <div className="quantity_Btn">
                        <button
                          onClick={() => DecreaseQuantity(productId)}
                          className="btn"
                        >
                          <i className="fa-solid fa-minus"></i>
                        </button>
                        <p className="number">{quantity}</p>
                        <button
                          onClick={() => IncreaseQuantity(productId)}
                          className="btn"
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      </div>
                      <p
                        onClick={() => HandleDeleteItem(item.title)}
                        className="delete-Item"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </p>
                    </div>
                  );
                })
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
        <div className="button-actions-container">
          <button onClick={HandleClearItem} className="clear-all-button btn">
            Clear All
          </button>
          <Link to="/MainProductPage" className="continue-shopping-button btn">
            Continue Shopping
          </Link>
        </div>
        <div className="summary-container" style={{ marginTop: "20px", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <p style={{ fontSize: "18px" }}>
            Subtotal: ₹{subtotal.toFixed(2)}
          </p>
          <p style={{ fontSize: "18px", }}>
            Delivery Fee: ₹{deliveryFee.toFixed(2)}
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Total: ₹{total.toFixed(2)}
          </p>
        </div>
        <CheckoutForm totalAmount={total} /> {/* Passing totalAmount to CheckoutForm */}
      </div>
    </>
  );
};

export default AddToCart;
