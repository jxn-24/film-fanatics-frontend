import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Users, Film, Calendar, MapPin } from 'lucide-react';
import EditProfile from './EditProfile';

const FilmfanaticsProfile = () => {
  const [activeTab, setActiveTab] = useState('watched');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  // Sample data
  const [profileData, setProfileData] = useState({
    name: 'Sophia Bennett',
    bio: 'Film enthusiast with a passion for indie cinema and classic films. Always looking for hidden gems and thought-provoking stories as of 12:27 AM EAT on Friday, July 18, 2025.',
    location: 'Los Angeles, CA',
    website: 'https://sophiabennett.com',
    email: 'sophia@example.com',
    phone: '+1 (555) 123-4567',
    birthdate: '1995-06-15',
    favoriteGenres: ['Drama', 'Thriller', 'Independent'],
    isPrivate: false,
    allowMessages: true,
    showEmail: false,
    showPhone: false,
    followersCount: 245,
    followingCount: 180,
    moviesWatchedCount: 89,
    followingUsers: [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' },
      { id: 4, name: 'Diana Prince' },
      { id: 5, name: 'Ethan Hunt' }
    ]
  });

  const toggleFollowingList = () => {
    setShowFollowingList(!showFollowingList);
  };

  // Render following users list
  const FollowingList = () => (
    <div className="mt-4 p-4 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-3">Following</h3>
      {profileData.followingUsers.length === 0 ? (
        <p className="text-gray-500">Not following anyone yet.</p>
      ) : (
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {profileData.followingUsers.map(user => (
            <li key={user.id} className="border-b border-gray-200 py-2">
              {user.name}
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

  const watchedMovies = [
    { id: 1, title: 'The Matrix', poster: '/api/placeholder/150/225', year: 2021, rating: 4.5 },
    { id: 2, title: 'Inception', poster: '/api/placeholder/150/225', year: 2010, rating: 4.8 },
    { id: 3, title: 'Interstellar', poster: '/api/placeholder/150/225', year: 2014, rating: 4.7 },
    { id: 4, title: 'The Dark Knight', poster: '/api/placeholder/150/225', year: 2008, rating: 4.9 },
    { id: 5, title: 'Pulp Fiction', poster: '/api/placeholder/150/225', year: 1994, rating: 4.6 },
    { id: 6, title: 'Fight Club', poster: '/api/placeholder/150/225', year: 1999, rating: 4.4 }
  ];

  const posts = [
    {
      id: 1,
      title: 'Just finished watching The Silent City. What a masterpiece!',
      content: 'The Silent City is a masterpiece. Director Patel has created a film that resonates in the deepest depths of the human psyche. With a cast that shines with life and emotional depth, viewers are treated to a cinematic experience that will stay with them long after the credits roll.',
      image: '/api/placeholder/300/200',
      likes: 24,
      comments: 8,
      timestamp: '2 hours ago'
    }
  ];

  const clubs = [
    { id: 1, name: 'Indie Film Society', icon: '🎬', members: 245, color: 'bg-orange-100' },
    { id: 2, name: 'Classic Cinema Club', icon: '🎭', members: 189, color: 'bg-teal-600' },
    { id: 3, name: 'Documentary Explorers', icon: '📹', members: 156, color: 'bg-slate-600' }
  ];

  const followers = [
    { id: 1, name: 'John Doe', avatar: '/api/placeholder/40/40' },
    { id: 2, name: 'Jane Smith', avatar: '/api/placeholder/40/40' },
    { id: 3, name: 'Mike Johnson', avatar: '/api/placeholder/40/40' },
    { id: 4, name: 'Sarah Wilson', avatar: '/api/placeholder/40/40' },
    { id: 5, name: 'Tom Brown', avatar: '/api/placeholder/40/40' }
  ];

  const MovieCard = ({ movie }) => (
    <div className="movie-card">
      <div className="movie-card-image aspect-[2/3] bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
        {movie.title}
      </div>
    </div>
  );

  const PostCard = ({ post }) => (
    <div className="post-card">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-2">{post.title}</h3>
          <p className="text-gray-600 mb-4">{post.content}</p>
          {post.image && (
            <div className="mb-4">
              <div className="w-full h-48 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg flex items-center justify-center text-white font-bold">
                Movie Scene
              </div>
            </div>
          )}
          <div className="flex items-center space-x-6 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <span className="text-sm">{post.timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ClubCard = ({ club }) => (
    <div className="club-card text-center">
      <div className={`w-24 h-24 rounded-full ${club.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3`}>
        {club.icon}
      </div>
      <h3 className="font-semibold text-sm mb-1">{club.name}</h3>
      <p className="text-xs text-gray-500">{club.members} members</p>
    </div>
  );

  const handleSaveProfile = (updatedData) => {
    setProfileData(prev => ({
      ...prev,
      ...updatedData
    }));
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

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
            <div className="profile-header">
              <div className="flex items-start space-x-6">
                <div className="profile-avatar">
                  SB
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-2">{profileData.name}</h1>
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined in 2021</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{profileData.followersCount} followers</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Film className="w-4 h-4" />
                      <span>{profileData.moviesWatchedCount} movies watched</span>
                    </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span
                    className="cursor-pointer underline"
                    onClick={toggleFollowingList}
                    title="Click to see following users"
                  >
                    {profileData.followingCount} following
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {profileData.bio}
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-secondary">Follow</button>
              <button 
                onClick={() => setIsFollowing(!isFollowing)}
                className={`btn ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            </div>
            {showFollowingList && <FollowingList />}
          </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tab-nav">
              <div className="flex border-b">
                {['watched', 'posts', 'clubs', 'followers'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="content-section">
              {activeTab === 'watched' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Watched</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {watchedMovies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'posts' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Posts</h2>
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {activeTab === 'clubs' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Clubs</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {clubs.map((club) => (
                      <ClubCard key={club.id} club={club} />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'followers' && (
                <div>
                  <h2 className="text-xl font-bold mb-6">Followers</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {followers.map((follower) => (
                      <div key={follower.id} className="follower-card text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                          {follower.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="text-sm font-medium">{follower.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilmfanaticsProfile;
