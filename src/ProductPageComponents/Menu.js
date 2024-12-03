import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import MenuImagesApi from "../data/ProductPageData/MenuImages"; // Importing MenuImagesApi

const Menu = () => {

    // Getting data from ProductContext
    const { DeliveryRestaurantProductPageData } = useContext(ProductContext);
    const { DiningRestaurantProductPageData } = useContext(ProductContext)
    const { NightlifeRestaurantProductPageData } = useContext(ProductContext)
    const { Ordervalue } = useContext(ProductContext)
    const { ShowExpandedImage, setShowExpandedImage } = useContext(ProductContext)

    // Initializing state for ProductPageData and MenuImageData
    const [ProductPageData, setProductPageData] = useState([])
    const [MenuImageData] = useState(MenuImagesApi)

    const [value, setValue] = useState(0)

    // Updating ProductPageData based on Ordervalue changes
    useEffect(() => {

        if (Ordervalue === 0) {
            setProductPageData(DeliveryRestaurantProductPageData)
        }
        else if (Ordervalue === 1) {
            setProductPageData(DiningRestaurantProductPageData)
        }
        else if (Ordervalue === 2) {
            setProductPageData(NightlifeRestaurantProductPageData)
        }

    }, [DeliveryRestaurantProductPageData, DiningRestaurantProductPageData, NightlifeRestaurantProductPageData, Ordervalue])

    const { image } = MenuImageData[value] // Getting the image from MenuImageData based on value

    return (
        <>
            <div className="menu_container">
                <p className="page_title">
                    {`${ProductPageData.title} Menu`} {/* Displaying the title in the page */}
                </p>
                <div className="menu">
                    <div onClick={() => setShowExpandedImage(true)} className="menu_image">
                        <img src="https://b.zmtcdn.com/data/menus/424/3500424/0a7181e52bd8f369eaea942b331bbf27.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A" alt="" />
                    </div>
                    <p>Menu</p>
                    <p className="pages">4 pages</p>
                </div>
            </div>
            <div style={{ display: ShowExpandedImage === false ? 'none' : 'block' }} className="image_container">
                <div className="ExpandedImage">
                    <div className="img">
                        <img src={image} alt="" />
                    </div>
                    <div className="change_image_btn">
                        <p style={{ display: value <= 0 ? 'none' : 'grid' }} onClick={() => setValue((prev) => prev - 1)}
                            className="btn prev"><i class="fa-sharp fa-solid fa-angle-left"></i></p>
                        <p style={{ display: value === (MenuImageData.length - 1) ? 'none' : 'grid' }} onClick={() => setValue((next) => next + 1)}
                            className="btn next"><i class="fa-sharp fa-solid fa-angle-right"></i></p>
                    </div>
                    <p onClick={() => setShowExpandedImage(false)} className="closeExpandedImage"><i class="fa-solid fa-xmark"></i></p>
                </div>
            </div>
        </>
    )
}

export default Menu;
