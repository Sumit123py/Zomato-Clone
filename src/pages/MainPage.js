import React, { useContext, useEffect, useState } from "react";
import Delivery from "../Components/Delivery";
import Dining from "../Components/Dining";
import Nightlife from "../Components/Nightlife";
import { ProductContext } from "../data/ProductContext";
import OrderOption from "../Components/OrderOption";
import NavbarTopHead from "../Components/NavbarTopHead";

const MainPage = () => {
  // Accessing Ordervalue from ProductContext
  const { Ordervalue } = useContext(ProductContext);

  // Saving Ordervalue to sessionStorage
  sessionStorage.setItem("Ordervalue", Ordervalue);

  // State to manage showing order option component
  const [ShowOrderOption, setShowOrderOption] = useState(
    sessionStorage.getItem("showOrderoption")
  );

  useEffect(() => {
    // Depending on the Ordervalue, setting the ShowOrderOption component
    if (Ordervalue === 0) {
      setShowOrderOption(<Delivery />);
      sessionStorage.setItem("showOrderoption", ShowOrderOption);
    } else if (Ordervalue === 1) {
      setShowOrderOption(<Dining />);
    } else if (Ordervalue === 2) {
      setShowOrderOption(<Nightlife />);
    }
  }, [Ordervalue]);

  return (
    <>
      {/* Render NavbarTopHead component */}
      <NavbarTopHead />
      {/* Render OrderOption component */}
      <OrderOption />
      {/* Render the selected ShowOrderOption component */}
      {ShowOrderOption}
    </>
  );
};

export default MainPage;
