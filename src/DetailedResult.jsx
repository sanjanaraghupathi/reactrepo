// DetailedResult.jsx
import StatusBadge from "./StatusBadge";

export default function DetailedResult({ result, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70]">
      <div className="bg-white p-6 rounded-xl w-[750px] max-h-[90vh] overflow-y-auto shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-1 border rounded hover:bg-gray-100"
        >
          Close
        </button>

        <h2 className="text-2xl font-semibold mb-4">Detailed Result</h2>

        <p className="text-gray-700 mb-4">
          <strong>Result ID:</strong> {result.resultId}<br />
          <strong>Project ID:</strong> {result.projectId}<br />
          <strong>Date:</strong> {result.date}
        </p>

        <StatusBadge status={result.status} large />

        <h3 className="text-xl font-semibold mt-6 mb-2">Checkpoint Analysis</h3>

        <div className="space-y-3">
          {[
            { name: "Schema Validation", outcome: "PASS", score: 98 },
            { name: "Data Consistency", outcome: "PASS", score: 94 },
            { name: "Regulatory Rules", outcome: "FAIL", score: 61 },
            { name: "Critical Field Checks", outcome: "FAIL", score: 55 },
          ].map((cp, i) => (
            <div key={i} className="border p-3 rounded-lg">
              <p className="font-semibold">{cp.name}</p>
              <p className="text-sm">Outcome: {cp.outcome}</p>
              <div className="w-full bg-gray-200 rounded h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded"
                  style={{ width: `${cp.score}%` }}
                />
              </div>
              <p className="text-xs mt-1">{cp.score}% confidence</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mt-6 mb-2">AI Insights</h3>
        <blockquote className="border-l-4 border-blue-500 pl-4">
          AI detected multiple non-compliant fields causing the run to fail.
        </blockquote>

        <h3 className="text-xl font-semibold mt-6 mb-2">Knowledge Sources</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="border p-3 rounded-lg">
            <h4 className="font-medium mb-1">Execution Logs</h4>
            <p className="text-sm text-gray-600">
              Mock logs from the execution pipeline.
            </p>
          </div>

          <div className="border p-3 rounded-lg">
            <h4 className="font-medium mb-1">SharePoint References</h4>
            <p className="text-sm text-gray-600">
              Mock compliance rule documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
