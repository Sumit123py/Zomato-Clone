import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../data/ProductContext";

const Login = () => {
  const { ShowLogin, setShowLogin } = useContext(ProductContext);
  const { setShowSignUp } = useContext(ProductContext);
  const [checkPassword, setCheckPassword] = useState(null);
  const [UserName, setUserName] = useState(null);
  const { setAuthenticated } = useContext(ProductContext);
  const { SignUpData, setSignUpData } = useContext(ProductContext);

  // Auto-login if user data exists in localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("UserData"));
    if (savedUser) {
      setAuthenticated(true);
      setShowLogin(false);
      console.log(`Welcome back, ${savedUser.name}`);
    }
  }, []);

  const CompareDetails = () => {
    const name = SignUpData.map((curelem) => curelem.name);
    const password = SignUpData.map((curelem) => curelem.password);

    if (name.includes(UserName) && password.includes(checkPassword)) {
      setShowLogin(false);
      setAuthenticated(true);
      alert("Login Successful");
    } else {
      alert("Wrong Username or Password");
    }
  };

  return (
    <>
      <div
        style={{
          transform: `scale(${ShowLogin ? "1.2" : "0"})`,
          transition: "all 0.5s ease",
        }}
        className="login_container"
      >
        <form className="container">
          <div className="title">
            <p>Log in</p>
            <p onClick={() => setShowLogin(false)}>
              <i className="fa-solid fa-xmark"></i>
            </p>
          </div>
          <input
            onInput={(e) => setUserName(e.target.value)}
            type="text"
            placeholder="Username"
            id="usernameId"
            name="username"
            autoComplete="username"
            required
          />
          <input
            onInput={(e) => setCheckPassword(e.target.value)}
            type="text"
            placeholder="Password"
            id="passwordId"
            name="password"
            required
          />

          <p onClick={CompareDetails} className="continue">
            Log in
          </p>

          <p className="or">or</p>

          <p className="login">
            New to Zomato?{" "}
            <span
              onClick={() => {
                setShowSignUp(true);
                setShowLogin(false);
              }}
              style={{ color: "red" }}
              className="login_hover"
            >
              Create account
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
