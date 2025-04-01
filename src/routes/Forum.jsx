import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from "../layout/console.js";

const Forum = () => {
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [newComment, setNewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          googleId: user.uid,
          email: user.email,
          username: user.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/forum/topics`);
        if (Array.isArray(response.data)) {
          setTopics(response.data);
          setFilteredTopics(response.data);
        } else {
          console.error('Expected an array but received:', response.data);
          setTopics([]);
          setFilteredTopics([]);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
        setFilteredTopics([]);
      }
    };

    fetchTopics();
  }, []);
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
    
        const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userData = {
        googleId: user.uid,
        email: user.email,
        username: user.displayName,
      };

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  const handleCreateTopic = async () => {
    if (!topicTitle || !topicDescription) {
      toast.error('Title and description are required');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/forum/topics`, {
        title: topicTitle,
        description: topicDescription,
      });

      const newTopic = response.data;
      setTopics([newTopic, ...topics]);
      setFilteredTopics([newTopic, ...topics]);
      setTopicTitle('');
      setTopicDescription('');
      toast.success('Topic created successfully');
    } catch (error) {
      toast.error('Failed to create topic');
    }
  };

  const handleAddComment = async (topicId) => {
    if (!user) {
      toast.error('You must be logged in to comment!');
      return;
    }

    const newCommentData = {
      user: user.username,
      text: newComment,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/forum/${topicId}/comments`, newCommentData);

      const updatedTopics = topics.map((topic) =>
        topic._id === topicId
          ? { ...topic, comments: [...topic.comments, response.data] }
          : topic
      );

      setTopics(updatedTopics);
      setFilteredTopics(updatedTopics);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
    );

    setFilteredTopics(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center font-bold text-4xl mb-4">Forum</h1>

      {/* Search Bar (Now at the Top) */}
      <input
        type="text"
        placeholder="Search topics..."
        value={searchQuery}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full"
      />

      {/* Google Login Button */}
      {!user ? (
        <button onClick={handleGoogleLogin} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Login with Google
        </button>
      ) : (
        <div className="mb-4">
          <p>Welcome, {user.username}</p>
          <button
            onClick={() => signOut(auth)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}

      {/* Create Topic Form */}
      {user && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Topic Title"
            value={topicTitle}
            onChange={(e) => setTopicTitle(e.target.value)}
            className="border p-2 my-2 w-full"
          />
          <textarea
            placeholder="Topic Description"
            value={topicDescription}
            onChange={(e) => setTopicDescription(e.target.value)}
            className="border p-2 my-2 w-full"
          />
          <button onClick={handleCreateTopic} className="bg-green-500 text-white px-4 py-2 rounded">
            Create Topic
          </button>
        </div>
      )}

      {/* List of Topics */}
      <div>
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <div key={topic._id} className="border p-4 my-4">
              <h2 className="font-bold">{topic.title}</h2>
              <p>{topic.description}</p>

              {/* Comments Section */}
              <div>
                {topic.comments.map((comment, idx) => (
                  <div key={idx} className="p-2 border my-2">
                    <strong>{comment.user}: </strong>
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>

              {/* Add Comment */}
              {user && (
                <div className="my-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    className="border p-2 w-full"
                  />
                  <button
                    onClick={() => handleAddComment(topic._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Comment
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No topics found. Try another search!</p>
        )}
      </div>
    </div>
  );
};

export default Forum;
