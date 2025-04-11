import React, { useState } from 'react';
import './Post.css';

const postTypes = [
  { id: 'study', name: 'Study Partner', color: 'study' },
  { id: 'guide', name: 'Guide', color: 'guide' },
  { id: 'collaborator', name: 'Collaborator', color: 'collaborator' },
  { id: 'internship', name: 'Internship Partner', color: 'internship' },
];

function Post() {
  const [postType, setPostType] = useState('');
  const [content, setContent] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ postType, content, skills });
  };

  return (
    <div className="post-container">
      <h2 className="post-heading">Create a New Post</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <div className="form-group">
          <label className="form-label">Post Type</label>
          <div className="post-type-grid">
            {postTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setPostType(type.id)}
                className={`post-type-button ${postType === type.id ? 'selected' : ''}`}
              >
                <span className={`post-type-label ${type.color}`}>
                  {type.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">Post Content</label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            placeholder="Describe what you're looking for..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills" className="form-label">Related Skills</label>
          <input
            id="skills"
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            className="input"
            placeholder="Type a skill and press Enter"
          />
          <div className="skill-list">
            {skills.map(skill => (
              <span key={skill} className="skill-tag">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="remove-skill"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
}

export default Post;