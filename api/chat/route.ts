import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: "openai/gpt-4o-mini",
    system: `You are a helpful assistant for MyKita, a Malaysian government services portal. 
    Help users with questions about:
    - Personal details and emergency contacts
    - Finance services, subsidies, and e-wallet top-ups
    - Driving license information
    - Medical services, nearest hospitals, and insurance
    - Property services like TNB, SADA, and Indah Water bill payments
    - Employment services including KWSP and SOCSO
    - Family proxy mode for accessing family member services
    
    Always be clear, concise, and helpful. Provide information in both English and Malay when appropriate.`,
    prompt,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Chat aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
