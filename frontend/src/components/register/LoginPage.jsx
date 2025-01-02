import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { handleLoginSerive } from "./registerService";
import { toast } from "react-toastify";
import loginimage from "../../assets/login.png";
function LoginPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(login);
    const resStatus = await handleLoginSerive(login);
    if (!resStatus) {
      toast("Invalid Credentials", { type: "error", autoClose: 2000 });
    } else {
      toast("Login Successfull", { type: "success", autoClose: 2000 });
      navigate("/landing");
    }
    console.log(resStatus);
  };
  return (
    <>
      <main className=" d-flex">
      <div className="login-image-container"><img src={loginimage} alt="" className={"login-image"}/></div>
    <div className="container d-flex justify-content-center align-items-center login-page">
      <div className="card p-4 px-5 shadow-lg login-card">
        <h2 className="text-center mb-4">Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, [e.target.id]: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary py-2 my-3 w-100"
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </form>
      </div>
    </div>
      </main>
    </>
  );
}

export default LoginPage;
