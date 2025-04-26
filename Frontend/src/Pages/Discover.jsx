import React, { useEffect, useState } from "react";
import "./Discover.css";
import { FaSearch } from "react-icons/fa";

const Discover = () => {
  const [users, setUsers] = useState([]); // State to store users
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
                <button className="connect-btn">Connect</button>
                <button className="profile-btn">View Profile</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
