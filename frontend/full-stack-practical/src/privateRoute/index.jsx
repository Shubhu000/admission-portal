import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (Component) => (props) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return !token ? <Fragment></Fragment> : <Component {...props} />;
};

export default WithAuth;
