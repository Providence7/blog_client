import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const TopicManagement = () => {
  const [topics, setTopics] = useState([]);  // Store the list of topics
  const [loading, setLoading] = useState(true);

  // Fetch all topics from the backend
  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topics`);
      setTopics(response.data);
    } catch (error) {
      toast.error('Error fetching topics');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

   // Delete a specific topic
   const deleteTopic = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/topics/${id}`);
      if (response.status === 200) {
        toast.success('Topic deleted successfully');
        fetchTopics();  // Refresh the topic list after deletion
      }
    } catch (error) {
      toast.error('Failed to delete topic');
      console.error(error);
    }
  };

  // Fetch topics on mount
  useEffect(() => {
    fetchTopics();
  }, []);
  const deleteComment = async (topicId, userId, commentText) => {
    try {
      // Log the parameters being sent
      console.log('Sending request to delete comment with:', { topicId, userId, commentText });
  
      // Make sure commentText and userId are properly encoded
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/topics/${topicId}/comments/${encodeURIComponent(userId)}/${encodeURIComponent(commentText)}`
      );
  
      if (response.status === 200) {
        toast.success('Comment deleted successfully');
        fetchTopics();  // Refresh the topic list after deletion
      }
    } catch (error) {
      toast.error('Failed to delete comment');
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchTopics();  // Fetch topics on mount
  }, []);
  

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Topics</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Comments</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {topics.length > 0 ? (
                topics.map((topic) => (
                  <tr key={topic._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{topic.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {topic.comments.map((comment, index) => (
                        <div key={index}>
                          <span>{comment.username}: {comment.text}</span>
                          <button
                            className="bg-red-500 text-white ml-2 px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                            onClick={() => deleteComment(topic._id, comment.userId, comment.text)}
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => deleteTopic(topic._id)}  // This is for deleting a topic
                      >
                        Delete Topic
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    No topics available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TopicManagement;
