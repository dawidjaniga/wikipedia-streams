import React, { useEffect } from 'react'
import './App.css'
import { Layout, Menu, Badge, Breadcrumb } from 'antd'
import NotificationsFactory from 'factories/NotificationFactory'
import {
  PlayCircleFilled,
  PauseCircleFilled,
  LoginOutlined
} from '@ant-design/icons'

import styled from 'styled-components'
import { useMessages, WikipediaMessageData } from 'stores/Messages'
const { Header, Content, Footer } = Layout

const ContentWrapper = styled.div`
  background: #fff;
  padding: 20px;
`

const Live = styled.div`
  color: #ff0000;
`

function App () {
  const [
    { isStreamLive, messages, messagesReceived },
    { startStream, stopStream }
  ] = useMessages()

  useEffect(() => {
    startStream()
  }, [startStream])

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
          <div>
            {isStreamLive ? (
              <PauseCircleFilled onClick={stopStream} />
            ) : (
              <PlayCircleFilled onClick={startStream} />
            )}
            <Live>
              {isStreamLive && (
                <>
                  Live <LoginOutlined />
                </>
              )}
            </Live>
            Messages received{' '}
            <Badge count={messagesReceived} overflowCount={10000} />
          </div>
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
