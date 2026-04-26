import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function App() {
  const [releases, setReleases] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const fetchReleases = async () => {
    const res = await axios.get(`${API}/releases`);
    setReleases(res.data);
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const createRelease = async () => {
    await axios.post(`${API}/releases`, { name, date });
    setName("");
    setDate("");
    fetchReleases();
  };

  const toggleStep = async (release, key) => {
    const updatedSteps = { ...release.steps, [key]: !release.steps[key] };
    await axios.patch(`${API}/releases/${release.id}/steps`, {
      steps: updatedSteps
    });
    fetchReleases();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Release Checklist</h1>

      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <button onClick={createRelease}>Create</button>

      {releases.map(r => (
        <div key={r.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{r.name}</h3>
          <p>Status: {r.status}</p>

          {Object.keys(r.steps).map(key => (
            <div key={key}>
              <input
                type="checkbox"
                checked={r.steps[key]}
                onChange={() => toggleStep(r, key)}
              />
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
