import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SigninValidation } from "../validation";
import { loginUser } from "../reducers/ClerkSlice";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });

    setErrors((error) => {
      let errorNew = { ...error };
      delete errorNew[name];
      return errorNew;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = SigninValidation(login);
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }

    const payload = {
      email: login.email,
      password: login.password,
    };

    const res = await disptach(loginUser(payload));

    if (!res.payload) {
      return;
    }
    if (res?.payload?.status === 200) {
      localStorage.setItem(
        "userToken",
        JSON.stringify(`Bearer ${res.payload.token}`)
      );
      navigate("/");
    }
  };

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="floatingInput">Email address</label>
          <p className="text-danger">{errors.email}</p>
        </div>
        <div className="form-floating">
          <input
            type="password"
            name="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="floatingPassword">Password</label>
          <p className="text-danger">{errors.password}</p>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </main>
  );
};

export default Login;
