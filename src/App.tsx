import React from 'react'
import './App.css'
import { Layout, Menu, Breadcrumb } from 'antd'

import styled from 'styled-components'

import Controls from 'components/Controls'
import Messages from 'components/Messages'
const { Header, Content, Footer } = Layout

const ContentWrapper = styled.div`
  background: #fff;
  padding: 20px;
`

function App () {
  return (
    <Layout className='layout'>
      <Header>
        <Menu theme='dark' mode='horizontal'>
          <Menu.Item key='1'></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <ContentWrapper>
          <Controls />
          <Messages />
        </ContentWrapper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Notifications Factory ©2020 Created by Janigowski
      </Footer>
    </Layout>
  )
}

export default App
