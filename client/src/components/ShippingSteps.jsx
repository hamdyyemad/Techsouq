import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function ShippingSteps({ currentStep }) {
  const { t } = useTranslation();
  const steps = [
    { step: 1, label: t("homepage.cart"), link: "/cart" },
    { step: 2, label: t("homepage.shipping"), link: "/shipping" },
    { step: 3, label: t("homepage.payment"), link: "/payment" },
    { step: 4, label: t("homepage.placeOrder"), link: "/placeorder" },
  ];

  const getStepClasses = (step) => {
    if (step < currentStep) {
      return "flex text-sm text-blue-500 focus:outline-none";
    } else if (step === currentStep) {
      return "flex text-sm text-gray-700 focus:outline-none";
    } else {
      return "flex text-sm text-gray-500 focus:outline-none";
    }
  };

  const getSpanClasses = (step) => {
    if (step < currentStep) {
      return "flex items-center justify-center text-white bg-blue-500 rounded-full h-5 w-5 mr-2";
    } else if (step === currentStep) {
      return "flex items-center justify-center border-2 border-blue-500 rounded-full h-5 w-5 mr-2";
    } else {
      return "flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mr-2";
    }
  };

  return (
    <div className="grid grid-cols-2 items-center justify-center mb-3 xs:w-full xs:grid-cols-1 xs:p-1">
      <div className="grid grid-cols-2">
        {steps.slice(0, 2).map(({ step, label, link }) => (
          <Link
            to={link}
            key={step}
            className={`xs:w-[25%] xs:grid xs:grid-cols-2 ${getStepClasses(
              step
            )}`}
          >
            <span className={getSpanClasses(step)}>{step}</span>
            <p className="mx-3">{label}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 xs:pt-3">
        {steps.slice(2, 4).map(({ step, label }) => (
          <button
            key={step}
            className={`xs:w-[25%] xs:grid xs:grid-cols-2 ${getStepClasses(
              step
            )}`}
            disabled
          >
            <span className={getSpanClasses(step)}>{step}</span>
            <p className="mx-3 xs:whitespace-nowrap">{label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
