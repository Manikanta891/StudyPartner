import React from 'react';
import { Search } from 'lucide-react';
import './Home.css';

const categories = [
  { name: 'Study Partner', color: 'study' },
  { name: 'Guide', color: 'guide' },
  { name: 'Collaborator', color: 'collaborator' },
  { name: 'Internship Partner', color: 'internship' },
];

const posts = [
  {
    id: 1,
    type: 'Study Partner',
    user: {
      name: 'Alex Johnson',
      college: 'MIT',
      year: '3rd Year',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
    },
    content: 'Looking for a study partner for Advanced Algorithms course. Planning to prepare for coding interviews together.',
    skills: ['Data Structures', 'Algorithms', 'Python'],
  },
  // Add more sample posts as needed
];

function Home() {
  return (
    <div className="home-container">
      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
          />
        </div>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <section key={category.name}>
            <div className="category-header">
              <h3 className="category-title">{category.name}</h3>
              <span className={`category-count ${category.color}`}>
                {posts.filter(post => post.type === category.name).length} posts
              </span>
            </div>

            <div className="post-list">
              {posts
                .filter(post => post.type === category.name)
                .map(post => (
                  <div key={post.id} className="post-card">
                    <div className="post-user">
                      <img
                        src={post.user.image}
                        alt={post.user.name}
                        className="user-image"
                      />
                      <div className="user-info">
                        <h4 className="user-name">{post.user.name}</h4>
                        <p className="user-meta">{post.user.college} • {post.user.year}</p>
                      </div>
                    </div>
                    <p className="post-content">{post.content}</p>
                    <div className="skill-tags">
                      {post.skills.map(skill => (
                        <span key={skill} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button className="connect-button">
                      Connect
                    </button>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
