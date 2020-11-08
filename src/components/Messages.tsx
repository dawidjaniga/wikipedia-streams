import React from 'react'

import { useEffect } from 'react'
import NotificationsFactory from 'factories/Notification.factory'
import { useMessages, WikipediaMessageData } from 'stores/Messages'

export default function Messages () {
  const [{ messages }, { startStream }] = useMessages()

  useEffect(() => {
    startStream()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {messages.map((message: WikipediaMessageData) =>
        NotificationsFactory.create(message.type, message)
      )}
    </>
  )
}
