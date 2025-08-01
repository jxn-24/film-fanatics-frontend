import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Heart, MessageCircle, Share2, Users, Film, Calendar } from 'lucide-react';

import EditProfile from './EditProfile';

const FilmfanaticsProfile = () => {

  const user = useSelector(state => state.auth.user);

  const [activeTab, setActiveTab] = useState('watched');

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [showFollowingList, setShowFollowingList] = useState(false);

  const [profileData, setProfileData] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null); // For error display

  // Function to fetch profile data from backend
  const fetchProfileData = async () => {
    if (user && user.token) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) throw new Error('Failed to fetch profile data');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [user]);

  useEffect(() => {
    if (profileData) {
      localStorage.setItem('profileData', JSON.stringify(profileData));
    }
  }, [profileData]);

  const toggleFollowingList = () => {
    setShowFollowingList(!showFollowingList);
  };

  const FollowingList = () => (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-3">Following</h3>
      {profileData.followingUsers && profileData.followingUsers.length === 0 ? (
        <p className="text-gray-500">Not following anyone yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {profileData.followingUsers && profileData.followingUsers.map(user => (
            <li key={user.id} className="border-b border-gray-200 py-2">
              {user.name || 'Unknown User'}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setShowFollowingList(false)}
        className="mt-3 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        Close
      </button>
    </div>
  );

  const ChatModal = ({ targetId, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
      if (targetId) {
        setMessages([{ id: 1, sender: 'them', text: 'Hi from placeholder!' }]);
      }
    }, [targetId]);

    const handleSend = () => {
      if (input.trim() === '') return;
      setMessages(prev => [...prev, { id: prev.length + 1, sender: 'me', text: input }]);
      setInput('');
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 flex flex-col">
          <h2 className="text-xl font-bold mb-4">Chat with {profileData ? profileData.username : ''}</h2>
          <div className="mb-4 h-48 border border-gray-300 rounded p-2 overflow-y-auto flex flex-col space-y-2">
            {messages.length === 0 && <p className="text-gray-500 italic">No messages yet.</p>}
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`p-2 rounded max-w-xs ${
                  msg.sender === 'me' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <textarea
            className="border border-gray-300 rounded p-2 mb-2 resize-none"
            rows={2}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button onClick={handleSend} className="btn btn-primary w-full">Send</button>
          <button onClick={onClose} className="btn btn-secondary w-full mt-2">Close Chat</button>
        </div>
      </div>
    );
  };

  const handleSaveProfile = async (updatedData) => {
    if (user && user.token) {
      try {
        const token = localStorage.getItem('token');
        const mappedData = {
          ...(updatedData.name !== undefined && { username: updatedData.name }),
          ...(updatedData.bio !== undefined && { profile_info: updatedData.bio }),
        };
        const response = await fetch('http://localhost:5000/api/users/profile', {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(mappedData),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to save profile: ${errorText || response.statusText}`);
        }
        const data = await response.json();
        setProfileData(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      setProfileData(prev => ({ ...prev, ...updatedData }));
      setErrorMessage('No token available, changes saved locally only.');
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage(null);
  };

  // Refresh profile data after user actions that affect profile
  const refreshProfile = () => {
    fetchProfileData();
  };

  if (!profileData) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="profile-container max-w-6xl mx-auto px-4 py-8">
        {isEditing ? (
          <EditProfile
            initialData={profileData}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            <div className="profile-header">
              <div className="flex items-start space-x-6">
                <div className="profile-avatar">
                  {profileData.username ? profileData.username.charAt(0) : ''}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{profileData.username}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined in 2021</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{profileData.followersCount || 0} followers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Film className="w-4 h-4" />
                      <span>{profileData.moviesWatchedCount || 0} movies watched</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span
                        className="cursor-pointer underline"
                        onClick={toggleFollowingList}
                        title="Click to see following users"
                      >
                        {profileData.followingCount || 0} following
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    {profileData.profile_info || 'No bio yet.'}
                  </p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
              </div>
              {showFollowingList && <FollowingList />}
            </div>
            <div className="tab-nav">
              <div className="flex border-b">
                {['watched', 'posts', 'clubs', 'followers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="content-section">
              {activeTab === 'watched' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Watched</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {profileData.watchedMovies && profileData.watchedMovies.length > 0 ? (
                      profileData.watchedMovies.map(movie => (
                        <div key={movie.id} className="watched-movie-card p-2 bg-white rounded shadow">
                          <img src={movie.poster} alt={movie.title} className="w-full h-auto rounded" />
                          <p className="mt-2 text-center">{movie.title}</p>
                        </div>
                      ))
                    ) : (
                      <p>No watched movies yet.</p>
                    )}
                  </div>
                </div>
              )}
              {activeTab === 'posts' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Posts</h2>
                  {profileData.posts && profileData.posts.length > 0 ? (
                    profileData.posts.map(post => (
                      <div key={post.id} className="post-card p-4 mb-4 bg-white rounded shadow">
                        <p>{post.content}</p>
                        <small className="text-gray-500">{new Date(post.created_at).toLocaleString()}</small>
                      </div>
                    ))
                  ) : (
                    <p>No posts yet.</p>
                  )}
                </div>
              )}
              {activeTab === 'clubs' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Clubs</h2>
                  {profileData.joinedClubs && profileData.joinedClubs.length > 0 ? (
                    profileData.joinedClubs.map(club => (
                      <div key={club.id} className="club-card p-4 mb-4 bg-white rounded shadow">
                        <h3 className="font-semibold">{club.name}</h3>
                        <p>{club.description}</p>
                      </div>
                    ))
                  ) : (
                    <p>No clubs joined yet.</p>
                  )}
                </div>
              )}
              {activeTab === 'followers' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Followers</h2>
                  {profileData.followers && profileData.followers.length > 0 ? (
                    profileData.followers.map(follower => (
                      <div key={follower.id} className="follower-card p-2 mb-2 bg-white rounded shadow">
                        {follower.name}
                      </div>
                    ))
                  ) : (
                    <p>No followers yet.</p>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {isChatOpen && <ChatModal targetId={profileData.id} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default FilmfanaticsProfile;
