"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Eye, Target, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

export function VisionMissionSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: Eye,
      title: "الرؤية",
      content:
        "تتمثل رؤيتنا في أننا نسعى لإحداث تطوير ونمو شامل في هذا القطاع الذي يصب بدوره في حركة النمو الاقتصادية التي تشهدها المملكة العربية السعودية.",
      gradient: "from-blue-500/20 to-purple-500/20",
    },
    {
      icon: Target,
      title: "الرسالة",
      content:
        "نعمل من أجل تطوير وتسهيل تملك العقار داخل المملكة العربية السعودية والمساهمة في دعم الجهود الرامية إلى تعزيز سوق العقار.",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    null
  )
}
