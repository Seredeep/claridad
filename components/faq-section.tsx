"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "What is Claridad?",
    answer:
      "Claridad is a comprehensive crime mapping platform that provides real-time safety information for neighborhoods worldwide. We combine official crime data with community insights to help you make informed decisions about your safety.",
  },
  {
    question: "How does the waitlist work?",
    answer:
      "By joining our waitlist, you'll be among the first to access Claridad when we launch. We'll notify you via email when the platform becomes available in your area, and you'll get priority access to all features.",
  },
  {
    question: "Is my data safe with Claridad?",
    answer:
      "Absolutely. We take privacy seriously and use industry-standard encryption to protect your information. Your personal data is never shared with third parties, and you have full control over your privacy settings.",
  },
  {
    question: "Which cities will be supported at launch?",
    answer:
      "We're starting with major metropolitan areas in North America, Europe, and Latin America. As we grow, we'll expand to more cities based on user demand and data availability.",
  },
  {
    question: "Will Claridad be free to use?",
    answer:
      "Claridad will offer both free and premium tiers. Basic safety information and community features will be free, while advanced analytics and premium alerts will be available through our subscription plans.",
  },
  {
    question: "How can I contribute to my community's safety data?",
    answer:
      "Once launched, you'll be able to report incidents, share safety tips, and participate in community discussions. All contributions are moderated to ensure accuracy and helpfulness.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Get answers to common questions about Claridad and our mission to create safer communities.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-lg bg-white shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#58eda2]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#58eda2]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
