import React, { useEffect } from 'react'
import './App.css'
import { Layout, Menu, Breadcrumb } from 'antd'
import NotificationsFactory from 'factories/NotificationFactory'

import styled from 'styled-components'
import { useMessages, WikipediaMessageData } from 'stores/Messages'
import Controls from 'components/Controls'
const { Header, Content, Footer } = Layout

const ContentWrapper = styled.div`
  background: #fff;
  padding: 20px;
`

function App () {
  const [{ messages }, { startStream }] = useMessages()

  useEffect(() => {
    startStream()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
          {messages.map((message: WikipediaMessageData) =>
            NotificationsFactory.create(message.type, message)
          )}
        </ContentWrapper>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Notifications Factory ©2020 Created by Janigowski
      </Footer>
    </Layout>
  )
}

export default App
