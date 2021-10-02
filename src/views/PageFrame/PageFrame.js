import React, { useState } from 'react'
import {Route,Switch,useHistory} from 'react-router-dom'
import { Menu,Layout } from 'antd';
import style from './PageFrame.module.scss'
import Project from './Project/Project.js'
import Team from './Team/Team.js'
import Mine from './Mine/Mine.js'
const { Header, Content  } = Layout;

export default function PageFrame() {
  const [current, setCurrent] = useState("Project")
  const history = useHistory()
  function handleClick(e){
    setCurrent(e.key)
    history.push(e.key)
  }
  return (
    <Layout className="layout">
      <Header className={style.header}>
        <div className={style.team}>cv小队</div>   
        <Menu 
        onClick={handleClick} 
        selectedKeys={current} 
        mode="horizontal" 
        className={style.menu}
        >
          <Menu.Item key="Project">
            项目
          </Menu.Item>
          <Menu.Item key="Team" >
            团队
          </Menu.Item>
          <Menu.Item key="Mine">
            我自己
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Switch>
          <Route exact path="/">
            <Project></Project>
          </Route>
          <Route path="/Project">
            <Project></Project>
          </Route>
          <Route path="/Team">
            <Team></Team>
          </Route>
          <Route path="/Mine">
            <Mine></Mine>
          </Route>
        </Switch>
      </Content>
    </Layout>
  )
}
