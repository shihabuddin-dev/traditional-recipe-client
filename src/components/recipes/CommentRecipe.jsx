import React, { useState } from "react";
import Button from "../ui/Button";

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
    <div className="mb-10 bg-white rounded-2xl shadow-sm p-8 mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Recipe Reviews
      </h2>
      <div className="text-center text-gray-500 mb-8">
        {comments.length === 0 ? (
          <>No reviews yet. Be the first to review!</>
        ) : null}
      </div>
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Share Your Experience
        </h3>
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
            <span className="ml-2 text-gray-600 text-sm">Rate this</span>
          </div>
          <textarea
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
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
                className="flex flex-col bg-gray-50 rounded-xl p-4 shadow  h-full"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={comment.userPhoto || "/default-user.png"}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      {comment.userName}
                    </div>
                    <div className="text-xs text-gray-500">
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
                <div className="text-gray-700 mb-2 flex-1">{comment.text}</div>
                {isOwner && (
                  <Button
                    onClick={() => handleDelete(comment.id)}
                    variant="outline"
                    className="mt-2 w-fit text-xs px-3 py-1 text-red-500 border-red-200 hover:text-white hover:bg-red-500 hover:border-red-500"
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
