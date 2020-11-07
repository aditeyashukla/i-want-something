import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
      <UserProvider>
        <div className="App">
          <Router>
            <div>
              {/*
              A <Switch> looks through all its children <Route>
              elements and renders the first one whose path
              matches the current URL. Use a <Switch> any time
              you have multiple routes, but you want only one
              of them to render at a time
            */}
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/dashboard">
                  <Dashboard/>
                </Route>
              </Switch>
            </div>
          </Router>
        </div>
      </UserProvider>
  );
}

export default App;
