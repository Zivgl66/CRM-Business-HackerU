import "./App.css";
//toastify import
import { ToastContainer } from "react-toastify";
// react router dom
import { Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";

//pages / components
import NavbarComponent from "./components/navbar/navbar.component";
import HomePage from "./pages/homepage/homepage.page";
import AboutPage from "./pages/about/about.page";
import SignupPage from "./pages/signup/signup.page";
import BusinessSignupPage from "./pages/businessSignup/businessSignup.page";
import SigninPage from "./pages/signin/signin.page";
import MyCardsPage from "./pages/mycards/mycards.page";
import LogoutPage from "./pages/logout/logout.page";
import NotFoundPage from "./pages/nofoundpage/notfound.page";
import CreateCardPage from "./pages/createcard/createcard.page";
import FooterComponent from "./components/footer/footer.component";
import AuthGuardRoute from "./components/authGuard.component";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("/auth/loginbytoken")
        .then((res) => {
          console.log("res", res);
          // const token = localStorage.getItem("token");
          localStorage.setItem("token", token);
          dispatch(authActions.login()); //update redux state
          dispatch(authActions.updateUserData(jwt_decode(token)));
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }, []);
  return (
    <div className="container">
      <NavbarComponent />
      <ToastContainer />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/businesssignup">
          <BusinessSignupPage />
        </Route>
        <Route path="/signin">
          <SigninPage />
        </Route>
        <AuthGuardRoute path="/createcard" component={CreateCardPage} />
        <AuthGuardRoute path="/mycards" component={MyCardsPage} />
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
      <FooterComponent />
    </div>
  );
}

export default App;
