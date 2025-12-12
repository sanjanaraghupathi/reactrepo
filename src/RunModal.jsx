import { useState } from "react";

export default function RunModal({ project, onClose, onTrigger }) {
  const [referenceId, setReferenceId] = useState("");
  const [environment, setEnvironment] = useState("DEV");
  const [executionDate, setExecutionDate] = useState("");

  function triggerRun() {
    const runData = {
      referenceId,
      environment,
      executionDate,
      projectId: project.id,
      runId: "RUN-" + Date.now(),   // unique run ID
    };

    onTrigger(runData);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[450px]">

        {/* Title */}
        <h2 className="text-xl font-semibold mb-3">
          Trigger QA Run — {project.id}
        </h2>

        {/* SharePoint source note */}
        <p className="text-sm text-gray-600 mb-4">
          Inputs configured from <strong>SharePoint source</strong>.
        </p>

        {/* Reference ID */}
        <label className="block font-medium">Reference ID</label>
        <input
          type="text"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          className="border rounded px-3 py-2 w-full mt-1"
          placeholder="Enter Reference ID"
        />

        {/* Environment dropdown */}
        <label className="block font-medium mt-4">Environment</label>
        <select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          className="border rounded px-3 py-2 w-full mt-1"
        >
          <option>DEV</option>
          <option>QA</option>
          <option>UAT</option>
          <option>PROD</option>
        </select>

        {/* Execution Date */}
        <label className="block font-medium mt-4">Execution Date</label>
        <input
          type="date"
          value={executionDate}
          onChange={(e) => setExecutionDate(e.target.value)}
          className="border rounded px-3 py-2 w-full mt-1"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={triggerRun}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Trigger Run
          </button>
        </div>
      </div>
    </div>
  );
}
