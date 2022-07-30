import { Fragment } from "react";
import { useSelector } from "react-redux";

const AboutPage = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const user = useSelector((state) => state.auth.userData);

  const isLoggedIn = () => {
    if (loggedIn) {
      return (
        <Fragment>
          <div className="box1 p-2">
            <p>
              Are you logged in?
              {loggedIn ? (
                <span style={{ color: "green" }}> True</span>
              ) : (
                <span style={{ color: "red" }}> True</span>
              )}
            </p>
          </div>
          <div className="box2 p-2">
            <p>
              Your Name is:
              <span style={{ color: "purple" }}> {user.name}</span>
            </p>
          </div>
          <div className="box3 p-2">
            <p>
              Your email address is:{" "}
              <span style={{ color: "violet" }}> {user.email}</span>
            </p>
          </div>
          <div className="box4 p-2">
            <p>
              Are you a Business?{" "}
              {user.biz ? (
                <span style={{ color: "green" }}> Yes</span>
              ) : (
                <span style={{ color: "red" }}> No</span>
              )}
            </p>
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
      <div className="container  m-5">
        <h1 className="text-center p-3"> About Page</h1>
        <div className="d-flex flex-column align-items-center">
          {isLoggedIn()}
          {/* <p className="aboutP">
            While this approach can work, be careful not to sound too stiff and
            unrelatable. To counter that, Allbirds uses simple copy and puts a
            face with a name by including images of its founders. Consider using
            animation to show instead of telling how your product comes
            together. Add an easy-to-skim three-step description of how your
            product stands out from the rest for some additional context.
          </p> */}
        </div>
      </div>
    </Fragment>
  );
};

export default AboutPage;
