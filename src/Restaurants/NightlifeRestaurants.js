import React, {useContext, useEffect, useState} from "react";
import NightlifeApi from "../data/NightlifeApi"; // Importing NightlifeApi
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import { Link } from "react-router-dom";

const NightlifeRestaurants = () => {

    const [NightlifeRestaurantData] = useState(NightlifeApi) // Initializing state with NightlifeApi data
    const {RestaurantSearchData} = useContext(ProductContext) // Getting RestaurantSearchData from ProductContext
    const {Ordervalue} = useContext(ProductContext) // Getting Ordervalue from ProductContext

    const [SearchFilter, setSearchFilter] = useState([]) // Initializing SearchFilter state

    

    useEffect(() => {
      if(Ordervalue !== null){
        setSearchFilter(Ordervalue === 2 ? (RestaurantSearchData !== null ? (NightlifeRestaurantData.filter((item) => item.info.name.toLowerCase().includes(RestaurantSearchData))) : NightlifeRestaurantData ) : NightlifeRestaurantData)
      }
    }, [SearchFilter, NightlifeRestaurantData, RestaurantSearchData, Ordervalue])

    const {setNightlifeRestaurantProductPageData} = useContext(ProductContext) // Getting setNightlifeRestaurantProductPageData from ProductContext

    const toggleProductPage = (title, cuisine0, cuisine1, cuisine2, cuisine3, cuisine4, cuisine5, cuisine6, location, address, index) => {
      const Data = {
        title: title,
        cuisine0: cuisine0,
        cuisine1: cuisine1,
        cuisine2: cuisine2,
        cuisine3: cuisine3,
        cuisine4: cuisine4,
        cuisine5: cuisine5,
        cuisine6: cuisine6,
        location: location,
        address: address,
        id: index
      }
      setNightlifeRestaurantProductPageData(Data) // Setting data in ProductContext
    }

    return(
        <>
        <div className="Dining_Restaurants_container">
            <p className="collection_title">trending dining restaurants</p>
            <div className="dining_restaurant_list">
            {SearchFilter.map((curelem, index) => {
               const cuisine0 = curelem.info.cuisine[0].name;
               const cuisine1 =
                 curelem.info.cuisine && curelem.info.cuisine[1]
                   ? curelem.info.cuisine[1].name
                   : "";
               const cuisine2 =
                 curelem.info.cuisine && curelem.info.cuisine[2]
                   ? curelem.info.cuisine[2].name
                   : "";
               const cuisine3 =
                 curelem.info.cuisine && curelem.info.cuisine[3]
                   ? curelem.info.cuisine[3].name
                   : "";
               const cuisine4 =
                 curelem.info.cuisine && curelem.info.cuisine[4]
                   ? curelem.info.cuisine[4].name
                   : "";
               const cuisine5 =
                 curelem.info.cuisine && curelem.info.cuisine[5]
                   ? curelem.info.cuisine[5].name
                   : "";
               const cuisine6 =
                 curelem.info.cuisine && curelem.info.cuisine[6]
                   ? curelem.info.cuisine[6].name
                   : "";
            return (
              <>
                <Link key={index} to='/MainProductPage'  onClick={() => toggleProductPage(curelem.info.name, cuisine0, cuisine1, cuisine2, cuisine3, cuisine4, cuisine5, cuisine6, curelem.info.locality.name, curelem.info.locality.address, index)} className="item_card">
                  <div className="img">
                    <img src={curelem.info.image.url} alt="" />
                    <div style={{display: curelem.gold.offerValue ? 'flex' : 'none'}} className="discount_container">
                    <img src="https://b.zmtcdn.com/data/o2_assets/9b1ff9e19b7fadea6c6a57e081a1f5ac1687776279.png" alt="" />
                    <p className="discount">{curelem.gold ? curelem.gold.offerValue : ''}</p>
                    </div>
                  </div>
                  <div className="name_rating">
                    <p className="name">{curelem.info.name}</p>
                    <p className="rating">
                      <p>{curelem.info.rating.rating_text}</p>
                      <p className="rating_icon">
                        <i class="fa-solid fa-star"></i>
                      </p>
                    </p>
                  </div>
                  <div className="food_type_price">
                    <p className="food_type">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, itaque.</p>
                    <p className="price">{curelem.info.cfo.text}</p>
                  </div>
                  <p className="delivery_time">{curelem.order.deliveryTime}</p>
                </Link>
              </>
            );
          })}
            </div>
        </div>
        </>
    )
}

export default NightlifeRestaurants; 
