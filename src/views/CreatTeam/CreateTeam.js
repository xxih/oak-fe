import React from 'react'
import { Layout  } from 'antd';
// import style from './CreateTeam.module.scss'
const { Header, Content, Footer } = Layout;

export default function CreateTeam() {
  return (
    <Layout className="layout">
        <Header>
          <div className="logo" />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
  )
}
