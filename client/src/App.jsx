import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import CreatorOrTag from "./components/CreatorOrTag/CreatorOrTag";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <div className="max-w-screen-xl mx-auto">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/posts" />
          </Route>
          <Route path="/posts" exact>
            <Home />
          </Route>
          <Route path="/posts/search" exact>
            <Home />
          </Route>
          <Route path="/posts/:id" exact>
            <PostDetails />
          </Route>
          <Route path={["/creators/:name", "/tags/:name"]}>
            <CreatorOrTag />
          </Route>
          <Route path="/auth" exact>
            {!user ? <Auth /> : <Redirect to="/posts" />}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
