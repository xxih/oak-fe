import React from "react";
import { useSelector } from "react-redux";
import {HashRouter,Redirect,Route,Switch } from 'react-router-dom'
import CreateProject from "./views/CreateProject/CreateProject";
import CreateTeam from "./views/CreatTeam/CreateTeam";
import Login from "./views/Login/Login";
import PageFrame from "./views/PageFrame/PageFrame";
import ChangePassword from './views/ChangePassword/ChangePassword'

export default function RouterIndex() {
  
  const token = useSelector(state => state.token)
  return (
    <HashRouter>
      <Switch>
        <Route path="/ChangePassword">
          <ChangePassword></ChangePassword>
        </Route>
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
          {token&&sessionStorage.getItem('token')?
          <PageFrame></PageFrame>:
          <Redirect to="/Login"/>}
        </Route>
      </Switch>
    </HashRouter>
  )
}
