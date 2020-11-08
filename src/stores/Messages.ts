import {
  createStore,
  StoreActionApi,
  createHook,
  defaults
} from 'react-sweet-state'
import { produce } from 'immer'

defaults.mutator = (currentState, producer) => produce(currentState, producer)
defaults.devtools = true

type State = {
  isStreamLive: boolean
  messagesReceived: number
  eventsPerSecond: number
  messagesSpeed: number
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
  id: number
  type: string
  comment: string
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
  eventsPerSecond: 0,
  messagesSpeed: 10,
  messages: []
}

function getCountryCodeFromServerName (serverName: string) {
  const [countryCode] = serverName.split('.')
  const nonStandardMap: { [index: string]: string } = {
    el: 'gr',
    hy: 'am',
    zh: 'cn',
    uk: 'ua',
    ur: 'pk',
    cs: 'cz',
    fa: 'ir',
    ja: 'jp',
    hi: 'in',
    da: 'dk',
    ko: 'kr',
    ka: 'ge',
    fy: 'nl',
    oc: 'ad',
    or: 'in',
    he: 'il',
    te: 'in',
    ta: 'lk',
    ce: 'kg',
    sw: 'cd',
    en: 'us'
  }

  if (countryCode.length === 2) {
    const nonStandard = nonStandardMap[countryCode]

    return nonStandard || countryCode
  }
}

let messageCounter = 0
let lastMessageTime: number

const actions = {
  startStream: () => ({ getState, setState, dispatch }: StoreApi) => {
    stream = new EventSource(streamUrl)
    stream.onmessage = (message: WikipediaMessage) => {
      const data = JSON.parse(message.data)
      
      if (messageCounter % getState().messagesSpeed === 0) {
        dispatch(actions.addMessage(data))
      }
      
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
    if (!lastMessageTime) {
      lastMessageTime = Date.now()
    }

    message.countrycode = getCountryCodeFromServerName(message.server_name)

    // @ts-ignore
    setState(draft => {
      draft.messages.unshift(message)
      draft.messagesReceived++

      if (draft.messages.length > 10) {
        draft.messages.length = 10
      }

      const delta = (Date.now() - lastMessageTime) / 1000
      lastMessageTime = Date.now()
      
      draft.eventsPerSecond = 1 / delta

      
    })
  },
  setMessagesSpeed: (value: number) => ({ setState }: StoreApi) => {
    //@ts-ignore
    setState(draft => {
      draft.messagesSpeed = value
    })
  }
}

const Store = createStore<State, Actions>({
  initialState,
  actions
})

export const useMessages = createHook(Store)
