import React, { useMemo, useState } from "react";
import { Play, Settings, Clock, Search as SearchIcon, Table as TableIcon, Grid } from "lucide-react";

// Single-file React component for the Project Catalog / Home Screen
// Tailwind CSS classes are used for styling. This is a high-fidelity interactive prototype (mock data).

export default function QnAProjectCatalog() {
  const initialProjects = [
    {
      id: "QA-2023-045",
      status: "Active",
      department: "Risk",
      domain: "Regulatory Compliance",
      description:
        "Review of trade reporting controls for Q3. Check whether all trades filed meet thresholds and reporting timelines.",
      lastRun: "2025-11-20",
    },
    {
      id: "QA-2024-012",
      status: "Draft",
      department: "Finance",
      domain: "Financial Reporting",
      description:
        "Validation of month-end P&L reconciliations and mapping to GL accounts. Draft checklist awaiting SME feedback.",
      lastRun: "2025-10-02",
    },
    {
      id: "QA-2022-100",
      status: "Archived",
      department: "Operations",
      domain: "Trade Processing",
      description:
        "Legacy - automation checks for failed settlements. Archived after migration to new platform.",
      lastRun: "2023-03-12",
    },
    {
      id: "QA-2025-001",
      status: "Active",
      department: "Compliance",
      domain: "Customer Due Diligence",
      description:
        "KYC checklist verification across high-risk onboarding flows, verifying ID documents against risk matrix.",
      lastRun: "2025-12-01",
    },
    {
      id: "QA-2024-099",
      status: "Active",
      department: "Risk",
      domain: "Market Risk",
      description:
        "Backtest calculations for VaR models and sensitivity checks compared to P&L attribution.",
      lastRun: "2025-09-15",
    },
  ];

  const [projects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  // Modal / panel states
  const [activeProject, setActiveProject] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [showRun, setShowRun] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchQuery =
        query.trim() === "" ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      const matchDept = departmentFilter === "All" || p.department === departmentFilter;
      return matchQuery && matchStatus && matchDept;
    });
  }, [projects, query, statusFilter, departmentFilter]);

  const statuses = ["All", ...Array.from(new Set(projects.map((p) => p.status)))];
  const departments = ["All", ...Array.from(new Set(projects.map((p) => p.department)))];

  function openConfig(p) {
    setActiveProject(p);
    setShowConfig(true);
  }
  function openRun(p) {
    setActiveProject(p);
    setShowRun(true);
  }
  function openHistory(p) {
    setActiveProject(p);
    setShowHistory(true);
  }

  // Small helpers for visual badges
  function statusClass(s) {
    switch (s) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">QnA — Projects</h1>
          <p className="text-sm text-slate-600">Project catalog & quick actions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-2 text-slate-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Project ID or description..."
              className="pl-9 pr-4 py-2 rounded-md border border-slate-200 bg-white shadow-sm w-72"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-3 py-2 rounded-md border"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <div className="flex items-center rounded-md border bg-white">
              <button
                onClick={() => setViewMode("cards")}
                className={`p-2 ${viewMode === "cards" ? "bg-slate-100" : ""}`}
                title="Card view"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`p-2 ${viewMode === "table" ? "bg-slate-100" : ""}`}
                title="Table view"
              >
                <TableIcon size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {viewMode === "cards" ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl p-5 shadow-md">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-500">{p.id}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">{p.domain}</h2>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-3">{p.description}</p>
                  </div>
                  <div className="ml-3 flex flex-col items-end gap-2">
                    <div className="text-xs text-slate-400">{p.department}</div>
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => openRun(p)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-sky-50 border border-sky-100 text-sky-700"
                      >
                        <Play size={14} /> Run
                      </button>
                      <button
                        onClick={() => openConfig(p)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border"
                      >
                        <Settings size={14} /> Config
                      </button>
                      <button
                        onClick={() => openHistory(p)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border"
                      >
                        <Clock size={14} /> History
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-slate-500">No projects match your filters.</div>
            )}
          </section>
        ) : (
          <section className="bg-white rounded-2xl p-4 shadow-md">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-3 text-sm text-slate-500">Project ID</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Status</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Department</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Domain</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Description</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Last Run</th>
                  <th className="py-2 px-3 text-sm text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="py-3 px-3 font-medium">{p.id}</td>
                    <td className="py-3 px-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusClass(p.status)}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">{p.department}</td>
                    <td className="py-3 px-3">{p.domain}</td>
                    <td className="py-3 px-3 text-sm text-slate-600">{p.description}</td>
                    <td className="py-3 px-3">{p.lastRun}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2">
                        <button onClick={() => openRun(p)} className="px-2 py-1 rounded-md border">
                          <Play size={14} />
                        </button>
                        <button onClick={() => openConfig(p)} className="px-2 py-1 rounded-md border">
                          <Settings size={14} />
                        </button>
                        <button onClick={() => openHistory(p)} className="px-2 py-1 rounded-md border">
                          <Clock size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-500">
                      No projects match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        )}
      </main>

      {/* Modals & Panels (simple prototypes) */}
      {showConfig && activeProject && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowConfig(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-lg font-semibold">Configuration — {activeProject.id}</h3>
            <p className="text-sm text-slate-500 mt-2">Simulated configuration modal for the selected project.</p>
            <div className="mt-4 space-y-3">
              <label className="block">
                <div className="text-sm text-slate-600">Run frequency</div>
                <select className="mt-1 w-full border rounded-md px-3 py-2">
                  <option>On demand</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </label>

              <label className="block">
                <div className="text-sm text-slate-600">Notification recipients</div>
                <input className="mt-1 w-full border rounded-md px-3 py-2" defaultValue={"qa-team@example.com"} />
              </label>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => setShowConfig(false)} className="px-4 py-2 rounded-md border">
                Cancel
              </button>
              <button onClick={() => setShowConfig(false)} className="px-4 py-2 rounded-md bg-sky-600 text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showRun && activeProject && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowRun(false)} />
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <h3 className="text-lg font-semibold">Run QA — {activeProject.id}</h3>
            <p className="text-sm text-slate-500 mt-2">Simulate a run that checks the knowledge base PDF against the checklist and returns statuses.</p>

            <div className="mt-4 space-y-3">
              <div className="bg-slate-50 border rounded-md p-3">
                <div className="text-sm font-medium">Selected knowledge base</div>
                <div className="text-sm text-slate-600">/mock-data/kb_{activeProject.id}.pdf</div>
              </div>

              <div className="border rounded-md p-3">
                <div className="text-sm font-medium">Checklist summary</div>
                <ul className="mt-2 text-sm list-disc list-inside text-slate-600">
                  <li>Check 1: Required fields present</li>
                  <li>Check 2: Data mapping looks correct</li>
                  <li>Check 3: Dates within threshold</li>
                </ul>
              </div>

              <div className="text-sm text-slate-600">Run Options</div>
              <div className="flex gap-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked /> Include archived docs
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" /> Verbose log
                </label>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-slate-500">Estimated checklist items: 12</div>
              <div className="flex gap-3">
                <button onClick={() => setShowRun(false)} className="px-4 py-2 rounded-md border">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // simulate a run result by switching to history with a fake entry
                    setShowRun(false);
                    setTimeout(() => {
                      setShowHistory(true);
                    }, 150); // tiny UX delay simulated
                  }}
                  className="px-4 py-2 rounded-md bg-emerald-600 text-white"
                >
                  Start Run
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHistory && activeProject && (
        <div className="fixed inset-0 z-40 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/30" onClick={() => setShowHistory(false)} />
          <div className="relative bg-white rounded-t-2xl sm:rounded-2xl p-6 w-full max-w-3xl shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Monitoring Jobs & Execution History — {activeProject.id}</h3>
                <p className="text-sm text-slate-500">Recent runs and their statuses</p>
              </div>
              <div>
                <button onClick={() => setShowHistory(false)} className="px-3 py-2 rounded-md border">
                  Close
                </button>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              {/* Mock history entries */}
              <div className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Run #20251201-01</div>
                  <div className="text-xs text-slate-500">Dec 1, 2025 — Completed</div>
                </div>
                <div className="text-sm">
                  <span className="text-emerald-700 font-medium">Passed</span>
                </div>
              </div>

              <div className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Run #20251120-03</div>
                  <div className="text-xs text-slate-500">Nov 20, 2025 — Completed</div>
                </div>
                <div className="text-sm">
                  <span className="text-amber-700 font-medium">Warnings</span>
                </div>
              </div>

              <div className="border rounded-md p-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Run #20251002-01</div>
                  <div className="text-xs text-slate-500">Oct 2, 2025 — Failed</div>
                </div>
                <div className="text-sm">
                  <span className="text-red-700 font-medium">Failed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
