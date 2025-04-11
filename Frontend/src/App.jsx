import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";

import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home";
import Discover from "./Pages/Discover";
import Chat from "./Pages/Chat";
import Profile from "./Pages/Profile";
import Post from "./Pages/Post";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth route without layout */}
        <Route path="/" element={<Auth />} />

        {/* Routes that use sidebar + header layout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post" element={<Post />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
