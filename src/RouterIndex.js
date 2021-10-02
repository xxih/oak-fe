import React from "react";
import {HashRouter,Redirect,Route,Switch } from 'react-router-dom'
import CreateProject from "./views/CreateProject/CreateProject";
import CreateTeam from "./views/CreatTeam/CreateTeam";
import Login from "./views/Login/Login";
import PageFrame from "./views/PageFrame/PageFrame";

export default function RouterIndex() {
  return (
    <HashRouter>
      <Switch>
        {
          localStorage.getItem("token")?(
            <Switch>
              <Route path="/CreateTeam">
                <CreateTeam/>
              </Route>
              <Route path="/CreateProject">
                <CreateProject/>
              </Route>
              <Route path="/">
                <PageFrame/>
              </Route>
              <Redirect to="/" />
            </Switch>):
              <Route path="/Login">
                <Login/>
              </Route>
        }

      </Switch>
    </HashRouter>
  )
}
