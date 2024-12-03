import React, { useContext } from "react";
import { ProductContext } from "../data/ProductContext"; // Importing ProductContext
import { Link } from "react-router-dom";

const BookMarkItem = () => {
    const {BookMarkData} = useContext(ProductContext); // Getting BookMarkData from ProductContext

    return(
        <>
        <div className="bookmark_container">
            {BookMarkData.map((curelem, index) => {
                return(
                    <>
                    <Link key={index} to='/ProductPage' className="container"> {/* Link to ProductPage */}
                        <div className="img">
                            <img src={`https://source.unsplash.com/200x150/weekly?${curelem.title}`} alt="" />
                        </div>
                        <div className="details">
                            <p className="name">{curelem.name}</p>
                            <p className="rating"></p>
                            <p className="cuisines">
                                {Array.from({ length: 7 }).map(
                                    (_, i) =>
                                        curelem[`cuisine${i}`] && 
                                        i < 6
                                            ? curelem[`cuisine${i}`] + ", "
                                            : null
                                )}
                            </p>
                            <p className="location">{curelem.location}</p>
                        </div>
                    </Link>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default BookMarkItem;
