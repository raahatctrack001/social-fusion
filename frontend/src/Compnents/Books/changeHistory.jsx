import React from "react";
import DisplayContent from "../DisplayContent";

export default function ChangeHistory({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full  p-6 relative overflow-auto max-h-[80vh]">
        {/* Close Button */}
        <div className="flex justify-end mb-4 w-full">
          <button
            onClick={()=>onClose(false)}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Popup Heading */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Change History
        </h2>

        {/* List of Messages and Contents */}
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-md p-3 h-44 overflow-y-scroll"
              >
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Message: {item.message}
                </p>
                
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Content: <DisplayContent content = {item.content} /> ...
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No changes to show.</p>
          )}
        </div>
      </div>
    </div>
  );
}
