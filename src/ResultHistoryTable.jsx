import StatusBadge from "./StatusBadge";

export default function ResultHistoryTable({ data, onView }) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-3">Execution History</h3>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Result ID</th>
            <th className="p-2">Execution Date</th>
            <th className="p-2">Project ID</th>
            <th className="p-2">Status</th>
            <th className="p-2">Duration</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={row.resultId} className="border-b hover:bg-gray-50">
              <td className="p-2 font-medium">{row.resultId}</td>
              <td className="p-2">{row.date}</td>
              <td className="p-2">{row.projectId}</td>
              <td className="p-2"><StatusBadge status={row.status} /></td>
              <td className="p-2">{row.duration}</td>

              <td className="p-2">
                <button
                  onClick={() => onView(row)}
                  className="text-blue-600 underline"
                >
                  View Result →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
