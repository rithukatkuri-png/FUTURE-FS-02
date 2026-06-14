import Navbar from "../components/Navbar";
import LeadList from "../components/LeadList";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="page-title">
          Client Lead <span>Management</span>
        </h1>

        <LeadList />
      </div>
    </>
  );
}

export default Dashboard;
