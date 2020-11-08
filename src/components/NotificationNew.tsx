import React from 'react'
import Notification from 'components/Notification'
import { WikipediaMessageData } from 'stores/Messages'
import { PlusCircleOutlined } from '@ant-design/icons'
import { lime } from '@ant-design/colors'
const { Icon, User, Title, Content, Flag } = Notification
const color = lime[5]

export default function NotificationEdit ({
  details
}: {
  details: WikipediaMessageData
}) {
  return (
    <Notification color={color}>
      <Icon>
        <PlusCircleOutlined />
      </Icon>
      <Content>
        <Title href={details.meta.uri}>{details.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: details.parsedcomment }} />
        <User name={details.user} />
        {details.countrycode && <Flag countryCode={details.countrycode} />}
      </Content>
    </Notification>
  )
}
