import { useState } from "react";
import API from "../services/api";

function LeadForm({ fetchLeads }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/leads",
        { name, email, source },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setEmail("");
      setSource("");

      fetchLeads();
    } catch (error) {
      console.log(error);
      alert("Failed to add lead");
    }
  };

  return (
    <div className="card">
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit} className="lead-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Source</label>
          <input
            type="text"
            placeholder="e.g. LinkedIn, Referral"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>&nbsp;</label>
          <button type="submit" className="btn-primary">
            + Add Lead
          </button>
        </div>
      </form>
    </div>
  );
}

export default LeadForm;
