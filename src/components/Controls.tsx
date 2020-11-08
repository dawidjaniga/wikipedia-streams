import React, { useEffect } from 'react'
import {
    PlayCircleFilled,
    PauseCircleFilled,
    LoginOutlined
  } from '@ant-design/icons'

  import { Badge } from 'antd'
import styled from 'styled-components'
import { useMessages } from 'stores/Messages'

  const Live = styled.div`
  color: #ff0000;
`

export default function Controls() {
    const [
        { isStreamLive, messagesReceived },
        { startStream, stopStream }
      ] = useMessages()
    
      useEffect(() => {
        startStream()
      }, [startStream])

    return (
        <div>
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
            Messages received{' '}
            <Badge count={messagesReceived} overflowCount={10000} />
          </div>
    )
}
