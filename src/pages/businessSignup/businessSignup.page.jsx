import "../signup/signup.page.css";
import { Fragment, useState } from "react";
import Joi from "joi-browser";
import signupSchema from "../../validation/signup.validation";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { authActions } from "../../store/auth";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserNinja,
} from "@fortawesome/free-solid-svg-icons";

const BusinessSignupPage = () => {
  //declaring vars
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordErrorMsg, setShowPasswordErrorMsg] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  //functions
  const handleName = (ev) => {
    setName(ev.target.value);
  };
  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };
  const handlePassword = (ev) => {
    setPassword(ev.target.value);
  };
  const handleConfirmPassword = (ev) => {
    setConfirmPassword(ev.target.value);
  };
  const handleFormSubmit = (ev) => {
    // prevent default submit
    ev.preventDefault();
    // check if password is the same as confirm password
    setShowPasswordErrorMsg(password !== confirmPassword);
    // joi validation
    const validatedValue = Joi.validate(
      { name, email, password, confirmPassword },
      signupSchema,
      {
        abortEarly: false,
      }
    );
    const { error } = validatedValue;
    // if theres an error in the validation, pop up a toastify message
    if (error) {
      for (let item of error.details) {
        toast.error(item.message.replaceAll('"', ""), {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      if (password === confirmPassword) {
        axios
          .post("/users", {
            name: name,
            email: email,
            password: password,
            biz: true,
          })
          .then((res) => {
            console.log("after signup: ", res.data);
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
                history.push("/createcard"); //navigate to another page
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log("err from axios", err);
          });
      }
    }
  };

  const handleToast = () => {
    toast.error("🥲 Passwords do not match!", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Fragment>
      <div className="inputCard">
        <h3 className="mt-1 text-center"> Business Registration Form </h3>
        <p className="fw-lighter text-center">
          {" "}
          Open a business account for free!{" "}
        </p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3 text-center">
            <label htmlFor="InputName" className="form-label fw-bold">
              <FontAwesomeIcon icon={faUserNinja} className="mx-1" />
              Name
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="InputName"
              value={name}
              onChange={handleName}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="InputEmail1" className="form-label fw-bold">
              <FontAwesomeIcon icon={faEnvelope} className="mx-1" />
              Email address
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
          <div className="mb-3 text-center">
            <label htmlFor="InputPassword2" className="form-label fw-bold">
              <FontAwesomeIcon icon={faLock} className="mx-1" />
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control w-75 mx-auto"
              id="InputPassword2"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
          </div>
          {showPasswordErrorMsg && handleToast()}
          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Next
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default BusinessSignupPage;
