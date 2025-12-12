import React, { useState, useMemo } from "react";
import { Play, Settings, Clock, Search, Table as TableIcon, Grid } from "lucide-react";
import RunModal from "./RunModal.jsx";
//import History from "./History.jsx";
import MonitoringScreen from "./MonitoringScreen.jsx";


export default function ProjectCatalog() {
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
  const [viewMode, setViewMode] = useState("cards");

  // Modal + navigation state
  const [showRunModal, setShowRunModal] = useState(false);
  const [showHistoryScreen, setShowHistoryScreen] = useState(false);

  const [activeProject, setActiveProject] = useState(null);
  const [latestRunData, setLatestRunData] = useState(null); // For History screen

  // ------- FILTERED LIST -------
  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesDept =
        departmentFilter === "All" || p.department === departmentFilter;

      return matchesQuery && matchesStatus && matchesDept;
    });
  }, [query, statusFilter, departmentFilter, projects]);

  const statuses = ["All", ...new Set(projects.map((p) => p.status))];
  const departments = ["All", ...new Set(projects.map((p) => p.department))];

  // ------- STATUS BADGE COLORS -------
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

  // ------- ACTION HANDLERS -------
  function openRunModal(project) {
    setActiveProject(project);
    setShowRunModal(true);
  }

  function triggerRun(data) {
    setShowRunModal(false);
    setLatestRunData(data);

    // simulate navigation to history screen
    setTimeout(() => setShowHistoryScreen(true), 200);
  }

  // HISTORY button on each card
  function openHistory(project) {
    setActiveProject(project);
    setShowHistoryScreen(true);
  }

  // EXIT from History page
  function closeHistory() {
    setShowHistoryScreen(false);
  }

  // =============== RENDER HISTORY SCREEN ===============
  if (showHistoryScreen) {
    return (
      <MonitoringScreen
        project={activeProject}
        latestRun={latestRunData}
        onClose={closeHistory}
      />
    );
  }

  // =============== MAIN PROJECT CATALOG UI ===============
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">QnA — Projects</h1>
          <p className="text-sm text-slate-600">Project catalog & quick actions</p>
        </div>

        {/* SEARCH + FILTERS */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2 text-slate-400" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Project ID or description..."
              className="pl-9 pr-4 py-2 rounded-md border border-slate-200 bg-white shadow-sm w-72"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md border"
          >
            {statuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-md border"
          >
            {departments.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {/* CARDS / TABLE TOGGLE */}
          <div className="flex items-center rounded-md border bg-white">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2 ${viewMode === "cards" ? "bg-slate-100" : ""}`}
            >
              <Grid size={16} />
            </button>

            <button
              onClick={() => setViewMode("table")}
              className={`p-2 ${viewMode === "table" ? "bg-slate-100" : ""}`}
            >
              <TableIcon size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LIST */}
      {viewMode === "cards" ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <article key={p.id} className="bg-white rounded-2xl p-5 shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">{p.id}</span>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${statusClass(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{p.domain}</h2>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                    {p.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => openRunModal(p)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-sky-50 border border-sky-100 text-sky-700"
                  >
                    <Play size={14} /> Run
                  </button>

                  <button className="flex items-center gap-2 px-3 py-2 rounded-md bg-white border">
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
            </article>
          ))}
        </section>
      ) : (
        <section className="bg-white rounded-2xl p-4 shadow-md">
          <table className="min-w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-3">Project ID</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Department</th>
                <th className="py-2 px-3">Domain</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Last Run</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-3 px-3">{p.id}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${statusClass(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">{p.department}</td>
                  <td className="py-3 px-3">{p.domain}</td>
                  <td className="py-3 px-3 text-sm text-slate-600">
                    {p.description}
                  </td>
                  <td className="py-3 px-3">{p.lastRun}</td>

                  <td className="py-3 px-3 flex gap-2">
                    <button
                      onClick={() => openRunModal(p)}
                      className="px-2 py-1 border rounded"
                    >
                      <Play size={14} />
                    </button>

                    <button className="px-2 py-1 border rounded">
                      <Settings size={14} />
                    </button>

                    <button
                      onClick={() => openHistory(p)}
                      className="px-2 py-1 border rounded"
                    >
                      <Clock size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* RUN MODAL */}
      {showRunModal && activeProject && (
        <RunModal
          project={activeProject}
          onClose={() => setShowRunModal(false)}
          onTrigger={triggerRun}
        />
      )}
    </div>
  );
}
