import React, { useState } from 'react'
import { Menu,Layout } from 'antd';
import style from './PageFrame.module.scss'
const { Header, Content  } = Layout;

export default function PageFrame() {
  const [current, setCurrent] = useState("Project")

  function handleClick(e){
    setCurrent(e.key)
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
          <Menu.Item key="alipay">
            我自己
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
      </Content>
    </Layout>
  )
}
