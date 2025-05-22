import React, { useState } from "react";
import Button from "../ui/Button";
import userLogo from "../../assets/user-logo.png";

const CommentRecipe = ({
  comments: initialComments,
  onAdd,
  onDelete,
  currentUser,
}) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(initialComments || []);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      userName: currentUser.displayName,
      userEmail: currentUser.email,
      userPhoto: currentUser.photoURL,
      text: commentText,
      rating,
      date: new Date().toISOString(),
    };
    const updated = [newComment, ...comments];
    setComments(updated);
    if (onAdd) onAdd(updated);
    setCommentText("");
    setRating(5);
  };

  const handleDelete = (id) => {
    const updated = comments.filter((c) => c.id !== id);
    setComments(updated);
    if (onDelete) onDelete(updated);
  };

  return (
    <div className="mb-10 bg-base-200 rounded-2xl shadow-sm p-8 mt-12 border border-base-400 border-dashed">
      <h2 className="text-3xl font-bold text-center mb-2">Recipe Reviews</h2>
      <div className="text-center mb-8">
        {comments.length === 0 ? (
          <>No reviews yet. Be the first to review!</>
        ) : null}
      </div>
      <div className="bg-base-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-3">Share Your Experience</h3>
        <form onSubmit={handleAddComment} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            {/* Star rating input */}
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl select-none ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setRating(star)
                  }
                >
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm">Rate this</span>
          </div>
          <textarea
            className="w-full border-2 border-base-content/20 px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition duration-200 bg-base-100 text-base-content"
            placeholder="What did you like or dislike? Share your thoughts..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            required
          />
          <Button type="submit" className="w-full">
            Submit Review
          </Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.length > 0 &&
          comments.map((comment) => {
            const isOwner =
              currentUser && comment.userEmail === currentUser.email;
            return (
              <div
                key={comment.id}
                className="flex flex-col bg-base-100 rounded-xl p-4 shadow  h-full border"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={comment.userPhoto || userLogo}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <div className="font-semibold">{comment.userName}</div>
                    <div className="text-xs">
                      {new Date(comment.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i < comment.rating
                          ? "text-yellow-400 text-lg"
                          : "text-gray-300 text-lg"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="mb-2 flex-1">{comment.text}</div>
                {isOwner && (
                  <Button
                    onClick={() => handleDelete(comment.id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentRecipe;
