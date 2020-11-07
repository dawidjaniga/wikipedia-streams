import {
  createStore,
  StoreActionApi,
  createHook,
  defaults
} from 'react-sweet-state'
import { produce } from 'immer'

defaults.mutator = (currentState, producer) => produce(currentState, producer)

type State = {
  isStreamLive: boolean
  messagesReceived: number
  messages: WikipediaMessageData[]
}
type StoreApi = StoreActionApi<State>
type Actions = typeof actions

const streamUrl = 'https://stream.wikimedia.org/v2/stream/recentchange'
let stream: EventSource

type WikipediaMessage = {
  data: string
}

export type WikipediaMessageData = {
  page_title: string
  rev_id: number
  type: string
  parsedcomment: string
  log_action_comment: string
  title: string
  user: string
  server_name: string
  meta: {
    uri: string
  }
  countrycode?: string
}

const initialState: State = {
  isStreamLive: false,
  messagesReceived: 0,
  messages: []
}

let messageCounter = 0

function getCountryCodeFromServerName (serverName: string) {
  const [countryCode] = serverName.split('.')
  const nonStandardMap: { [index: string]: string } = {
    el: 'gr',
    en: 'us'
  }

  if (countryCode.length === 2) {
    const nonStandard = nonStandardMap[countryCode]

    return nonStandard || countryCode
  }
}

const actions = {
  startStream: () => ({ setState, dispatch }: StoreApi) => {
    stream = new EventSource(streamUrl)
    stream.onmessage = (message: WikipediaMessage) => {
      const data = JSON.parse(message.data)

      dispatch(actions.addMessage(data))
      // if (messageCounter % 2 === 0) {
      //   dispatch(actions.addMessage(data))
      // }
      messageCounter++
    }

    // @ts-ignore
    setState(draft => {
      draft.isStreamLive = true
    })
  },
  stopStream: () => ({ setState }: StoreApi) => {
    stream.close()
    // @ts-ignore
    setState(draft => {
      draft.isStreamLive = false
    })
  },
  addMessage: (message: WikipediaMessageData) => ({ setState }: StoreApi) => {
    message.countrycode = getCountryCodeFromServerName(message.server_name)
    // @ts-ignore
    setState(draft => {
      draft.messages.unshift(message)
      draft.messagesReceived++

      if (draft.messages.length > 10) {
        draft.messages.length = 10
      }
    })
  }
}

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const useMessages = createHook(Store)
