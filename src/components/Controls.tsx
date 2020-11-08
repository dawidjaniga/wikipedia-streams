import React from 'react'
import {
  PlayCircleFilled,
  PauseCircleFilled,
  LoginOutlined
} from '@ant-design/icons'

import { Typography, Card, Col, Row, Statistic, Slider } from 'antd'
import styled from 'styled-components'
import { useMessages } from 'stores/Messages'

import { lime, red } from '@ant-design/colors'
const { Title } = Typography

const Wrapper = styled.div`
  margin-bottom: 20px;
`

const Live = styled.div`
  color: ${red[5]};
`

export default function Controls () {
  const [
    { isStreamLive, messagesReceived, eventsPerSecond, messagesSpeed },
    { startStream, stopStream, setMessagesSpeed }
  ] = useMessages()

  return (
    <Wrapper>
      <Slider
        value={messagesSpeed}
        onChange={setMessagesSpeed}
        min={1}
        max={100}
      />
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
      <Title level={3}>Messages</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title='Received'
              value={messagesReceived}
              valueStyle={{ color: lime[6] }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title='Per second'
              precision={2}
              valueStyle={{ color: lime[6] }}
              value={eventsPerSecond}
            />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  )
}
