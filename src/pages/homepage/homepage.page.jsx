import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./homepage.page.css";

const HomePage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);

  const isLoggedIn = () => {
    if (loggedIn) {
      return (
        <div className="text-center">
          <h5> You are logged in!</h5>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <h5> No user is logged in...</h5>
        </div>
      );
    }
  };
  return (
    <Fragment>
      <div className="container ">
        <h1 className="text-center p-3">Welcome Home {user.name}</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="p-2">{isLoggedIn()}</div>
          <div className="box p-2">
            <div class="position-relative overflow-hidden my-2 p-3 p-md-5 m-md-3 text-center bg-light">
              <div class="col-md-5 p-lg-5 mx-auto">
                <h1 class="display-4 fw-normal">Business Cards!</h1>
                <p class="lead fw-normal">
                  Make a real impression on people with your own unique business
                  card! sign up today a business to create as many as you'd
                  like.
                </p>
                <Link class="btn btn-outline-secondary" to="/businesssignup">
                  Signup
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
