import React from "react";
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import AddClient from "./AddClient.js"
import AllClients from "./AllClients.js"


function AppRouter() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/clients/add">Add Client</Link>
            </li>
            <li>
              <Link to="/users/all">All Clients</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={AllClients} />
        <Route path="/clients/add" component={AddClient} />
        {/* <Route path="/users/" component={} /> */}
      </div>
    </Router>

  );
}

export default AppRouter;
