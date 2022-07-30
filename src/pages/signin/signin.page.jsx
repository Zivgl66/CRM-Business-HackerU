import "../signup/signup.page.css";
import { Fragment, useState } from "react";
import axios from "axios";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import signinSchema from "../../validation/signin.validation";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { authActions } from "../../store/auth";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const SigninPage = () => {
  //declaring vars
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  //functions
  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };
  const handleFormSubmit = (ev) => {
    // prevent default submit
    ev.preventDefault();
    // use vars to send axios request
    const validatedValue = Joi.validate({ email, password }, signinSchema, {
      abortEarly: false,
    });
    const { error } = validatedValue;
    if (error) {
      toast.error(`"invalid email and/or password"`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios
        .post("/auth", {
          email,
          password,
        })
        .then(({ data }) => {
          console.log("data", data);
          localStorage.setItem("token", data.token);
          dispatch(authActions.login()); //update redux state
          dispatch(authActions.updateUserData(jwt_decode(data.token))); //update user info in redux store
          history.push("/"); //navigate to another page
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <Fragment>
      <div className="inputCard">
        <h3 className="mt-2 text-center"> Signin To Business CRM </h3>
        <p className="fw-lighter text-center">
          You can signin here with your account!
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 text-center">
            <label htmlFor="InputEmail1" className="form-label fw-bold">
              <FontAwesomeIcon icon={faEnvelope} className="mx-1" />
              Email
            </label>
            <input
              type="email"
              className="form-control w-75 mx-auto"
              id="InputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="InputPassword1" className="form-label fw-bold">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
              Password
            </label>
            <input
              type="password"
              className="form-control w-75 mx-auto"
              id="InputPassword1"
              value={password}
              onChange={handlePassword}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Signin
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SigninPage;
