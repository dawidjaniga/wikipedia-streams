import React from 'react'
import { WikipediaMessageData } from 'stores/Messages'
import NotificationEdit from 'components/NotificationEdit'
import NotificationLog from 'components/NotificationLog'
import NotificationCategorize from 'components/NotificationCategorize'
import NotificationNew from 'components/NotificationNew'

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
    log: NotificationLog,
    categorize: NotificationCategorize,
    new: NotificationNew
  }
  static create (type: string, details: WikipediaMessageData) {
    const Component = NotificationFactory.componentsMap[type]

    if (Component) {
      console.warn(details)
      return <Component details={details} />
    } else {
      console.warn('No component for type: ', type, details)
    }
  }
}
