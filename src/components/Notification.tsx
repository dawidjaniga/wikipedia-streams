import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const { Title } = Typography
const Icon = styled.div`
  margin-right: 20px;
`

const Wrapper = styled.div`
  border: 1px solid #f0f2f5;
  padding: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  border-top-color: ${props => props.color || '#f0f2f5'};

  ${Icon} svg {
    fill: ${props => props.color || 'initial'};
  }
`

const Content = styled.div`
  flex: 1;
`

function LevelTitle ({
  children,
  href
}: {
  children: React.ReactNode
  href?: string
}) {
  return (
    <Title level={5}>
      {href ? (
        <a href={href} target='_blank'>
          {children}
        </a>
      ) : (
        children
      )}
    </Title>
  )
}

function User ({ name }: { name: string }) {
  return (
    <span>
      <a href={`https://en.wikipedia.org/wiki/User:${name}`} target='_blank'>
        <UserOutlined /> {name}
      </a>
    </span>
  )
}

function Flag ({ countryCode }: { countryCode: string }) {
  return <img src={`https://www.countryflags.io/${countryCode}/flat/16.png`} />
}

export default function Notification ({
  children,
  color
}: {
  children: React.ReactNode
  color?: string
}) {
  return <Wrapper color={color}>{children}</Wrapper>
}

Notification.Icon = Icon
Notification.Title = LevelTitle
Notification.User = User
Notification.Flag = Flag
Notification.Content = Content
