import React from "react";
// eslint-disable-next-line no-unused-vars
export default function MenuButton({ IconComponent, text, bgColor, onClick }) {
  const bgClass = bgColor || "bg-gray-500";

  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center p-4 rounded-lg text-white font-bold text-center shadow-md hover:opacity-90 transition-opacity ${bgClass}`}>
      <IconComponent size={48} className="mb-2" />
      <span className="text-sm md:text-base">{text}</span>
    </button>
  );
}
