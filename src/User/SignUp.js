import React, { useContext, useState } from "react";
import { ProductContext } from "../data/ProductContext";

const SignUp = () => {
  // Get data and functions from ProductContext using useContext
  const { ShowSignUp, setShowSignUp } = useContext(ProductContext);
  const { setShowLogin } = useContext(ProductContext);

  const { Password, setPassword } = useContext(ProductContext);
  const { FullName, setFullName } = useContext(ProductContext);
  const [agreeChecked, setAgreeChecked] = useState(false);

  const { SignUpData, setSignUpData } = useContext(ProductContext);

  const HandleSubmitForm = () => {
    const newData = {
      name: FullName,
      password: Password,
    };

    if (Password !== null && FullName !== null && agreeChecked) {
      // Add new data to SignUpData
      setSignUpData([...SignUpData, newData]);

      // Save the user data to localStorage
      localStorage.setItem("UserData", JSON.stringify(newData));

      // Hide sign-up and show login
      setShowSignUp(false);
      setShowLogin(true);
    } else if (Password === null && FullName === null && !agreeChecked) {
      alert("Please Fill details and checkbox");
    } else if (Password === null) {
      alert("Please Fill Password");
    } else if (FullName === null) {
      alert("Please Fill FullName");
    } else if (!agreeChecked) {
      alert("Please Fill checkbox");
    }
  };

  return (
    <>
      <div
        style={{
          transform: `scale(${ShowSignUp ? "1.2" : "0"})`,
          transition: "all 0.5s ease",
        }}
        className="signUp_container"
      >
        <form className="container">
          <div className="title">
            <p>Sign up</p>
            <p onClick={() => setShowSignUp(false)}>
              <i class="fa-solid fa-xmark"></i>
            </p>
          </div>

          {/* Input for Full Name */}
          <input
            onInput={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Full Name"
            name="Full Name"
            required
          />

          {/* Input for Password */}
          <input
            onInput={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
            name="Password"
            required
          />

          {/* Checkbox for agreeing to terms and conditions */}
          <div className="term-and-condition">
            <input
              required
              type="checkbox"
              checked={agreeChecked}
              onChange={(e) => setAgreeChecked(e.target.checked)}
              name="checkbox"
              id="checkbox"
            />
            <p>
              I agree to Zomato's{" "}
              <span style={{ color: "red" }}>
                Terms of Service, Privacy Policy
              </span>{" "}
              and <span style={{ color: "red" }}>Content Policies</span>
            </p>
          </div>
          {/* Button to create account */}
          <p onClick={HandleSubmitForm} className="create">
            Create account
          </p>
          <p className="or">or</p>
          <p className="login">
            Already have an account?{" "}
            <span
              className="login_hover"
              style={{ color: "red" }}
              onClick={() => {
                setShowLogin(true);
                setShowSignUp(false);
              }}
            >
              Log in
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
