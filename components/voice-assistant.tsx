"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, MicOff, Volume2 } from "lucide-react"

export function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [lastCommand, setLastCommand] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [isSupported, setIsSupported] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSupported("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    }
  }, [])

  const speak = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-MY"
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!isSupported) {
      setFeedback("Voice commands are not supported in this browser")
      return
    }

    setIsListening(true)
    setFeedback("Listening...")
    speak("Listening for command")

    setTimeout(() => {
      const commands = [
        "Go to Personal",
        "Open Finance",
        "Show Driving License",
        "View Medical Card",
        "Pay Property Bills",
        "Check Employment",
        "Family Proxy",
      ]
      const randomCommand = commands[Math.floor(Math.random() * commands.length)]
      setLastCommand(randomCommand)
      setFeedback(`Command: ${randomCommand}`)
      speak(`Opening ${randomCommand}`)
      setIsListening(false)
    }, 2000)
  }

  const stopListening = () => {
    setIsListening(false)
    setFeedback("")
    speak("Stopped listening")
  }

  if (!isSupported) return null

  return (
    <>
      {/* Floating Icon Button inside the wrapper */}
      {!isOpen && (
        <Button
          size="lg"
          className="absolute bottom-6 right-6 h-14 w-14 z-50 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
          aria-label="Open voice assistant"
        >
          <Mic className="h-6 w-6" />
        </Button>
      )}

      {/* Voice Assistant Panel */}
      {isOpen && (
        <Card className="absolute bottom-6 right-6 w-80 shadow-lg z-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Volume2 className="h-6 w-6 text-primary" /> Voice Assistant
              </h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                ✕
              </Button>
            </div>

            {feedback && <p className="text-base text-muted-foreground mb-2">{feedback}</p>}

            {lastCommand && !isListening && (
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Last Command:</p>
                <p className="text-lg font-semibold">{lastCommand}</p>
              </div>
            )}

            <Button
              size="lg"
              variant={isListening ? "destructive" : "default"}
              className="h-14 w-14 rounded-full mt-4"
              onClick={isListening ? stopListening : startListening}
            >
              {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
