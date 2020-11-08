import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import NotificationEdit from './NotificationEdit'

export default {
  title: 'Notification/Edit',
  component: NotificationEdit
} as Meta

export const Primary = () => (
  <NotificationEdit
    details={{
      rev_id: 123,
      title: 'Article name',
      page_title: 'Article name',
      countrycode: 'pl',
      parsedcomment: 'Lorem ipsum',
      type: 'edit',
      log_action_comment: '',
      server_name: 'pl.wikipedia.org',
      user: 'Janigowski',
      meta: {
        uri: 'htts://example.com'
      }
    }}
  />
)
