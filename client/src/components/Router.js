import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";

const Router = () => {
  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    updateLoading(false);
  }, []);

  return (
    <main>
      {loading ? (
        <h1 className="heading">Page Loading....</h1>
      ) : (
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route
            path="/details/:breed"
            component={(props) => (
              <Details {...props} />
            )}
          />
        </Switch>
      )}
    </main>
  );
};

export default withRouter(Router);
