import React from "react";
import { 
  HashRouter,
  Route,
  Routes, 
  useLocation,
  Navigate
} from 'react-router-dom'
import CreateProject from "./views/CreateProject/CreateProject";
import CreateTeam from "./views/CreatTeam/CreateTeam";
import Login from "./views/Login/Login";
import ChangePassword from './views/ChangePassword/ChangePassword'
import NotFound from "./views/NotFound/NotFound";
import PageFrame from "./views/PageFrame/PageFrame";
import Project from './views/PageFrame/Project/Project.js'
import Team from './views/PageFrame/Team/Team.js'
import Mine from './views/PageFrame/Mine/Mine.js'
import ProjectDetail from './views/PageFrame/ProjectDetail/ProjectDetail';


import ItemTable from './views/PageFrame/ProjectDetail/components/ItemTable';
import ProgressPage from './views/PageFrame/ProjectDetail/components/ProgressPage';
import Notice from './views/PageFrame/ProjectDetail/components/Notice';

export default function RouterIndex() {
  
  return (
    <HashRouter>
      <Routes>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/ChangePassword" element={<RequireAuth><ChangePassword/></RequireAuth>}></Route>
        <Route path="/CreateTeam" element={<RequireAuth><CreateTeam/></RequireAuth>}></Route>
        <Route path="/CreateProject" element={<RequireAuth><CreateProject/></RequireAuth>}></Route>
        <Route path='/' element={<RequireAuth><PageFrame/></RequireAuth>}>
          <Route path="/Project" element={<Project/>}></Route>
          <Route path="/Team" element={<Team/>}></Route>
          <Route path="/Mine" element={<Mine/>}></Route>
          <Route path="/ProjectDetail/:id/:name" element={<ProjectDetail/>}>
            <Route path={'/ProjectDetail/:id/:name/list'} element={<ItemTable/>}></Route>
            <Route path={'/ProjectDetail/:id/:name/progress'} element={<ProgressPage/>}></Route>
            <Route path={'/ProjectDetail/:id/:name/notice'} element={<Notice/>}></Route>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}

function RequireAuth({ children }) {
  let location = useLocation();

  if (!sessionStorage.getItem('token')) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  return children;
}