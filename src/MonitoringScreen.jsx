import { useState } from "react";
import ResultHistoryTable from "./ResultHistoryTable";
import DetailedResult from "./DetailedResult";

export default function MonitoringScreen({ project, latestRun, onClose }) {
  const [selectedResult, setSelectedResult] = useState(null);

  // Mock History Data
  const historyData = [
    {
      resultId: "RES-1025-A",
      date: "2025-12-12 10:32 AM",
      projectId: project.id,
      status: "Pass",
      duration: "3m 12s",
    },
    {
      resultId: "RES-1023-B",
      date: "2025-12-05 04:06 PM",
      projectId: project.id,
      status: "Fail",
      duration: "2m 40s",
    },
    {
      resultId: "RES-1008-C",
      date: "2025-11-28 01:54 PM",
      projectId: project.id,
      status: "Partial",
      duration: "4m 01s",
    },
    {
      resultId: "RES-1002-D",
      date: "2025-11-20 11:15 AM",
      projectId: project.id,
      status: "NR",
      duration: "—",
    },
  ];

  // Insert the latest triggered run at the top (if exists)
  const finalHistory = latestRun
    ? [{ ...latestRun, resultId: "RES-NEW" }, ...historyData]
    : historyData;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[950px] max-h-[90vh] overflow-y-auto shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 px-4 py-1 border rounded"
        >
          Close
        </button>

        <h2 className="text-2xl font-bold mb-3">
          Monitoring Jobs & Execution History
        </h2>

        <p className="text-gray-600 mb-6">
          Project: <strong>{project.id}</strong>
        </p>

        <ResultHistoryTable
          data={finalHistory}
          onView={(row) => setSelectedResult(row)}
        />

        {selectedResult && (
          <DetailedResult
            result={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </div>
    </div>
  );
}
