import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Discover.css";
import { FaSearch } from "react-icons/fa";

const Discover = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [connections, setConnections] = useState([]); // State to store existing connections
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const loggedInUserEmail = JSON.parse(localStorage.getItem("user"))?.email; // Get logged-in user's email

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users?email=${loggedInUserEmail}`);
        const data = await res.json();

        if (res.ok) {
          setUsers(data.users); // Assuming the backend returns { users: [...] }
        } else {
          alert(data.message || "Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        alert("Something went wrong");
      }
    };

    fetchUsers();
  }, [loggedInUserEmail]);

  // Fetch existing connections
  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/connections/${loggedInUserEmail}`);
        const data = await res.json();

        if (res.ok) {
          setConnections(data.connections); // Store existing connections
        } else {
          alert(data.message || "Failed to fetch connections");
        }
      } catch (err) {
        console.error("Error fetching connections:", err);
        alert("Something went wrong");
      }
    };

    fetchConnections();
  }, [loggedInUserEmail]);

  // Check connection status
  const getConnectionStatus = (userEmail) => {
    const connection = connections.find(
      (conn) =>
        (conn.email_user1 === loggedInUserEmail && conn.email_user2 === userEmail) ||
        (conn.email_user1 === userEmail && conn.email_user2 === loggedInUserEmail)
    );

    if (!connection) return "none"; // No connection exists
    if (connection.status === "pending") return "sent"; // Connection request sent
    if (connection.status === "connected") return "connected"; // Connection accepted
    return "none";
  };

  // Handle Connect Button Click
  const handleConnect = async (userEmail) => {
    try {
      const res = await fetch("http://localhost:5000/api/connections/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_user1: loggedInUserEmail, // Logged-in user's email
          email_user2: userEmail, // Selected user's email
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Connection request sent successfully!");
        setConnections((prev) => [
          ...prev,
          { email_user1: loggedInUserEmail, email_user2: userEmail, status: "pending" },
        ]); // Update connections state
      } else {
        alert(data.message || "Failed to send connection request");
      }
    } catch (err) {
      console.error("Error sending connection request:", err);
      alert("Something went wrong");
    }
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.knownSkills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="discover-container">
      <h2>Discover Students</h2>

      {/* Search with icon */}
      <div className="search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-box"
          placeholder="Search by name or skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="card-container">
        {filteredUsers.map((user, idx) => (
          <div key={idx} className="student-card">
            <img
              src={user.profilePhotoUrl || "https://via.placeholder.com/150"}
              alt={user.name}
              className="avatar"
            />
            <div className="card-info">
              <h3>{user.name}</h3>
              <p>{user.college || "Unknown College"}</p>
              <p>
                {user.branch || "Unknown Branch"} •{" "}
                {user.year ? `${user.year} Year` : "N/A"}
              </p>
              <div className="skills">
                {user.knownSkills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
              <div className="buttons">
                {getConnectionStatus(user.email) === "none" && (
                  <button
                    className="connect-btn"
                    onClick={() => handleConnect(user.email)}
                  >
                    Connect
                  </button>
                )}
                {getConnectionStatus(user.email) === "sent" && (
                  <button className="connect-btn" disabled>
                    Sent
                  </button>
                )}
                {/* Remove button if connection is accepted */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
