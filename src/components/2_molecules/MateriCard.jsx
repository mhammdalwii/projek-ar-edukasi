import React from "react";

export default function MateriCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <div className="text-gray-600 space-y-2">{children}</div>
    </div>
  );
}
