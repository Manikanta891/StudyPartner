import React, { useState } from 'react';
import { Camera, Edit2, Plus } from 'lucide-react';
import './Profile.css';

const initialProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  college: "Stanford University",
  branch: "Computer Science",
  year: "3rd Year",
  bio: "Passionate about software development and machine learning. Looking to collaborate on innovative projects and learn from peers.",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  knownSkills: [
    { name: "Python", level: "Advanced" },
    { name: "Machine Learning", level: "Intermediate" },
    { name: "React", level: "Advanced" },
    { name: "Node.js", level: "Intermediate" }
  ],
  learningSkills: ["Cloud Computing", "DevOps", "Mobile Development"]
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newLearningSkill, setNewLearningSkill] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        knownSkills: [...prev.knownSkills, { name: newSkill.trim(), level: 'Beginner' }]
      }));
      setNewSkill('');
    }
  };

  const handleAddLearningSkill = (e) => {
    if (e.key === 'Enter' && newLearningSkill.trim()) {
      setProfile(prev => ({
        ...prev,
        learningSkills: [...prev.learningSkills, newLearningSkill.trim()]
      }));
      setNewLearningSkill('');
    }
  };

  const handleUpdateProfile = () => {
    console.log('Updating profile:', profile);
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="card profile-header">
        <div className="cover-image">
          <button className="camera-btn">
            <Camera size={20} />
          </button>
        </div>
        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img src={profile.image} alt={profile.name} className="avatar" />
              <button className="small-camera-btn">
                <Camera size={16} />
              </button>
            </div>
            <div className="profile-info">
              <div className="profile-top-row">
                <div>
                  <h1 className="profile-name">{profile.name}</h1>
                  <p className="profile-email">{profile.email}</p>
                </div>
                <button onClick={() => setIsEditing(!isEditing)} className="edit-btn">
                  <Edit2 size={16} />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
          </div>
          <div className="profile-bio">
            <h3>About</h3>
            {isEditing ? (
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            ) : (
              <p>{profile.bio}</p>
            )}
            <div className="profile-grid">
              <div>
                <h4>College</h4>
                <p>{profile.college}</p>
              </div>
              <div>
                <h4>Branch</h4>
                <p>{profile.branch}</p>
              </div>
              <div>
                <h4>Year</h4>
                <p>{profile.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="card">
        <div className="card-content">
          <h2>Skills</h2>
          <div className="skills-section">
            <div>
              <h3>Known Skills</h3>
              <div className="skill-tags">
                {profile.knownSkills.map(skill => (
                  <span key={skill.name} className="skill known">
                    {skill.name} <span className="skill-level">• {skill.level}</span>
                  </span>
                ))}
                {isEditing && (
                  <div className="input-skill-wrapper">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={handleAddSkill}
                      placeholder="Add skill..."
                    />
                    <Plus size={14} className="plus-icon" />
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3>Want to Learn</h3>
              <div className="skill-tags">
                {profile.learningSkills.map(skill => (
                  <span key={skill} className="skill learning">
                    {skill}
                  </span>
                ))}
                {isEditing && (
                  <div className="input-skill-wrapper">
                    <input
                      type="text"
                      value={newLearningSkill}
                      onChange={(e) => setNewLearningSkill(e.target.value)}
                      onKeyDown={handleAddLearningSkill}
                      placeholder="Add skill to learn..."
                    />
                    <Plus size={14} className="plus-icon" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="profile-actions">
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
          <button onClick={handleUpdateProfile} className="save-btn">Save Changes</button>
        </div>
      )}
    </div>
  );
}


export default Profile;