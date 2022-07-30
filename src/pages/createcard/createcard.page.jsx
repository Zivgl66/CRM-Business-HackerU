import "../signup/signup.page.css";
import { Fragment, useState } from "react";
import Joi from "joi-browser";
import cardSchema from "../../validation/card.validation";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory } from "react-router-dom";

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faImage,
  faSquarePhone,
  faMapLocationDot,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

const CreateCardPage = () => {
  const [bizName, setBizName] = useState("");
  const [bizDescription, setBizDescription] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizPhone, setBizPhone] = useState("");
  const [bizImage, setBizImage] = useState("");
  const history = useHistory();

  const handleBizNameChange = (ev) => {
    setBizName(ev.target.value);
  };
  const handleBizDescriptionChange = (ev) => {
    setBizDescription(ev.target.value);
  };
  const handleBizAddressChange = (ev) => {
    setBizAddress(ev.target.value);
  };
  const handleBizPhoneChange = (ev) => {
    setBizPhone(ev.target.value);
  };
  const handleBizImageChange = (ev) => {
    setBizImage(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // joi validation
    const validatedValue = Joi.validate(
      { bizName, bizDescription, bizAddress, bizPhone, bizImage },
      cardSchema,
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
      let dateToSend = {
        bizName,
        bizDescription,
        bizAddress,
        bizPhone,
      };
      if (bizImage) {
        dateToSend.bizImage = bizImage;
      }
      axios
        .post("/cards", dateToSend)
        .then((data) => {
          toast("new card created 😎 ", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.log("created : ", data);
          history.push("/"); //navigate to another page
        })
        .catch((err) => {
          console.log("something want wrong: ");
          console.log(err);
        });
    }
  };
  return (
    <Fragment>
      <div className="inputCard">
        <h3 className="mt-1 text-center"> Create a Business Card! </h3>
        <p className="fw-lighter text-center">
          You can create a card for your business
        </p>
        <form onSubmit={handleSubmit} className="mt-1">
          <div className="mb-3 text-center">
            <label htmlFor="bizNameInput" className="form-label fw-bold">
              <FontAwesomeIcon icon={faBriefcase} className="mx-1" />
              Business Name:
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="bizNameInput"
              value={bizName}
              onChange={handleBizNameChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="bizDescriptionInput" className="form-label fw-bold">
              <FontAwesomeIcon icon={faMessage} className="mx-1" />
              Business Description:
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="bizDescriptionInput"
              value={bizDescription}
              onChange={handleBizDescriptionChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="bizAddressInput" className="form-label fw-bold">
              <FontAwesomeIcon icon={faMapLocationDot} className="mx-1" />
              Business Address:
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="bizAddressInput"
              value={bizAddress}
              onChange={handleBizAddressChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="bizPhoneInput" className="form-label fw-bold">
              <FontAwesomeIcon icon={faSquarePhone} className="mx-1" />
              Business Phone:
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="bizPhoneInput"
              value={bizPhone}
              onChange={handleBizPhoneChange}
            />
          </div>
          <div className="mb-3 text-center">
            <label htmlFor="bizImageInput" className="form-label fw-bold">
              <FontAwesomeIcon icon={faImage} className="mx-1" />
              Business Image (url):
            </label>
            <input
              type="text"
              className="form-control w-75 mx-auto"
              id="bizImageInput"
              value={bizImage}
              onChange={handleBizImageChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Create Card
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default CreateCardPage;
