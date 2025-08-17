import { FaSearch,  FaCalendarCheck, FaHome, FaEnvelope } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Browse Apartments",
    desc: "Explore verified apartments with detailed information and photos.",
  },
  {
    icon: <FaEnvelope />,
    title: "Send Request",
    desc: "Submit a request for the apartment you like and get in touch with the owner.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Schedule Visit",
    desc: "Coordinate with the owner to visit the apartment at your convenience.",
  },
  {
    icon: <FaHome />,
    title: "Move In",
    desc: "Finalize your request and move into your new apartment hassle-free.",
  },
];

const HowItWorks = () => {
  return (
    <div className="py-20 bg-white mb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          How It Works
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white text-3xl mb-4 shadow-lg">
                {step.icon}
              </div>

              {/* Step Number */}
              <span className="text-sm text-primary font-bold mb-2">
                Step {index + 1}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
