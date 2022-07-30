import { Fragment } from "react";
import { useSelector } from "react-redux";

const AboutPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);

  const isLoggedIn = () => {
    if (loggedIn) {
      return (
        <Fragment>
          <div className="box2 p-2">
            <div class="position-relative overflow-hidden my-2 p-3 p-md-5 m-md-3 text-center bg-light">
              <div class=" p-lg-5 mx-auto">
                <h1 class="display-4 fw-normal">Information</h1>
                <p class="lead fw-normal">
                  Are you logged in?
                  {loggedIn ? (
                    <span style={{ color: "green" }}> True</span>
                  ) : (
                    <span style={{ color: "red" }}> True</span>
                  )}
                </p>
                <p class="lead fw-normal">
                  Your Name is:
                  <span style={{ color: "purple" }}> {user.name}</span>
                </p>
                <p class="lead fw-normal">
                  Your email address is:{" "}
                  <span style={{ color: "violet" }}> {user.email}</span>
                </p>
                <p class="lead fw-normal">
                  Are you a Business?{" "}
                  {user.biz ? (
                    <span style={{ color: "green" }}> Yes</span>
                  ) : (
                    <span style={{ color: "red" }}> No</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Fragment>
      );
    } else {
      return (
        <div className="box2 p-2">
          <p>If you login we will provide information about you</p>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center p-3"> About Page</h1>
        <div className="d-flex flex-column align-items-center">
          {isLoggedIn()}
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
