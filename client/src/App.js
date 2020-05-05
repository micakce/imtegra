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
          <AuthConsumer>
            {({ authenticated }) =>
              authenticated ? (
                <>
                  <Switch>
                    <Route exact path="/">
                      <Main />
                    </Route>
                    <Route path="/home">
                      <AllClients />
                    </Route>
                    <Route path="/clients/all">
                      <AllClients />
                    </Route>
                    <Route path="/clients/add">
                      <AddClient />
                    </Route>
                    {/* <Route path="/clients/client/:abonado"> */}
                    {/*   <ViewClient /> */}
                    {/* </Route> */}
                    <Route path="/clients/client/:abonado" component={ViewClient} />
                    <Route path="/clients/client/" component={ViewClient} />
                  </Switch>
                </>
              ) : (
                <Route path="/" component={Login} />
              )
            }
          </AuthConsumer>
        </Auth>
      </Router>
    </div>
  );
}

export default App;
