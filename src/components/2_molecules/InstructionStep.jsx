export default function InstructionStep({ icon, number, title, description }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-start space-x-4">
      <div className="flex-shrink-0 bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">{number}</div>
      <div>
        <div className="flex items-center mb-1">
          <span className="text-emerald-600 mr-2">{icon}</span>
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
