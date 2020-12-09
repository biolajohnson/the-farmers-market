import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Landing from "./components/Layout/Landing";
import NavBar from "./components/Layout/Navbar";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Alert from "./components/Layout/Alert";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import { Provider } from "react-redux";
import CreateProfile from "./components/ProfileData/CreateProfile";
import EditProfile from "./components/ProfileData/EditProfile";
import store from "./store";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Post from "./components/Post/Post";
import PostForm from "./components/Posts/PostForm";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute exact path="/post/:id" component={Post} />
              <PrivateRoute exact path="/post/:id/edit" component={PostForm} />
              <PrivateRoute exact path={"/profile/:id"} component={Profile} />
              <PrivateRoute exact path={"/posts"} component={Posts} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}
export default App;
