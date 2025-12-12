declare module "@ai-sdk/react" {
  import * as React from "react"

  export type MessagePart =
    | { type: "text"; text: string }
    | ({ type: string } & Record<string, any>)

  export type Message = {
    id: string
    role: "user" | "assistant"
    parts: MessagePart[]
  }

  export type ChatStatus = "idle" | "in_progress" | "done"

  export function useChat(opts?: { transport?: any }): {
    messages: Message[]
    sendMessage: (m: { text: string }) => void
    status: ChatStatus
  }
}

declare module "ai" {
  export class DefaultChatTransport {
    constructor(opts?: { api?: string })
  }

  export default DefaultChatTransport
}
