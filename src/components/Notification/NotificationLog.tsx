import React from 'react'
import { Notification } from 'components/Notification/Notification'
import { WikipediaMessageData } from 'stores/Messages'
import { ReadOutlined } from '@ant-design/icons'
import { blue } from '@ant-design/colors'
const { Icon, User, Title, Content } = Notification

const color = blue[5]

export default function NotificationLog ({
  details
}: {
  details: WikipediaMessageData
}) {
  return (
    <Notification color={color}>
      <Icon>
        <ReadOutlined />
      </Icon>
      <Content>
        <Title>{details.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: details.log_action_comment }} />
        <User name={details.user} countryCode={details.countrycode} />
      </Content>
    </Notification>
  )
}
