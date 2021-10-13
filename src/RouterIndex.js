import React from "react";
import {HashRouter,Redirect,Route,Switch } from 'react-router-dom'
import CreateProject from "./views/CreateProject/CreateProject";
import CreateTeam from "./views/CreatTeam/CreateTeam";
import Login from "./views/Login/Login";
import PageFrame from "./views/PageFrame/PageFrame";

export default function RouterIndex() {
  return (
    <HashRouter>
      {/* {
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
            <Switch>
              <Route path="/Login">
                <Login/>
              </Route>
              <Redirect to="/Login" ></Redirect>
            </Switch>
        } */}
      <Switch>
        <Route path="/CreateTeam">
          <CreateTeam/>
        </Route>
        <Route path="/CreateProject">
          <CreateProject/>
        </Route>
        <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/">
          {localStorage.getItem("token")?
          <PageFrame></PageFrame>:
          <Redirect to="/Login"/>}
        </Route>
      </Switch>
    </HashRouter>
  )
}
