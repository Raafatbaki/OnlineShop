import React, { useEffect, useRef, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { LOGINUSER, baseUrl } from "../../Api/Api";
import Loading from "../../components/Loading/Loading";
import Cookie from "cookie-universal";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState("");
  const [loading, Setloading] = useState(false);
  const navigate = useNavigate();
  function changehandle(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setErrorLogin("");
    Setloading(true);
    try {
      var result = await axios.post(`${baseUrl}/${LOGINUSER}`, form);
      console.log(result);

      const token = result.data.token;
      const cookies = Cookie();
      cookies.set("user-token", token);
      navigate("/");
      Setloading(false);
    } catch (error) {
      Setloading(false);

      setErrorLogin(error.response.data.message);
    }
  }
  const focus = useRef();

  useEffect(() => {
    focus.current.focus();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className="container mt-5" style={{ maxWidth: "400px" }}>
        <h2>User Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              className="form-control"
              name="email"
              onChange={changehandle}
              required
              ref={focus}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              onChange={changehandle}
              required
              minLength="8"
            />
            {errorLogin !== "" && (
              <span class="errorregister">{errorLogin}</span>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
