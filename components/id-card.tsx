    "use client"

    import { useState } from "react"
    import { Card } from "@/components/ui/card"
    import { CreditCard } from "lucide-react"
    import Image from "next/image"

    export default function IdCard() {
      const [isFlipped, setIsFlipped] = useState(false)

      return (
        <div className="flex justify-center px-6">
          <div className="flip-card cursor-pointer w-full max-w-[350px] h-[200px] my-6" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`flip-card-inner relative ${isFlipped ? "flipped" : ""}`}>
              <Card className="flip-card-front absolute inset-0 overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-4 text-white shadow-xl h-[200px]">
                <div className="absolute right-0 top-0 h-32 w-32 opacity-20">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <circle cx="50" cy="50" r="40" fill="currentColor" />
                  </svg>
                </div>

                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="text-sm font-semibold tracking-wide">DIGITAL ID</span>
                    </div>
                    <div className="text-xs opacity-90">MyKad</div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="h-20 w-16 rounded bg-white/20 backdrop-blur-sm flex-shrink-0" />

                    <div className="flex-1 space-y-1 min-w-0">
                      <div>
                        <div className="text-[10px] opacity-75">Name</div>
                        <div className="font-semibold text-xs truncate">Ahmad bin Abdullah</div>
                      </div>
                      <div>
                        <div className="text-[10px] opacity-75">IC Number</div>
                        <div className="font-mono text-xs font-medium">920815-01-5678</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-white/20 pt-2">
                    <div>
                      <div className="text-[9px] opacity-75">Date of Birth</div>
                      <div className="text-[10px] font-medium">15 Aug 1992</div>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-75">Gender</div>
                      <div className="text-[10px] font-medium">Male</div>
                    </div>
                    <div>
                      <div className="text-[9px] opacity-75">State</div>
                      <div className="text-[10px] font-medium">KL</div>
                    </div>
                  </div>

                  <div className="border-t border-white/20 pt-1">
                    <div className="text-[9px] opacity-75">Address</div>
                    <div className="text-[10px] font-medium">Kuala Lumpur, Malaysia</div>
                  </div>
                </div>
              </Card>

              <Card className="flip-card-back absolute inset-0 overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 p-4 text-white shadow-xl h-[200px]">
                <div className="relative flex h-full flex-col items-center justify-center space-y-3">
                  <div className="absolute left-2 top-2">
                    <Image src="/MyKITA.png" alt="MyKITA" width={32} height={32} className="opacity-80" />
                  </div>

                  <div className="rounded-lg bg-white p-2">
                    <div className="h-24 w-24">
                      <svg viewBox="0 0 100 100" className="h-full w-full">
                        <rect width="100" height="100" fill="white" />
                        <g fill="black">
                          <rect x="10" y="10" width="15" height="15" />
                          <rect x="30" y="10" width="5" height="5" />
                          <rect x="40" y="10" width="10" height="10" />
                          <rect x="55" y="10" width="5" height="5" />
                          <rect x="65" y="10" width="5" height="5" />
                          <rect x="75" y="10" width="15" height="15" />
                          <rect x="10" y="30" width="5" height="5" />
                          <rect x="20" y="30" width="5" height="5" />
                          <rect x="30" y="30" width="10" height="10" />
                          <rect x="45" y="30" width="5" height="5" />
                          <rect x="55" y="30" width="10" height="10" />
                          <rect x="70" y="30" width="5" height="5" />
                          <rect x="80" y="30" width="5" height="5" />
                          <rect x="10" y="45" width="5" height="5" />
                          <rect x="20" y="45" width="5" height="5" />
                          <rect x="35" y="45" width="5" height="5" />
                          <rect x="45" y="45" width="10" height="10" />
                          <rect x="60" y="45" width="5" height="5" />
                          <rect x="75" y="45" width="5" height="5" />
                          <rect x="85" y="45" width="5" height="5" />
                          <rect x="10" y="60" width="5" height="5" />
                          <rect x="25" y="60" width="10" height="10" />
                          <rect x="40" y="60" width="5" height="5" />
                          <rect x="50" y="60" width="10" height="10" />
                          <rect x="65" y="60" width="5" height="5" />
                          <rect x="75" y="60" width="5" height="5" />
                          <rect x="10" y="75" width="15" height="15" />
                          <rect x="30" y="75" width="5" height="5" />
                          <rect x="40" y="75" width="10" height="10" />
                          <rect x="55" y="75" width="5" height="5" />
                          <rect x="65" y="75" width="10" height="10" />
                          <rect x="80" y="75" width="5" height="5" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-semibold">Scan to Verify</p>
                    <p className="mt-1 text-[10px] opacity-75">Officers can scan to retrieve information</p>
                  </div>

                  <div className="text-[10px] opacity-60">IC: 920815-01-5678</div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    }
