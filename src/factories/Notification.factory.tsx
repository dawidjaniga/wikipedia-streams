import React from 'react'
import { WikipediaMessageData } from 'stores/Messages'
import NotificationEdit from 'components/Notification/NotificationEdit'
import NotificationLog from 'components/Notification/NotificationLog'
import NotificationCategorize from 'components/Notification/NotificationCategorize'
import NotificationNew from 'components/Notification/NotificationNew'

type ComponentsMap = {
  [index: string]: ({
    details
  }: {
    details: WikipediaMessageData
  }) => JSX.Element
}

export default class NotificationFactory {
  static componentsMap: ComponentsMap = {
    edit: NotificationEdit,
    142: NotificationEdit,
    log: NotificationLog,
    categorize: NotificationCategorize,
    new: NotificationNew
  }

  static create (type: string, details: WikipediaMessageData) {
    const Component = NotificationFactory.componentsMap[type]

    if (Component) {
      return <Component details={details} key={details.id} />
    } else {
      console.warn('No component for type: ', type, details)
    }
  }
}
