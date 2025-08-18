// src/components/FAQ.jsx

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "How do I request for an apartment?",
    answer:
      "Simply browse available apartments, click on the apartment you like, and send a request using the request button.",
  },
  {
    question: "Can I contact the apartment owner directly?",
    answer:
      "Yes, once you send a request and the owner approves, you’ll get the contact details.",
  },
  {
    question: "How can I become a member of UnitSphere?",
    answer:
      "To become a member, you just need to create an account with your email and verify it. Premium memberships will be available soon with extra benefits.",
  },
  {
    question: "Do you offer rent discounts for members?",
    answer:
      "Yes! Premium members will enjoy exclusive discounts on select apartments and priority access to new listings.",
  },
  {
    question: "Is my personal data safe?",
    answer:
      "Absolutely. We use secure authentication and encrypted storage to keep your data safe.",
  },
  {
    question: "How much does it cost to use UnitSphere?",
    answer:
      "Our platform is free for browsing and requests. Premium features like rent discounts and priority listings may come with a subscription plan.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We currently support major credit/debit cards and digital payment systems. More options will be added soon.",
  },
  {
    question: "Can I cancel my apartment request?",
    answer:
      "Yes, you can cancel your request anytime before the owner accepts it. Once approved, you’ll need to contact the owner for cancellation policies.",
  },
  {
    question: "Are there any roommate rules?",
    answer:
      "Yes. Each apartment may have its own rules, and UnitSphere encourages respect, cleanliness, and cooperation among roommates.",
  },
  {
    question: "Do I need to pay any fee to post my apartment?",
    answer:
      "Currently, posting apartments on UnitSphere is free. However, premium listing options may be introduced in the future.",
  },
  {
    question: "Is customer support available?",
    answer:
      "Yes. Our support team is available 24/7 via email or the contact form to help with your queries.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 pb-20 bg-base-200 ">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 ">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {faq.question}
                </h3>
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-indigo-500" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
};

export default FAQ;
