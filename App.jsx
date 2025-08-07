import React, { useState } from "react";

// MissionFilter Component
function MissionFilter({ currentFilter, onChangeFilter }) {
  const filters = ["All", "Planned", "Active", "Completed"];

  return (
    <div style={{ marginBottom: 20 }}>
      <strong>Filter Missions: </strong>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChangeFilter(filter)}
          style={{
            marginRight: 8,
            backgroundColor: filter === currentFilter ? "#007bff" : "#eee",
            color: filter === currentFilter ? "#fff" : "#000",
            border: "none",
            padding: "6px 12px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

// MissionAction Component
function MissionAction({ missionId, currentStatus, onUpdateStatus }) {
  // Define possible status transitions (for simplicity)
  const statusOptions = ["Planned", "Active", "Completed"];

  return (
    <div>
      <strong>Update Status: </strong>
      {statusOptions.map((status) => (
        <button
          key={status}
          disabled={status === currentStatus}
          onClick={() => onUpdateStatus(missionId, status)}
          style={{
            marginRight: 6,
            padding: "5px 10px",
            cursor: status === currentStatus ? "default" : "pointer",
            backgroundColor: status === currentStatus ? "#ccc" : "#28a745",
            color: status === currentStatus ? "#666" : "#fff",
            border: "none",
            borderRadius: 4,
          }}
        >
          {status}
        </button>
      ))}
    </div>
  );
}

// MissionCard Component
function MissionCard({ mission, onUpdateStatus }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{mission.name}</h3>
      <p>
        <strong>Status:</strong> {mission.status}
      </p>
      <p>
        <strong>Crew:</strong> {mission.crew.join(", ")}
      </p>
      <MissionAction
        missionId={mission.id}
        currentStatus={mission.status}
        onUpdateStatus={onUpdateStatus}
      />
    </div>
  );
}

// MissionControl Component
function MissionControl({ initialMissions }) {
  const [missions, setMissions] = useState(initialMissions);
  const [filter, setFilter] = useState("All");

  // Update mission status handler
  const updateMissionStatus = (id, newStatus) => {
    setMissions((missions) =>
      missions.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    );
  };

  // Filter missions based on selected filter
  const filteredMissions =
    filter === "All"
      ? missions
      : missions.filter((m) => m.status === filter);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>Space Mission Control 🎛️</h1>
      <MissionFilter currentFilter={filter} onChangeFilter={setFilter} />
      {filteredMissions.length > 0 ? (
        filteredMissions.map((mission) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            onUpdateStatus={updateMissionStatus}
          />
        ))
      ) : (
        <p>No missions found with status "{filter}".</p>
      )}
    </div>
  );
}

// App Component
function App() {
  const INITIAL_MISSIONS = [
    { id: 1, name: "Mars Rover", status: "Planned", crew: ["Alice", "Bob"] },
    { id: 2, name: "Moon Base", status: "Active", crew: ["Charlie", "Dave"] },
    { id: 3, name: "Venus Observatory", status: "Planned", crew: ["Eve", "Frank"] },
    { id: 4, name: "Jupiter Moons Survey", status: "Completed", crew: ["Grace", "Hank"] },
    { id: 5, name: "Asteroid Belt Mining", status: "Active", crew: ["Ivy", "John"] },
    { id: 6, name: "Saturn Ring Research", status: "Planned", crew: ["Karen", "Leo"] },
    { id: 7, name: "Deep Space Probe", status: "Completed", crew: ["Mia", "Nolan"] },
    { id: 8, name: "Interstellar Observatory", status: "Planned", crew: ["Olivia", "Pete"] },
    { id: 9, name: "Neptune Atmospheric Study", status: "Active", crew: ["Quinn", "Rachel"] },
    { id: 10, name: "Pluto Reclamation", status: "Planned", crew: ["Sam", "Tina"] },
  ];

  return <MissionControl initialMissions={INITIAL_MISSIONS} />;
}

export default App;
