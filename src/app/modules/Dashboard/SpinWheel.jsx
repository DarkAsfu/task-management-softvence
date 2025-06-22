"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"

const wheelSegments = [
  { id: 1, label: "Sport", color: "#3B82F6", textColor: "white" },
  { id: 2, label: "Family", color: "#93C5FD", textColor: "black" },
  { id: 3, label: "Nature", color: "#FB923C", textColor: "white" },
  { id: 4, label: "Art and Craft", color: "#DC2626", textColor: "white" },
  { id: 5, label: "Meditation", color: "#16A34A", textColor: "white" },
  { id: 6, label: "Friends", color: "#86EFAC", textColor: "black" },
]

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const audioContextRef = useRef(null)
  const spinSoundRef = useRef(null)

  // Create audio context and spinning sound
  useEffect(() => {
    // Create audio context
    if (typeof window !== "undefined") {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch (error) {
        console.log("Audio context not supported")
      }
    }
  }, [])

  // Function to create spinning sound
  const createSpinSound = () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    // Resume audio context if suspended (required by some browsers)
    if (audioContext.state === "suspended") {
      audioContext.resume()
    }

    // Create oscillator for spinning sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Configure the spinning sound
    oscillator.type = "sawtooth"
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2.5)

    // Volume envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.8)

    // Start and stop the sound
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 3)

    return oscillator
  }

  // Function to create tick sound
  const createTickSound = () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current

    if (audioContext.state === "suspended") {
      audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    // Quick tick sound
    oscillator.type = "square"
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    const randomRotation = Math.floor(Math.random() * 360) + 1440 // At least 4 full rotations
    setRotation((prev) => prev + randomRotation)

    // Play spinning sound
    createSpinSound()

    // Play tick sounds during spinning
    const tickInterval = setInterval(() => {
      if (!isSpinning) {
        clearInterval(tickInterval)
        return
      }
      createTickSound()
    }, 150)

    setTimeout(() => {
      setIsSpinning(false)
      clearInterval(tickInterval)

      // Play final selection sound
      setTimeout(() => {
        createTickSound()
        setTimeout(() => createTickSound(), 100)
      }, 100)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Spin Wheel</h1>

            <Select defaultValue="art-craft">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Task Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="art-craft">Art and Craft</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="nature">Nature</SelectItem>
                <SelectItem value="meditation">Meditation</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Spin Wheel Container */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              {/* Wheel */}
              <div className="relative">
                <svg
                  width="320"
                  height="320"
                  viewBox="0 0 320 320"
                  className={`transition-transform duration-3000 ease-out ${isSpinning ? "animate-spin" : ""}`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Wheel segments */}
                  {wheelSegments.map((segment, index) => {
                    const angle = (360 / wheelSegments.length) * index
                    const nextAngle = (360 / wheelSegments.length) * (index + 1)
                    const startAngle = (angle * Math.PI) / 180
                    const endAngle = (nextAngle * Math.PI) / 180

                    const x1 = 160 + 140 * Math.cos(startAngle)
                    const y1 = 160 + 140 * Math.sin(startAngle)
                    const x2 = 160 + 140 * Math.cos(endAngle)
                    const y2 = 160 + 140 * Math.sin(endAngle)

                    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

                    const pathData = [
                      `M 160 160`,
                      `L ${x1} ${y1}`,
                      `A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `Z`,
                    ].join(" ")

                    // Calculate text position
                    const textAngle = (startAngle + endAngle) / 2
                    const textRadius = 100
                    const textX = 160 + textRadius * Math.cos(textAngle)
                    const textY = 160 + textRadius * Math.sin(textAngle)

                    return (
                      <g key={segment.id}>
                        <path d={pathData} fill={segment.color} stroke="white" strokeWidth="2" />
                        <text
                          x={textX}
                          y={textY}
                          fill={segment.textColor}
                          fontSize="14"
                          fontWeight="600"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${(angle + nextAngle) / 2}, ${textX}, ${textY})`}
                        >
                          {segment.label}
                        </text>
                      </g>
                    )
                  })}

                  {/* White dots around the wheel */}
                  {Array.from({ length: 24 }).map((_, index) => {
                    const dotAngle = (360 / 24) * index
                    const dotRadians = (dotAngle * Math.PI) / 180
                    const dotX = 160 + 150 * Math.cos(dotRadians)
                    const dotY = 160 + 150 * Math.sin(dotRadians)

                    return <circle key={index} cx={dotX} cy={dotY} r="4" fill="white" />
                  })}

                  {/* Center circle */}
                  <circle cx="160" cy="160" r="20" fill="white" stroke="#E5E7EB" strokeWidth="2" />
                </svg>

                {/* Pointer */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-b-[25px] border-l-transparent border-r-transparent border-b-green-500"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-gray-600 text-center">Spin Wheel to pick your task</p>

            {/* Spin Button */}
            <Button
              onClick={handleSpin}
              disabled={isSpinning}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 font-medium disabled:opacity-50"
            >
              <Settings className="w-4 h-4" />
              {isSpinning ? "Spinning..." : "Spin"}
            </Button>

            {/* Audio permission note */}
            <p className="text-xs text-gray-400 text-center max-w-md">
              Click the spin button to enable sound effects. Some browsers may require user interaction first.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
