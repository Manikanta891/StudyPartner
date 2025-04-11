const Header = () => {
  return (
    <div
      style={{
        background: "#fff",
        color: "#1a1a1a",
        padding: "10px 20px",
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "sans-serif",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ccc",
        position: "fixed",
        top: 0,
        left: "250px",
        right: 0,
        height: "70px",
        zIndex: 1001,
      }}
    >
      <div>Welcome, Student!</div>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/appointment-reminders--v1.png"
          alt="Notifications"
          style={{ width: 24, height: 24, cursor: "pointer" }}
        />
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User Avatar"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};

export default Header;
