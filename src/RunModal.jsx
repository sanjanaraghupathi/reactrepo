import { useState } from "react";

export default function RunModal({ project, onClose, onTrigger }) {
  const [referenceId, setReferenceId] = useState("");
  const [environment, setEnvironment] = useState("DEV");
  const [executionDate, setExecutionDate] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-[450px]">
        
        <h2 className="text-xl font-semibold mb-3">
          Trigger QA Run — {project.name}
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          Inputs configured from <strong>SharePoint source</strong>.
        </p>

        <label className="block font-medium">Reference ID</label>
        <input
          type="text"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
          className="border rounded px-3 py-2 w-full mt-1"
          placeholder="Enter Reference ID"
        />

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

        <label className="block font-medium mt-4">Execution Date</label>
        <input
          type="date"
          value={executionDate}
          onChange={(e) => setExecutionDate(e.target.value)}
          className="border rounded px-3 py-2 w-full mt-1"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onTrigger({
                referenceId,
                environment,
                executionDate,
                projectId: project.id,
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Trigger Run
          </button>
        </div>
      </div>
    </div>
  );
}
