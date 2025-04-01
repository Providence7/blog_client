import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../layout/console.js";

const initialTopics = [
  {
    id: 1,
    title: "How to Choose the Right Fabric for Tailoring?",
    description:
      "Fabric selection is crucial for high-quality tailoring. What do you consider when picking fabric for your designs?",
    comments: [
      {
        id: 1,
        user: "Jane Doe",
        text: "For me, fabric durability is key. I always test how it reacts to washing and stretching before using it for any major project.",
      },
      {
        id: 2,
        user: "John Smith",
        text: "Weight is also important! Some fabrics look amazing but are too stiff or too light, making them difficult to work with.",
      },
      {
        id: 3,
        user: "Emily Carter",
        text: "Color retention matters! I once bought a deep red fabric that faded to pink after two washes. Now, I always check for colorfastness.",
      },
      {
        id: 4,
        user: "Daniel West",
        text: "What about breathability? I love working with cotton because it’s comfortable, but silk and chiffon have their own charm too!",
      },
    ],
  },
  {
    id: 2,
    title: "Best Sewing Machines for Beginners",
    description: "Looking for a sewing machine recommendation? What’s the best model for beginners?",
    comments: [
      {
        id: 1,
        user: "Anna White",
        text: "The Brother CS6000i is my go-to. It’s beginner-friendly but has enough features to grow with you!",
      },
      {
        id: 2,
        user: "Michael Brown",
        text: "Singer machines are classics! I started with the Singer Heavy Duty 4423, and it handled thick fabrics like denim effortlessly.",
      },
      {
        id: 3,
        user: "Sophia Lin",
        text: "I recommend the Janome 2212. Simple, reliable, and doesn’t cost a fortune.",
      },
    ],
  },
  {
    id: 3,
    title: "How Do You Price Your Tailoring Services?",
    description: "Pricing is tricky. How do you determine the cost for tailoring your clothes? Any tips for beginners?",
    comments: [
      {
        id: 1,
        user: "Sarah Black",
        text: "I consider three things: material cost, time, and design complexity. Some clients don’t realize how much effort goes into detailed stitching!",
      },
      {
        id: 2,
        user: "Robert Green",
        text: "I start with a base price for different garment types, then add extra costs based on fabric type, embroidery, and custom fittings.",
      },
      {
        id: 3,
        user: "Olivia Martinez",
        text: "Transparency is key! I always break down my pricing so customers understand why custom-made clothes cost more than ready-to-wear ones.",
      },
      {
        id: 4,
        user: "David Kim",
        text: "Do you include taxes in your pricing, or do you add them separately? I always wonder what’s best for small businesses.",
      },
    ],
  },
  {
    id: 4,
    title: "Is Handmade Fashion Dying?",
    description: "With fast fashion taking over, is there still a strong market for handmade, tailored outfits?",
    comments: [
      {
        id: 1,
        user: "Eleanor Gray",
        text: "Handmade fashion is not dying—it’s evolving! There’s a niche market that values quality over quantity, especially for unique designs.",
      },
      {
        id: 2,
        user: "Noah Bennett",
        text: "I think social media has helped. Many small brands are thriving on Instagram and TikTok by showcasing their craftsmanship.",
      },
      {
        id: 3,
        user: "Grace Foster",
        text: "People are getting tired of fast fashion. More customers want sustainable, ethical choices, which is a big opportunity for handmade designers.",
      },
    ],
  },
];

const Forum = () => {
  const [user, setUser] = useState(null); 
  const [newComment, setNewComment] = useState(""); 
  const [topics, setTopics] = useState(initialTopics);
  const [searchKeyword, setSearchKeyword] = useState(""); 
  const navigate = useNavigate(); 

  // Google login method
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
      toast.success(`Welcome ${data.user.username}`);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
    }
  };

  // Handle comment submission
  const handleAddComment = (topicId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      return;
    }

    const newCommentData = {
      id: Date.now(),
      user: user.username,
      text: newComment,
    };

    // Find the topic and add the new comment
    const updatedTopics = topics.map((topic) =>
      topic.id === topicId
        ? { ...topic, comments: [...topic.comments, newCommentData] }
        : topic
    );

    setTopics(updatedTopics);
    setNewComment(""); 
  };

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container mx-0 mt-9">
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl">SyberFashion Forum</h1>
        <p className="italic text-xs text-blue-950 font-bold">
          "Be respectful, helpful, considerate, relevant, and collaborative in discussions."
        </p>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for topics..."
          className="p-2 border border-gray-700 text-sm w-full md:w-1/2"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {filteredTopics.map((topic) => (
        <div key={topic.id} className="mb-4 border-b">
          <h2 className="text-xl font-semibold text-center text-[#c4458f]">{topic.title}</h2>
          <p className="italic text-xs text-center text-blue-950 mt-2 font-bold">{topic.description}</p>

          <div className="my-5">
            <h3 className="text-lg font-medium text-center mb-6 underline italic text-gray-950">
              Comments
            </h3>
            {topic.comments.map((comment) => (
              <div key={comment.id} className="p-1 border-t text-center py-3 text-sm text-gray-700">
                <p><strong className="text-[#46249c]">{comment.user}:</strong> {comment.text}</p>
              </div>
            ))}
          </div>

          {user && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Add a comment"
                className="p-2 border border-gray-300 text-sm w-full"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button onClick={() => handleAddComment(topic.id)} className="mt-2 p-2 bg-blue-500 text-white rounded text-sm">
                Add Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forum;
