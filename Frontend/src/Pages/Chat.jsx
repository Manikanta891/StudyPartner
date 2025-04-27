import React, { useState, useEffect } from "react";
import "./Chat.css";

function Chat() {
  const [activeSection, setActiveSection] = useState("requests"); // Default to "Connection Requests"
  const [connectionRequests, setConnectionRequests] = useState([]); // State for connection requests

  const [friends, setFriends] = useState([]); // State for friends
  const loggedInUserEmail = JSON.parse(localStorage.getItem("user"))?.email; // Get logged-in user's email

  // Fetch connection requests from the backend
  useEffect(() => {
    const fetchConnectionRequests = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/connections/requests/${loggedInUserEmail}`);
        const data = await res.json();

        if (res.ok) {
          console.log("Fetched connection requests:", data.requests); // Debugging log
          setConnectionRequests(data.requests); // Store pending connection requests
        } else {
          alert(data.message || "Failed to fetch connection requests");
        }
      } catch (err) {
        console.error("Error fetching connection requests:", err);
        alert("Something went wrong");
      }
    };

    fetchConnectionRequests();
  }, [loggedInUserEmail]);

  // Fetch friends from the backend
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/connections/${loggedInUserEmail}`);
        const data = await res.json();

        if (res.ok) {
          // Filter connections where the status is "connected"
          const connectedFriends = data.connections
            .filter((conn) => conn.status === "connected")
            .map((conn) => {
              // Determine the other user in the connection
              return conn.email_user1.email === loggedInUserEmail
                ? conn.email_user2 // If logged-in user is email_user1, return email_user2
                : conn.email_user1; // Otherwise, return email_user1
            });

          setFriends(connectedFriends); // Update the friends state
        } else {
          alert(data.message || "Failed to fetch friends");
        }
      } catch (err) {
        console.error("Error fetching friends:", err);
        alert("Something went wrong");
      }
    };

    fetchFriends();
  }, [loggedInUserEmail, connectionRequests]); // Re-fetch friends when connectionRequests change

  // Handle Accept Request
  const handleAccept = async (email_user1) => {
    try {
      const res = await fetch("http://localhost:5000/api/connections/accept", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_user1, // Sender's email
          email_user2: loggedInUserEmail, // Logged-in user's email
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Connection request accepted!");
        // Remove the accepted request from the state
        setConnectionRequests((prev) =>
          prev.filter((request) => request.email_user1.email !== email_user1)
        );
      } else {
        alert(data.message || "Failed to accept connection request");
      }
    } catch (err) {
      console.error("Error accepting connection request:", err);
      alert("Something went wrong");
    }
  };

  // Handle Reject Request
  const handleReject = async (email_user1) => {
    try {
      const res = await fetch("http://localhost:5000/api/connections/reject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_user1, // Sender's email
          email_user2: loggedInUserEmail, // Logged-in user's email
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Connection request rejected!");
        // Remove the rejected request from the state
        setConnectionRequests((prev) =>
          prev.filter((request) => request.email_user1 !== email_user1)
        );
      } else {
        alert(data.message || "Failed to reject connection request");
      }
    } catch (err) {
      console.error("Error rejecting connection request:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="chat-container">
      {/* Section Tabs */}
      <div className="section-tabs">
        <button
          className={`tab-btn ${activeSection === "friends" ? "active" : ""}`}
          onClick={() => setActiveSection("friends")}
        >
          Friends
        </button>
        <button
          className={`tab-btn ${activeSection === "requests" ? "active" : ""}`}
          onClick={() => setActiveSection("requests")}
        >
          Connection Requests
        </button>
        <button
          className={`tab-btn ${activeSection === "chat" ? "active" : ""}`}
          onClick={() => setActiveSection("chat")}
        >
          Chats
        </button>
      </div>

      {/* Section Content */}
      {activeSection === "requests" && (
        <div className="requests-section">
          <h2>Connection Requests</h2>
          {connectionRequests.length > 0 ? (
            connectionRequests.map((request) => (
              <div key={request._id} className="request-item">
                <img
                  src={request.email_user1.profilePhotoUrl || "https://via.placeholder.com/150"}
                  alt={request.email_user1.name || "Unknown User"}
                  className="avatar"
                />
                <div>
                  <h3>{request.email_user1.name || request.email_user1.email}</h3>
                  <p>Sent you a connection request</p>
                </div>
                <div>
                  <button
                    className="accept-btn"
                    onClick={() => handleAccept(request.email_user1.email)}
                  >
                    Accept
                  </button>
                  <button
                    className="decline-btn"
                    onClick={() => handleReject(request.email_user1.email)}
                  >
                    Decline
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No connection requests found.</p>
          )}
        </div>
      )}

      {/* Placeholder for other sections */}
      {activeSection === "friends" && (
        <div className="friends-section">
          <h2>Your Friends</h2>
          {friends.length > 0 ? (
            friends.map((friend, index) => (
              <div key={index} className="friend-item">
                <img
                  src={friend.profilePhotoUrl || "https://via.placeholder.com/150"}
                  alt={friend.name || "Unknown User"}
                  className="avatar"
                />
                <div>
                  <h3>{friend.name || friend.email}</h3>
                </div>
              </div>
            ))
          ) : (
            <p>No friends found.</p>
          )}
        </div>
      )}
      {activeSection === "chat" && <div className="chat-section"><h2>Your Chats</h2></div>}
    </div>
  );
}

export default Chat;
