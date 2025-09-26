export default function ContentCard({ title, children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-lg font-bold text-emerald-600 mb-2">{title}</h2>
      <div className="text-gray-700 space-y-1">{children}</div>
    </div>
  );
}
