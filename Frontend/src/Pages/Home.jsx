import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import './Home.css';

const categories = [
  { name: 'study', color: 'study' },
  { name: 'guide', color: 'guide' },
  { name: 'collaborator', color: 'collaborator' },
  { name: 'internship', color: 'internship' },
];

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email; // Get logged-in user's email

  // Fetch posts from the backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json();

        if (res.ok) {
          // Filter out posts created by the logged-in user
          const filteredPosts = data.posts.filter(post => post.email !== userEmail);
          setPosts(filteredPosts);
        } else {
          alert(data.message || 'Failed to fetch posts');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        alert('Something went wrong');
      }
    };

    fetchPosts();
  }, [userEmail]);

  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="search-section">
        <div className="search-wrapper">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <section key={category.name}>
            <div className="category-header">
              <h3 className="category-title">{category.name}</h3>
              <span className={`category-count ${category.color}`}>
                {filteredPosts.filter(post => post.postType === category.name).length} posts
              </span>
            </div>

            <div className="post-list">
              {filteredPosts
                .filter(post => post.postType === category.name)
                .map(post => (
                  <div key={post._id} className="post-card">
                    <div className="post-user">
                      <img
                        src={post.userImage || 'https://via.placeholder.com/150'}
                        alt={post.userName || 'Unknown User'}
                        className="user-image"
                      />
                      <div className="user-info">
                        <h4 className="user-name">{post.userName || "Unknown User"}</h4>
                        <p className="user-meta">
                          {post.college || "Unknown College"} • {post.year || "N/A"}
                        </p>
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
