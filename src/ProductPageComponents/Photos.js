import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../data/ProductContext";
import PhotosApi from "../data/PhotosApi";

const Photos = () => {
    // Initialize PhotosData state with data from PhotosApi
    const  [PhotosData] = useState(PhotosApi)
    // Initialize PageIndex state
    const [PageIndex, setPageIndex] = useState(0)
    
    // Accessing data from ProductContext
    const { DeliveryRestaurantProductPageData } = useContext(ProductContext);
    const { DiningRestaurantProductPageData } = useContext(ProductContext)
    const { NightlifeRestaurantProductPageData } = useContext(ProductContext)
  
    const {Ordervalue} = useContext(ProductContext)
  
    // Initialize ProductPageData state
    const [ProductPageData, setProductPageData] = useState([])
  
    useEffect(() => {
      // Update ProductPageData based on Ordervalue
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
    
    return(
        <>
        <div className="photos_container">
            <p className="page_title">{`${ProductPageData.title} Photos`}</p>
            {/* Pagination */}
            <div className="pagination_layout">
                {Array.from({length: 4}).map((_, index) => 
                <p 
                  key={index} 
                  onClick={() => setPageIndex(index)} 
                  style={{
                    backgroundColor: PageIndex === index ? '#11939C' : 'white', 
                    color: PageIndex === index ? 'white' : 'black'
                  }}>
                  {index + 1}
                </p>
                )}
            </div>
            {/* Displaying photos */}
            <div className="photos">
              <div className="photos_layout">
                {PhotosData.slice((PageIndex + 1) * 9 - 9, ((PageIndex + 1) * 9)).map((curelem, i) => {
                    return(
                        <>
                        <div key={i} className="photo_box">
                            <img loading="lazy" src={curelem.image} alt="" />
                        </div>
                        </>
                    )
                })}
              </div>
            </div>
        </div>
        </>
    )
}

export default Photos;
