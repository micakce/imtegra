import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./Auth";
// import AddClient from "./AddClient";
import AddClient from "./hooksImplementation/components/AddClient";
// import AllClients from "./AllClients";
import AllClients from "./hooksImplementation/components/AllClients";
import ViewClient from "./ViewClient";
import { AuthConsumer } from "./authContext";
import MyNavBar from "./MyNavBar";
import Main from "./Main";
import Login from "./Login";
import ClientViewHook from "./hooksImplementation/ClientViewHook";
import ClientContextProvider from "./hooksImplementation/contexts/ClientContext";
import MainTable from "./hooksImplementation/components/MainTable";
import ServiceView from "./hooksImplementation/components/services/ServiceView";

function App() {
  return (
    <div className="container">
      <Router>
        <Auth>
          <ClientContextProvider>
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
                          <MainTable />
                        </Route>
                        <Route path="/clients/all">
                          <MainTable />
                        </Route>
                        <Route path="/clients/add">
                          <AddClient />
                        </Route>
                        <Route exact path="/clients/:abonado/service/:id">
                          <ServiceView />
                        </Route>
                        <Route path="/clients/:abonado">
                          <ClientViewHook />
                        </Route>
                        <Route exact path="/clients/client">
                          <ClientViewHook />
                        </Route>
                      </Switch>
                    </>
                  ) : (
                    <Route path="/" component={Login} />
                  )
              }
            </AuthConsumer>
          </ClientContextProvider>
        </Auth>
      </Router>
    </div>
  );

}
export default App;
