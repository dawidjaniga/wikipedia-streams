import React from 'react'
import styled from 'styled-components'
import { Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { flag as getFlag } from 'country-emoji'

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
const UserWrapper = styled.div`
  margin: 10px 0;

  a {
    margin-right: 10px;
  }
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
        <a href={href} target='_blank' rel='noreferrer'>
          {children}
        </a>
      ) : (
        children
      )}
    </Title>
  )
}

function Flag ({ countryCode }: { countryCode: string }) {
  let flag = getFlag(countryCode) as string

  if (countryCode === 'eo') {
    flag = '🌍'
  }

  if (!flag) {
    console.warn(
      'No flag for ',
      countryCode,
      `http://${countryCode}.wikipedia.org`
    )
  }

  return <>{flag}</>
}

function User ({ name, countryCode }: { name: string; countryCode?: string }) {
  return (
    <UserWrapper>
      <a
        href={`https://en.wikipedia.org/wiki/User:${name}`}
        target='_blank'
        rel='noreferrer'
      >
        <UserOutlined /> {name}
      </a>
      {countryCode && <Flag countryCode={countryCode} />}
    </UserWrapper>
  )
}

Notification.Icon = Icon
Notification.Title = LevelTitle
Notification.User = User
Notification.Flag = Flag
Notification.Content = Content

export function Notification ({
  children,
  color
}: {
  children: React.ReactNode
  color?: string
}) {
  return <Wrapper color={color}>{children}</Wrapper>
}
