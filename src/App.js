import React, {useContext} from "react";
import {Helmet} from 'react-helmet'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Delivery from "./Components/Delivery";
import Dining from "./Components/Dining";
import Nightlife from "./Components/Nightlife";
import DeliveryRestaurant from "./Restaurants/DeliveryRestaurants";
import ProductPage from "./pages/ProductPage";
import { ProductContext } from "./data/ProductContext";
import MainProductPage from "./pages/MainProductPage";
import MainPage from "./pages/MainPage";
import BookMarkItem from "./ProductPageComponents/BookMarkItem";
import AddTOCart from "./ProductPageComponents/AddToCart";
import ReactGA from 'react-ga4'

function App() {
  const { DeliveryRestaurantProductPageData } = useContext(ProductContext);

  const TrackingID = 'G-3GN2W932DD'
  
  
  ReactGA.initialize(TrackingID, { debug_mode: true });
  
  
  return (

    <>
    <Helmet>
      <link rel="icon" href="https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png" size = '16x16' />
        {DeliveryRestaurantProductPageData.length !== 0 ? <title>{DeliveryRestaurantProductPageData.title + ', ' + DeliveryRestaurantProductPageData.location}</title> : <title>Zomato</title>}
    </Helmet>
   
    <Router>
    
    
      <Routes>
        
        
        <Route path='/' element={<MainPage />} />
    
        <Route path='/Delivery' element={<Delivery />} />

        <Route path='/Dining' element={<Dining />} />

        <Route path='/Nightlife' element={<Nightlife />} />

        <Route path='/DeliveryRestaurant' element={<DeliveryRestaurant />} />
      
        <Route path='/ProductPage' element={<ProductPage />} />

        <Route path='/MainProductPage' element={<MainProductPage />} />

        <Route path='/BookMarkItem' element={<BookMarkItem />} />

        <Route path="/MainPage" element={<MainPage/>}/>

        <Route path="/AddToCart" element={<AddTOCart/>}/>

   
      </Routes>
    </Router>
    </>
  );
}

export default App;
