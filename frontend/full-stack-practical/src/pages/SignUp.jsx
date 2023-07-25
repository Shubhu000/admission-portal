import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/ClerkSlice";
import { Link, useNavigate } from "react-router-dom";
import { RegisterValidation } from "../validation";

const SignUp = () => {
  const [register, setRegister] = useState({
    name: "",
    geder: "",
    dob: "",
    email: "",
    phone: 0,
    secretId: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
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

    const error = RegisterValidation(register);
    if (Object.keys(error).length) {
      setErrors(error);
      return;
    }

    const payload = {
      name: register.name,
      geder: register.geder,
      dob: register.dob,
      email: register.email,
      phone: register.phone,
      secretId: register.phone,
      password: register.password,
    };

    const res = await dispatch(registerUser(payload));

    if (!res.payload) {
      return;
    }
    if (res?.payload?.status === 200) {
      navigate("/login");
    }
  };
  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Register Clerk</h1>
        <div className="form-floating mb-2">
          <input
            type="text"
            name="name"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="Shubham"
          />
          <label htmlFor="floatingInput">Name</label>
          <p className="text-danger">{errors.name}</p>
        </div>
        <div className="form-floating mb-2">
          <select
            name="geder"
            onChange={(e) => handleChange(e)}
            className="form-select"
            aria-label="Default select example"
          >
            <option selected>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <p className="text-danger">{errors.geder}</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="date"
            name="dob"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Date of birth</label>
          <p className="text-danger">{errors.dob}</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="email"
            name="email"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Email</label>
          <p className="text-danger">{errors.email}</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="numbers"
            name="phone"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Phone Number</label>
          <p className="text-danger">{errors.phone}</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="text"
            name="secretId"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Secret Id</label>
          <p className="text-danger">{errors.secretId}</p>
        </div>
        <div className="form-floating mb-2">
          <input
            type="password"
            name="password"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Password</label>
          <p className="text-danger">{errors.password}</p>
        </div>{" "}
        <div className="form-floating">
          <input
            type="password"
            name="rePassword"
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="floatingInput"
            placeholder="65%"
          />
          <label htmlFor="floatingInput">Confirm Password</label>
          <p className="text-danger">{errors.rePassword}</p>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
};

export default SignUp;
