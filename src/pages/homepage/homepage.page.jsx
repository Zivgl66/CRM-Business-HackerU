import { Fragment } from "react";
import { useSelector } from "react-redux";
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
      <div className="container  m-5">
        <h1 className="text-center p-3">Welcome Home {user.name}</h1>
        <div className="d-flex flex-column align-items-center">
          <div className="box1 p-2">{isLoggedIn()}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
