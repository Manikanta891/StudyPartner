import React from "react";
import "./Discover.css";
import { FaSearch } from "react-icons/fa";

const students = [
  {
    name: "Sarah Chen",
    university: "Stanford University",
    department: "Computer Science",
    year: "2nd Year",
    skills: ["Machine Learning", "Python", "Data Science"],
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Park",
    university: "UC Berkeley",
    department: "Electrical Engineering",
    year: "4th Year",
    skills: ["Circuit Design", "Arduino", "IoT"],
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Discover = () => {
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
        />
      </div>

      <div className="card-container">
        {students.map((student, idx) => (
          <div key={idx} className="student-card">
            <img src={student.image} alt={student.name} className="avatar" />
            <div className="card-info">
              <h3>{student.name}</h3>
              <p>{student.university}</p>
              <p>
                {student.department} • {student.year}
              </p>
              <div className="skills">
                {student.skills.map((skill, i) => (
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
