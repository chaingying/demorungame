import React, { useCallback, useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItemProps {
  faq: {
    question: string
    answer: string | React.ReactNode
  }
  index: number
}

export const FaqItem: React.FC<FaqItemProps> = React.memo(({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen((prevOpen) => !prevOpen)
  }, [])

  return (
    <div key={index} className="rounded-lg border p-4 shadow-sm">
      <div 
        className="flex items-center justify-between cursor-pointer" 
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg font-medium">{faq.question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>
      <div
        id={`faq-answer-${index}`}
        className={`mt-2 text-sm text-muted-foreground overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {faq.answer}
      </div>
    </div>
  )
})

FaqItem.displayName = "FaqItem" 