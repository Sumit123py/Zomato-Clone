import React, { useContext, useState } from "react";
import ReviewsDataApi from "../data/ProductPageData/ReviewsData";
import { ProductContext } from "../data/ProductContext";

const Reviews = () => {
    // Initialize ReviewsData state with data from ReviewsDataApi
    const [ReviewsData, setReviewsData] = useState(ReviewsDataApi)

    // Initialize state for managing input value and index
    const [value, setValue] = useState([])
    const [inputIndex, setInputIndex] = useState(null)
    const [Addcomment, setAddcomment] = useState(false)
    const [text, setText] = useState('')

    // Accessing SignUpData, Authenticated, and setShowSignUp from ProductContext
    const { SignUpData } = useContext(ProductContext)
    const { Authenticated } = useContext(ProductContext)
    const { setShowSignUp } = useContext(ProductContext)

    // Function to handle input text change
    const handleText = (e) => {
        setText(e.target.value)
    }

    // Function to handle sending a comment
    const handleSend = () => {
        const name = SignUpData.map((curelem) => curelem.name)

        const newData = {
            name: name,
            comment_text: text
        }

        setReviewsData([...ReviewsData, newData])
        setAddcomment(false)
        setText('')
    }

    // Function to handle adding a comment
    const HandleAddcomment = () => {
        if(Authenticated){
            setAddcomment(true)
        } else if(!Authenticated){
            setShowSignUp(true)
        }
    }

    return (
        <>
            <div className="reviews_container">

                {/* Button to add a comment */}
                <div onClick={HandleAddcomment} className="Add">Add Comment</div>
                
                {/* Input field for adding a comment */}
                <div className="reply">
                    <input onInput={handleText} style={{display: Addcomment === true ? 'flex' : 'none'}} type="text" className="input" placeholder="Write Your Comment Here" id="inputId" />
                    <p style={{display: Addcomment === true ? 'flex' : 'none'}} className="send" onClick={handleSend}>Send</p>
                </div>
                {ReviewsData.map((curelem, index) => {
                    return(
                        <>
                            <div key={index} className="main_comment1">
                                <div className="about_commenter">
                                    <div className="profile">
                                        <p className="img"><i class="fa-solid fa-user"></i></p>
                                        <div className="name">{curelem.name}</div>
                                    </div>

                                    {/* Button to follow */}
                                    <p onClick={() => setValue([...value, index])} style={{display: value.includes(index) ? 'none' : 'grid'}} className="follow">Follow</p>

                                    {/* Button to unfollow */}
                                    <p onClick={() => setValue(value.filter((item) => item !== index))} className="unfollow" style={{backgroundColor:  value.includes(index) ? 'rgb(235, 55, 42)' : 'white', color: value.includes(index) ? 'white' : 'black',  display: value.includes(index) ? 'grid' : 'none'}}>UnFollow</p>
                                </div>
                                <p className="comment_text">
                                    {curelem.comment_text}
                                </p>
                                <div className="btns">
                                    <div onClick={() => setInputIndex(index)} className="comment_btn">
                                        <p><i class="fa-regular fa-comment-dots"></i></p>
                                        <p>Comment</p>
                                    </div>
        
                                </div>
                                <div className="reply">
                                    <input style={{display: inputIndex === index ? 'flex' : 'none'}} type="text" className="input" placeholder="Write Your Comment Here" id="inputId" />
                                    <p style={{display: inputIndex === index ? 'flex' : 'none'}} className="send">Send</p>
                                </div>
                            </div>
                            <hr />
                        </>
                    )
                })}
            </div>
        </>
    );
};

export default Reviews;
