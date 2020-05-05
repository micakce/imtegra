import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
import AddClient from "./AddClient";
import AllClients from "./AllClients";
import ViewClient from "./ViewClient";
import { AuthConsumer } from "./authContext";
import MyNavBar from "./MyNavBar";
import Main from "./Main";
import Login from "./Login";

function App() {
  return (
    <div className="container">
      <Router>
        <Auth>
          <MyNavBar />
          <Switch>
            <AuthConsumer>
              {({ authenticated, user }) =>
                authenticated ? (
                  <>
                    <Route path="/" exact component={Main} />
                    <Route path="/home" exact component={AllClients} />
                    <Route path="/clients/all" component={AllClients} />
                    <Route
                      path="/clients/add"
                      render={(props) => <AddClient {...props} />}
                    />
                    <Route
                      path="/clients/client"
                      render={(props) => <ViewClient {...props} />}
                    />
                  </>
                ) : (
                  <Route path="/" component={Login} />
                )
              }
            </AuthConsumer>
          </Switch>
        </Auth>
      </Router>
    </div>
  );
}

export default App;
