import React, { useEffect, useState } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Home from "../pages/Home";

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
        </Switch>
      )}
    </main>
  );
};

export default withRouter(Router);
