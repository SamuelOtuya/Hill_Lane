import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqData = [
  {
    question: "What types of vehicles do you sell?",
    answer: "We sell new and used cars, including sedans, SUVs, and trucks.",
  },
  {
    question: "What financing options are available at your dealership?",
    answer: "We offer loans, lease options, and financing through major banks.",
  },
  {
    question: "Can I see the maintenance history of a used car before making a purchase?",
    answer: "Yes, we provide a full maintenance history report for used cars.",
  },
  {
    question: "Is there a warranty included with the purchase of a new car?",
    answer: "Yes, all new cars come with a manufacturer's warranty.",
  },
];

export default function FAQ() {
  // const [openIndex, setOpenIndex] = useState(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);


  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">General Questions</h2>
      <div className="space-y-2">
        {faqData.map((item, index) => (
          <div key={index} className="border-b pb-2">
            <button
              className="w-full flex justify-between items-center text-left p-3 font-semibold hover:bg-gray-100 rounded-lg"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              {openIndex === index ? (
                <FiMinus className="h-5 w-5 text-gray-600" />
              ) : (
                <FiPlus className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {openIndex === index && (
              <p className="p-3 text-gray-700">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
