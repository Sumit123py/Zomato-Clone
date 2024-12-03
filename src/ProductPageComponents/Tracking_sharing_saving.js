import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../data/ProductContext";

const TrackingSharingSaving = () => {
  // Accessing data from ProductContext
  const { DeliveryRestaurantProductPageData } = useContext(ProductContext);
  const { DiningRestaurantProductPageData } = useContext(ProductContext)
  const { NightlifeRestaurantProductPageData } = useContext(ProductContext)
  const { Authenticated } = useContext(ProductContext)
  const { setShowSignUp } = useContext(ProductContext);

  const { Ordervalue } = useContext(ProductContext)

  // Initialize state for managing ProductPageData, BookMarkData, and name
  const [ ProductPageData, setProductPageData ] = useState([]);
  const { BookMarkData, setBookMarkData } = useContext(ProductContext);
  const { name, setName } = useContext(ProductContext)

  // Function to handle adding data to BookMarkData
  const HandleBookMarkData = (title) => {
    const newData = {
      name: ProductPageData.title,
      cuisine0: ProductPageData.cuisine0,
      cuisine1: ProductPageData.cuisine1,
      cuisine2: ProductPageData.cuisine2,
      cuisine3: ProductPageData.cuisine3,
      cuisine4: ProductPageData.cuisine4,
      cuisine5: ProductPageData.cuisine5,
      location: ProductPageData.location,
    };

    if(Authenticated === true){
      if (Ordervalue === 0 && DeliveryRestaurantProductPageData !== 0 ) {
        setBookMarkData([...BookMarkData, newData]);
      }
      else if(Ordervalue === 1 && DiningRestaurantProductPageData !== 0){
        setBookMarkData([...BookMarkData, newData])
      }
      else if(Ordervalue === 2 && NightlifeRestaurantProductPageData !== 0){
        setBookMarkData([...BookMarkData, newData])
      }
    }
    else if(!Authenticated){
      setShowSignUp(true)
    } 
  };

  // Function to handle removing data from BookMarkData
  const HandleRemoveBookMarkData = (title, index) => {
    const RestaurantIndex = name.indexOf(title)
    const updatedName = [...name.slice(0, RestaurantIndex), ...name.slice(RestaurantIndex + 1)];
    setName(updatedName);

    const BookMarkIndex = BookMarkData.indexOf(BookMarkData.find((curelem) => curelem.name === title)) 
    BookMarkData.splice(BookMarkIndex, 1)
    setBookMarkData(BookMarkData)
  }  

  // useEffect to update name when BookMarkData changes
  useEffect(() => {
    if(BookMarkData !== null){
      setName(BookMarkData.map((curelem) => curelem.name))
    }
  }, [BookMarkData, setName])

  // useEffect to update ProductPageData based on Ordervalue
  useEffect(() => {
    if(Ordervalue === 0){
      setProductPageData(DeliveryRestaurantProductPageData)
    }
    else if(Ordervalue === 1){
      setProductPageData(DiningRestaurantProductPageData)
    }
    else if(Ordervalue === 2){
      setProductPageData(NightlifeRestaurantProductPageData)
    }
  }, [DeliveryRestaurantProductPageData, DiningRestaurantProductPageData, NightlifeRestaurantProductPageData, Ordervalue])
 
  return (
    <>
      <div className="tracking_sharing_saving">
        {/* Link to Google Maps */}
        <Link
          target="_blank"
          to={`https://www.google.co.in/maps/dir//${ProductPageData.location}`}
          className="tracking"
        >
          <p>
            <i class="fa-solid fa-diamond-turn-right"></i>
          </p>
          <p>Direction</p>
        </Link>

        {/* Button to remove bookmark */}
        <div
          style={{
            backgroundColor: name.includes(ProductPageData.title) === true ? "red" : "white",
            color: name.includes(ProductPageData.title) === true ? "white" : "red", 
            border: name.includes(ProductPageData.title) === true ? '1px solid red' : '1px solid block', 
            display: name.includes(ProductPageData.title) !== true ? 'none' : 'flex'
          }}
          onClick={() => HandleRemoveBookMarkData(ProductPageData.title)}
          className="saving"
        >
          <p>
            <i class="fa-regular fa-bookmark"></i>
          </p>
          <p>Bookmark</p>
        </div>

        {/* Button to add bookmark */}
        <div style={{display: name.includes(ProductPageData.title) === true ? 'none' : 'flex'}}
          onClick={() => HandleBookMarkData(ProductPageData.title, ProductPageData.id)}
          className="saving"
        >
          <p>
            <i class="fa-regular fa-bookmark"></i>
          </p>
          <p>Bookmark</p>
        </div>

        {/* Button to share */}
        <div className="sharing">
          <p>
            <i class="fa-solid fa-share"></i>
          </p>
          <p>Share</p>
        </div>
      </div>
    </>
  );
};

export default TrackingSharingSaving;
