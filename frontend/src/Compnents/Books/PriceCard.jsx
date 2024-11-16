"use client";

import { Card } from "flowbite-react";

export default function PriceCard({
  planType,
  price,
  period,
  features,
  buttonLabel = "Choose Plan",
  onClick,
}) {
  const featureList = [
    // { key: "existingContentAccess", label: "Access to existing premium contents" },
    { key: "futureContentAccess", label: "Access to all premium content" },
    { key: "accessToAllLiveRoom", label: "Get live interaction with your authors" },
    { key: "oneToOneInteraction", label: "1:1 Interaction" },
    { key: "unlimitedBooks", label: "Write and publish unlimited books" },
    { key: "hostLiveShow", label: "Host your live show" },
    { key: "customerSupport", label: "24×7 phone & email support" },
  ];

  featureList.forEach(item=>console.log(features[item.key], item.label))

  return (
    <Card className="max-w-sm">
      <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {planType}
      </h5>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-3xl font-extrabold tracking-tight">{price}rs</span>
        <span className="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /{period}
        </span>
      </div>
      <ul className="my-7 space-y-5">
        {featureList.map(({ key, label }) => (
          <li
            key={key}
            className={`flex space-x-3 ${
              features[key] ? "" : "line-through decoration-gray-500"
            }`}
          >
            <svg
              className={`h-5 w-5 shrink-0 ${
                features[key] ? "text-cyan-600 dark:text-cyan-500" : "text-gray-400 dark:text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              {label}
            </span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </Card>
  );
}

// PriceCard.propTypes = {
//   planType: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   period: PropTypes.string.isRequired,
//   features: PropTypes.shape({
//     existingContentAccess: PropTypes.bool,
//     futureContentAccess: PropTypes.bool,
//     accessToAllLiveRoom: PropTypes.bool,
//     oneToOneInteraction: PropTypes.bool,
//     unlimitedBooks: PropTypes.bool,
//     hostLiveShow: PropTypes.bool,
//     customerSupport: PropTypes.bool,
//   }).isRequired,
//   buttonLabel: PropTypes.string,
//   onClick: PropTypes.func,
// };

// PriceCard.defaultProps = {
//   features: {
//     existingContentAccess: false,
//     futureContentAccess: false,
//     accessToAllLiveRoom: false,
//     oneToOneInteraction: false,
//     unlimitedBooks: false,
//     hostLiveShow: false,
//     customerSupport: false,
//   },
//   onClick: () => {},
// };
