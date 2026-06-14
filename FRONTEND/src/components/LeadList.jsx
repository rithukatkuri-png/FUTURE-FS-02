import { useCallback, useEffect, useState } from "react";
import API from "../services/api";
import LeadForm from "./LeadForm";

function LeadList() {
  const [leads, setLeads] = useState([]);

  const fetchLeads = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteLead = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/leads/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/leads/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (id) => {
    const text = prompt("Enter Note");

    if (!text) return;

    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/leads/${id}/notes`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadLeads = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/leads", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ignore) {
          setLeads(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadLeads();

    return () => {
      ignore = true;
    };
  }, []);

  const statusClass = (status) => {
    if (status === "new") return "status-new";
    if (status === "contacted") return "status-contacted";
    if (status === "converted") return "status-converted";
    return "status-new";
  };

  return (
    <div>
      <LeadForm fetchLeads={fetchLeads} />

      <div className="card">
        <h2>All Leads</h2>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Source</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.source}</td>

                  <td>
                    <span className={statusClass(lead.status)} style={{ display: "none" }}>
                      {lead.status}
                    </span>
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead._id, e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                  </td>

                  <td>
                    <div className="notes-list">
                      {lead.notes?.map((note, index) => (
                        <div key={index} className="note-item">
                          {note.text}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td>
                    <button
                      className="btn-secondary"
                      onClick={() => addNote(lead._id)}
                    >
                      + Note
                    </button>
                    <button
                      className="btn-danger"
                      onClick={() => deleteLead(lead._id)}
                    >
                      Delete
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

export default LeadList;
