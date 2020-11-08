import React from 'react'
import { Notification } from 'components/Notification/Notification'
import { WikipediaMessageData } from 'stores/Messages'
import { HighlightOutlined } from '@ant-design/icons'
import { cyan } from '@ant-design/colors'
const { Icon, User, Title, Content } = Notification

const color = cyan[5]

export default function NotificationCategorize ({
  details
}: {
  details: WikipediaMessageData
}) {
  return (
    <Notification color={color}>
      <Icon>
        <HighlightOutlined />
      </Icon>
      <Content>
        <Title href={details.meta.uri}>{details.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: details.parsedcomment }} />
        <User name={details.user} countryCode={details.countrycode} />
      </Content>
    </Notification>
  )
}
