import { useState, useEffect } from "react";

export default function History({ activeRun, projectId, onClose }) {
  const [progress, setProgress] = useState(activeRun ? 0 : 100);

  // Simulate progress if there is an active run
  useEffect(() => {
    if (!activeRun) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [activeRun]);

  const historyRows = [
    {
      id: "RES-1025-A",
      date: "2025-12-12 10:32 AM",
      project: projectId,
      status: "Pass",
      duration: "3m 12s",
    },
    {
      id: "RES-1023-B",
      date: "2025-12-05 04:06 PM",
      project: projectId,
      status: "Fail",
      duration: "2m 40s",
    },
    {
      id: "RES-1008-C",
      date: "2025-11-28 01:54 PM",
      project: projectId,
      status: "Partial",
      duration: "4m 01s",
    },
    {
      id: "RES-1002-D",
      date: "2025-11-20 11:15 AM",
      project: projectId,
      status: "NR",
      duration: "—",
    },
  ];

  function badgeClass(status) {
    switch (status) {
      case "Pass":
        return "bg-green-100 text-green-800";
      case "Fail":
        return "bg-red-100 text-red-800";
      case "Partial":
        return "bg-yellow-100 text-yellow-800";
      case "NR":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[95vh]">
        
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold">
              Monitoring Jobs & Execution History
            </h2>
            <p className="text-gray-600 text-sm">
              Project: <strong>{projectId}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-3 py-2 border rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        {/* ACTIVE RUN SECTION */}
        {activeRun && (
          <div className="mt-6 p-4 rounded-lg border bg-blue-50">
            <h3 className="text-lg font-medium mb-2">Active Run In Progress</h3>

            <p className="text-sm text-gray-700 mb-3">
              Run ID: <strong>{activeRun.runId}</strong>
            </p>

            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-600 transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-600 mt-2">
              Status: {progress < 100 ? "Running..." : "Completed"}
            </p>
          </div>
        )}

        {/* HISTORY TABLE */}
        <h3 className="mt-8 text-xl font-semibold">Execution History</h3>

        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Result ID</th>
                <th className="p-3">Execution Date</th>
                <th className="p-3">Project ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {historyRows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{row.id}</td>
                  <td className="p-3">{row.date}</td>
                  <td className="p-3">{row.project}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${badgeClass(
                        row.status
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3">{row.duration}</td>
                  <td className="p-3">
                    <button className="text-blue-600 hover:underline">
                      View Result →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
