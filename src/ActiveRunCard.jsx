// ActiveRunCard.jsx
export default function ActiveRunCard({ run }) {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Active Run</h3>

      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">{run.id}</span>
        <span className="text-sm text-blue-600">{run.progress}% Complete</span>
      </div>

      <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-3"
          style={{ width: `${run.progress}%` }}
        ></div>
      </div>

      <p className="mt-2 text-sm text-gray-700">Status: {run.status}</p>
    </div>
  );
}
