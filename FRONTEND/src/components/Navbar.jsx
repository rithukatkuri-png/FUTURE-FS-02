function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        ◆ Mini <span>CRM</span>
      </div>

      <button className="navbar-logout" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
