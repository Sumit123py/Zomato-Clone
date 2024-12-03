import React, { useEffect } from "react";
import ProductPage from "./ProductPage"; // Importing the ProductPage component
import NavbarTopHead from "../Components/NavbarTopHead"; // Importing the NavbarTopHead component
import ReactGA from 'react-ga'
const MainProductPage = () => {
    useEffect(() => {
        ReactGA.pageview(window.location.pathname);
    console.log(window.location.pathname)
  
    }, []);
    return(
        <>
        <NavbarTopHead/> {/*Render the NavbarTopHead component*/}
        <ProductPage/> {/* Render the ProductPage component */}
        </>
    )
}

export default MainProductPage; // Export the MainProductPage component
