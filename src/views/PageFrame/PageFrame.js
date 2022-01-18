import React from 'react'
import {Route,Switch,useLocation,Redirect} from 'react-router-dom'
import { Layout} from 'antd';

import MyHeader from './components/Header/MyHeader.js';
import Project from './Project/Project.js'
import Team from './Team/Team.js'
import Mine from './Mine/Mine.js'
import ProjectDetail from './ProjectDetail/ProjectDetail';

import style from './PageFrame.module.scss'

const {  Content,Footer } = Layout;

export default function PageFrame() {

  return (
    <Layout className={style.layout}>
      <MyHeader></MyHeader>
      <Content className={style.content}>
        <Switch>
          <Route path="/Project">
            <Project></Project>
          </Route>
          <Route path="/Team">
            <Team></Team>
          </Route>
          <Route path="/Mine">
            <Mine></Mine>
          </Route>
          <Route path="/ProjectDetail/:id/:name">
            <ProjectDetail></ProjectDetail>
          </Route>
          <Redirect to="/Project" />
        </Switch>
      </Content>
      <Footer className={style.footer}>Oak ©2021 Created by CV-G</Footer>
    </Layout>
  )
}
