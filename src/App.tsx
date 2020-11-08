import React from 'react'
import './App.css'
import { Layout } from 'antd'

import styled from 'styled-components'

import Controls from 'components/Controls'
import Messages from 'components/Messages'
const { Header, Content, Footer } = Layout

const Logo = styled.div`
  color: #fff;
  font-size: 1.5em;
`

const Inner = styled.div`
  background: #fff;
  padding: 20px;
  margin: 50px;
`

function App () {
  return (
    <Layout className='layout'>
      <Header>
        <Logo>Wikipedia Streams</Logo>
      </Header>
      <Content>
        <Inner>
          <Controls />
          <Messages />
        </Inner>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Notifications Factory ©2020 Created by Janigowski
      </Footer>
    </Layout>
  )
}

export default App
