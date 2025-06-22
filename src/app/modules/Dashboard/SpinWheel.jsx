"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings } from "lucide-react"

const allCategories = [
  { id: 1, label: "Arts and Craft", color: "#DC2626", textColor: "white" },
  { id: 2, label: "Nature", color: "#FB923C", textColor: "white" },
  { id: 3, label: "Family", color: "#93C5FD", textColor: "black" },
  { id: 4, label: "Sport", color: "#3B82F6", textColor: "white" },
  { id: 5, label: "Friends", color: "#86EFAC", textColor: "black" },
  { id: 6, label: "Meditation", color: "#16A34A", textColor: "white" },
]

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState([])
  const audioContextRef = useRef(null)

  // Get active wheel segments based on selected categories
  const getActiveSegments = () => {
    if (selectedCategories.length === 0) return allCategories
    return allCategories.filter((cat) => selectedCategories.includes(cat.label))
  }

  const activeSegments = getActiveSegments()

  // Create audio context
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch (error) {
        console.log("Audio context not supported")
      }
    }
  }, [])

  // Handle dropdown change - toggle category selection
  const handleDropdownChange = (value) => {
    if (selectedCategories.includes(value)) {
      // Remove if already selected
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value))
    } else {
      // Add if not selected
      setSelectedCategories((prev) => [...prev, value])
    }
  }

  // Create spinning sound
  const createSpinSound = () => {
    if (!audioContextRef.current) return

    const audioContext = audioContextRef.current
    if (audioContext.state === "suspended") {
      audioContext.resume()
    }

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.type = "sawtooth"
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2.5)

    gainNode.gain.setValueAtTime(0, audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.8)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 3)
  }

  // Handle spin
  const handleSpin = () => {
    if (isSpinning || activeSegments.length === 0) return

    setIsSpinning(true)
    const randomRotation = Math.floor(Math.random() * 360) + 1440 // At least 4 full rotations
    setRotation((prev) => prev + randomRotation)
    createSpinSound()

    setTimeout(() => {
      setIsSpinning(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className='max-w-[1320px] p-5 md:p-[30px] relative -top-14 z-100 rounded-[15px] shadow mx-auto bg-white'>
        <div className="">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Spin Wheel</h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Task Category</span>
              <Select onValueChange={handleDropdownChange}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Choose categories" />
                </SelectTrigger>
                <SelectContent className="z-100">
                  {allCategories.map((category) => (
                    <SelectItem key={category.id} value={category.label}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                        {category.label}
                        {selectedCategories.includes(category.label) && <span className="ml-2 text-primary">✓</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedCategories.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Selected Categories ({selectedCategories.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => {
                  const categoryData = allCategories.find((cat) => cat.label === category)
                  return (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: categoryData?.color + "20",
                        color: categoryData?.color,
                        border: `1px solid ${categoryData?.color}40`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryData?.color }}></div>
                      {category}
                      <button
                        onClick={() => setSelectedCategories((prev) => prev.filter((cat) => cat !== category))}
                        className="ml-1 hover:bg-red-100 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </span>
                  )
                })}
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8">
            {/* Wheel Container */}
            <div className="relative">
              <div className="relative">
                <svg
                  width="300"
                  height="300"
                  viewBox="0 0 400 400"
                  className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] transition-transform duration-3000 ease-out"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  {/* Red border circle */}
                  <circle cx="200" cy="200" r="190" fill="#DC2626" />

                  {/* Wheel segments - only show selected categories */}
                  {activeSegments.length > 0 ? (
                    activeSegments.map((segment, index) => {
                      const angle = (360 / activeSegments.length) * index
                      const nextAngle = (360 / activeSegments.length) * (index + 1)
                      const startAngle = (angle * Math.PI) / 180
                      const endAngle = (nextAngle * Math.PI) / 180

                      const x1 = 200 + 170 * Math.cos(startAngle)
                      const y1 = 200 + 170 * Math.sin(startAngle)
                      const x2 = 200 + 170 * Math.cos(endAngle)
                      const y2 = 200 + 170 * Math.sin(endAngle)

                      const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1"

                      const pathData = [
                        `M 200 200`,
                        `L ${x1} ${y1}`,
                        `A 170 170 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                        `Z`,
                      ].join(" ")

                      // Calculate text position and rotation
                      const textAngle = (startAngle + endAngle) / 2
                      const textRadius = 120
                      const textX = 200 + textRadius * Math.cos(textAngle)
                      const textY = 200 + textRadius * Math.sin(textAngle)
                      const textRotation = (angle + nextAngle) / 2

                      return (
                        <g key={segment.id}>
                          <path d={pathData} fill={segment.color} stroke="white" strokeWidth="3" />
                          <text
                            x={textX}
                            y={textY}
                            fill={segment.textColor}
                            fontSize="14"
                            fontWeight="600"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          >
                            {segment.label}
                          </text>
                        </g>
                      )
                    })
                  ) : (
                    // Show placeholder when no categories selected
                    <g>
                      <circle cx="200" cy="200" r="170" fill="#E5E7EB" stroke="white" strokeWidth="3" />
                      <text
                        x="200"
                        y="200"
                        fill="#6B7280"
                        fontSize="16"
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        Select Categories
                      </text>
                    </g>
                  )}

                  {/* White dots around the wheel */}
                  {Array.from({ length: 16 }).map((_, index) => {
                    const dotAngle = (360 / 16) * index
                    const dotRadians = (dotAngle * Math.PI) / 180
                    const dotX = 200 + 185 * Math.cos(dotRadians)
                    const dotY = 200 + 185 * Math.sin(dotRadians)

                    return <circle key={index} cx={dotX} cy={dotY} r="6" fill="white" />
                  })}

                  {/* Center white circle */}
                  <circle cx="200" cy="200" r="25" fill="white" />
                </svg>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2">
                  <div className="w-0 h-0 border-l-[25px] border-r-[25px] border-b-[35px] sm:border-l-[30px] sm:border-r-[30px] sm:border-b-[50px] border-l-transparent border-r-transparent border-b-[#2F911E]"></div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <p className="text-gray-600 text-center font-medium text-sm md:text-base">Spin Wheel to pick your task</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                onClick={handleSpin}
                disabled={isSpinning || activeSegments.length === 0}
                className="bg-primary text-heading h-[62px] text-[18px] font-semibold md:w-[270px] px-6 py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 w-full sm:w-auto"
              >
                <Settings className="w-4 h-4" />
                {isSpinning ? "Spinning..." : "Spin"}
              </Button>

              <Button
                className="bg-primary text-heading h-[62px] text-[18px] font-semibold md:w-[270px] px-6 py-3 rounded-lg w-full sm:w-auto"
                onClick={() => console.log("Go to task")}
              >
                Go To Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
