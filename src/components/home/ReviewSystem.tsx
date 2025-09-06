

















// import type React from "react";
// import { useState, useEffect } from "react";
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
// import { useAuthStore } from "@/context/userContext";
// import { Review, ReviewComment } from "@/lib/schemas/feedback/feedback";
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView
// } from "@/api/productApi";

// interface ReviewSystemProps {
//   productId: number;
//   onReviewAdded?: () => void;
// }

// interface NewReviewData {
//   rating: number;
//   comment: string;
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null; // null = no like/dislike, true = like, false = dislike
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAddingReview, setIsAddingReview] = useState(false);
//   const { user } = useAuthStore();
//   const [showAddReview, setShowAddReview] = useState(false);
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   });
  
//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
//   const [reviewComments, setReviewComments] = useState<{[reviewId: number]: ReviewComment[]}>({});
//   const [newComment, setNewComment] = useState<{[reviewId: number]: string}>({});
  
//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({});
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set());

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id);
//     } else {
//       TrackProductView(productId);
//     }
//   }, [productId, user?.id]);

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return;
    
//     const statuses: ReviewLikeStatus = {};
    
//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id);
//         statuses[review.id] = status;
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error);
//         statuses[review.id] = null;
//       }
//     }
    
//     setReviewLikeStatuses(statuses);
//   };

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const data = await GetReviews(productId);
//       setReviews(data);
//       await loadReviewLikeStatuses(data);
//       setError(null);
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err);
//       setError(err.message || "Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment");
//       return;
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review");
//       return;
//     }

//     try {
//       setIsAddingReview(true);
//       setError(null);

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id
//       };

//       const newReviewResponse = await AddReview(productId, reviewData);
//       setReviews((prev) => [newReviewResponse, ...prev]);

//       setNewReview({ rating: 5, comment: "" });
//       setShowAddReview(false);
//       onReviewAdded?.();

//     } catch (err: any) {
//       console.error("Error adding review:", err);
//       setError(err.message || "Failed to add review. Please try again.");
//     } finally {
//       setIsAddingReview(false);
//     }
//   };

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews");
//       return;
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return;

//     try {
//       setLikingReviews(prev => new Set(prev).add(reviewId));
      
//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId];
      
//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike;
      
//       await ToggleReviewLike(reviewId, user.id, isLike);
      
//       // Update local state
//       setReviewLikeStatuses(prev => ({
//         ...prev,
//         [reviewId]: newStatus
//       }));
      
//       // Refresh reviews to get updated counts
//       await fetchReviews();
//     } catch (err: any) {
//       console.error("Error toggling like:", err);
//       setError(err.message || "Failed to update like status");
//     } finally {
//       setLikingReviews(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(reviewId);
//         return newSet;
//       });
//     }
//   };

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId);
//       setReviewComments(prev => ({ ...prev, [reviewId]: comments }));
//     } catch (err) {
//       console.error("Error loading comments:", err);
//     }
//   };

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId);
    
//     if (isExpanded) {
//       setExpandedComments(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(reviewId);
//         return newSet;
//       });
//     } else {
//       setExpandedComments(prev => new Set(prev).add(reviewId));
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId);
//       }
//     }
//   };

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim();
//     if (!comment || !user?.id) return;

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment
//       });

//       setReviewComments(prev => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])]
//       }));

//       setNewComment(prev => ({ ...prev, [reviewId]: "" }));
//       await fetchReviews(); // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err);
//       setError(err.message || "Failed to add comment");
//     }
//   };

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return;
    
//     try {
//       await DeleteReview(reviewId, user.id);
//       setReviews(prev => prev.filter(review => review.id !== reviewId));
//     } catch (err: any) {
//       console.error("Error deleting review:", err);
//       setError(err.message || "Failed to delete review");
//     }
//   };

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>
//       );
//     }
//     return stars;
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

//   // Get user display name with improved logic
//   const getUserDisplayName = (review: Review) => {
//     // Try different user fields that might be available
//     if (review.users?.username) {
//       return review.users.username;
//     }
//     if (review.users?.name) {
//       return review.users.name;
//     }
//     if (review.users?.email) {
//       return review.users.email.split('@')[0];
//     }
//     if (review.user_name) {
//       return review.user_name;
//     }
//     return `User ${review.user_id}`;
//   };

//   // Get comment user display name
//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (comment.users?.username) {
//       return comment.users.username;
//     }
//     if (comment.users?.name) {
//       return comment.users.name;
//     }
//     if (comment.users?.email) {
//       return comment.users.email.split('@')[0];
//     }
//     return `User ${comment.user_id}`;
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           {error}
//         </div>
//       )}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id];
//             const isLiking = likingReviews.has(review.id);
            
//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-gray-600" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800">
//                         {getUserDisplayName(review)}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     {/* Like/Dislike buttons */}
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-colors ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                             ? "text-green-600"
//                             : "text-gray-500 hover:text-green-600"
//                         }`}
//                       >
//                         <ThumbsUp 
//                           size={16} 
//                           className={userLikeStatus === true ? "fill-current" : ""} 
//                         />
//                         <span>{review.likes_count || 0}</span>
//                       </button>
//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-colors ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                             ? "text-red-600"
//                             : "text-gray-500 hover:text-red-600"
//                         }`}
//                       >
//                         <ThumbsDown 
//                           size={16} 
//                           className={userLikeStatus === false ? "fill-current" : ""} 
//                         />
//                         <span>{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     {/* Comments toggle */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} comments</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {/* Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-3 pt-3 border-t border-gray-100">
//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-3">
//                         <input
//                           type="text"
//                           value={newComment[review.id] || ""}
//                           onChange={(e) => setNewComment(prev => ({ ...prev, [review.id]: e.target.value }))}
//                           placeholder="Add a comment..."
//                           className="flex-1 text-sm p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           onKeyPress={(e) => e.key === 'Enter' && handleAddComment(review.id)}
//                         />
//                         <button
//                           onClick={() => handleAddComment(review.id)}
//                           disabled={!newComment[review.id]?.trim()}
//                           className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
//                         >
//                           Post
//                         </button>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-2">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-2 text-sm">
//                           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-gray-500" />
//                           </div>
//                           <div className="flex-1">
//                             <span className="font-medium text-gray-700">
//                               {getCommentUserDisplayName(comment)}
//                             </span>
//                             <span className="text-gray-600 ml-2">{comment.comment}</span>
//                             <div className="text-xs text-gray-400 mt-1">
//                               {formatDate(comment.created_at)}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false);
//                   setError(null);
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) =>
//                     setNewReview((prev) => ({ ...prev, rating: star }))
//                   )}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false);
//                     setError(null);
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewSystem;












// import type React from "react";
// import { useState, useEffect } from "react";
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
// import { useAuthStore } from "@/context/userContext";
// import { Review, ReviewComment } from "@/lib/schemas/feedback/feedback";
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView
// } from "@/api/productApi";

// interface ReviewSystemProps {
//   productId: number;
//   onReviewAdded?: () => void;
// }

// interface NewReviewData {
//   rating: number;
//   comment: string;
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null; // null = no like/dislike, true = like, false = dislike
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isAddingReview, setIsAddingReview] = useState(false);
//   const { user } = useAuthStore();
//   const [showAddReview, setShowAddReview] = useState(false);
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   });
  
//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
//   const [reviewComments, setReviewComments] = useState<{[reviewId: number]: ReviewComment[]}>({});
//   const [newComment, setNewComment] = useState<{[reviewId: number]: string}>({});
  
//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({});
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set());

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id);
//     } else {
//       TrackProductView(productId);
//     }
//   }, [productId, user?.id]);

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return;
    
//     const statuses: ReviewLikeStatus = {};
    
//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id);
//         statuses[review.id] = status;
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error);
//         statuses[review.id] = null;
//       }
//     }
    
//     setReviewLikeStatuses(statuses);
//   };

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const data = await GetReviews(productId);
//       setReviews(data);
//       await loadReviewLikeStatuses(data);
//       setError(null);
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err);
//       setError(err.message || "Failed to load reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment");
//       return;
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review");
//       return;
//     }

//     try {
//       setIsAddingReview(true);
//       setError(null);

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id
//       };

//       const newReviewResponse = await AddReview(productId, reviewData);
//       setReviews((prev) => [newReviewResponse, ...prev]);

//       setNewReview({ rating: 5, comment: "" });
//       setShowAddReview(false);
//       onReviewAdded?.();

//     } catch (err: any) {
//       console.error("Error adding review:", err);
//       setError(err.message || "Failed to add review. Please try again.");
//     } finally {
//       setIsAddingReview(false);
//     }
//   };

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews");
//       return;
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return;

//     try {
//       setLikingReviews(prev => new Set(prev).add(reviewId));
      
//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId];
      
//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike;
      
//       await ToggleReviewLike(reviewId, user.id, isLike);
      
//       // Update local state
//       setReviewLikeStatuses(prev => ({
//         ...prev,
//         [reviewId]: newStatus
//       }));
      
//       // Refresh reviews to get updated counts
//       await fetchReviews();
//     } catch (err: any) {
//       console.error("Error toggling like:", err);
//       setError(err.message || "Failed to update like status");
//     } finally {
//       setLikingReviews(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(reviewId);
//         return newSet;
//       });
//     }
//   };

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId);
//       setReviewComments(prev => ({ ...prev, [reviewId]: comments }));
//     } catch (err) {
//       console.error("Error loading comments:", err);
//     }
//   };

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId);
    
//     if (isExpanded) {
//       setExpandedComments(prev => {
//         const newSet = new Set(prev);
//         newSet.delete(reviewId);
//         return newSet;
//       });
//     } else {
//       setExpandedComments(prev => new Set(prev).add(reviewId));
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId);
//       }
//     }
//   };

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim();
//     if (!comment || !user?.id) return;

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment
//       });

//       setReviewComments(prev => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])]
//       }));

//       setNewComment(prev => ({ ...prev, [reviewId]: "" }));
//       await fetchReviews(); // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err);
//       setError(err.message || "Failed to add comment");
//     }
//   };

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return;
    
//     try {
//       await DeleteReview(reviewId, user.id);
//       setReviews(prev => prev.filter(review => review.id !== reviewId));
//     } catch (err: any) {
//       console.error("Error deleting review:", err);
//       setError(err.message || "Failed to delete review");
//     }
//   };

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>
//       );
//     }
//     return stars;
//   };

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

//   // Get user display name with improved logic
//   const getUserDisplayName = (review: Review) => {
//     // Try different user fields that might be available
//     if (review.users?.username) {
//       return review.users.username;
//     }
//     if (review.users?.name) {
//       return review.users.name;
//     }
//     if (review.users?.email) {
//       return review.users.email.split('@')[0];
//     }
//     if (review.user_name) {
//       return review.user_name;
//     }
//     return `User ${review.user_id}`;
//   };

//   // Get comment user display name
//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (comment.users?.username) {
//       return comment.users.username;
//     }
//     if (comment.users?.name) {
//       return comment.users.name;
//     }
//     if (comment.users?.email) {
//       return comment.users.email.split('@')[0];
//     }
//     return `User ${comment.user_id}`;
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [productId]);

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//           {error}
//         </div>
//       )}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id];
//             const isLiking = likingReviews.has(review.id);
            
//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-gray-600" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800">
//                         {getUserDisplayName(review)}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     {/* Like/Dislike buttons */}
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-all duration-200 ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                             ? "text-green-600 bg-green-50 px-2 py-1 rounded-full"
//                             : "text-gray-500 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded-full"
//                         }`}
//                         title={!user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"}
//                       >
//                         <ThumbsUp 
//                           size={16} 
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`} 
//                         />
//                         <span className="font-medium">{review.likes_count || 0}</span>
//                       </button>
                      
//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-all duration-200 ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                             ? "text-red-600 bg-red-50 px-2 py-1 rounded-full"
//                             : "text-gray-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-full"
//                         }`}
//                         title={!user ? "Login to dislike reviews" : userLikeStatus === false ? "Remove dislike" : "Dislike this review"}
//                       >
//                         <ThumbsDown 
//                           size={16} 
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`} 
//                         />
//                         <span className="font-medium">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     {/* Comments toggle */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} comments</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {/* Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-3 pt-3 border-t border-gray-100">
//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-3">
//                         <input
//                           type="text"
//                           value={newComment[review.id] || ""}
//                           onChange={(e) => setNewComment(prev => ({ ...prev, [review.id]: e.target.value }))}
//                           placeholder="Add a comment..."
//                           className="flex-1 text-sm p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           onKeyPress={(e) => e.key === 'Enter' && handleAddComment(review.id)}
//                         />
//                         <button
//                           onClick={() => handleAddComment(review.id)}
//                           disabled={!newComment[review.id]?.trim()}
//                           className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
//                         >
//                           Post
//                         </button>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-2">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-2 text-sm">
//                           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-gray-500" />
//                           </div>
//                           <div className="flex-1">
//                             <span className="font-medium text-gray-700">
//                               {getCommentUserDisplayName(comment)}
//                             </span>
//                             <span className="text-gray-600 ml-2">{comment.comment}</span>
//                             <div className="text-xs text-gray-400 mt-1">
//                               {formatDate(comment.created_at)}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false);
//                   setError(null);
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) =>
//                     setNewReview((prev) => ({ ...prev, rating: star }))
//                   )}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
//                   {error}
//                 </div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false);
//                     setError(null);
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewSystem;













// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null // null = no like/dislike, true = like, false = dislike
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment")
//       return
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review")
//       return
//     }

//     try {
//       setIsAddingReview(true)
//       setError(null)

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//       }

//       const newReviewResponse = await AddReview(productId, reviewData)
//       setReviews((prev) => [newReviewResponse, ...prev])

//       setNewReview({ rating: 5, comment: "" })
//       setShowAddReview(false)
//       onReviewAdded?.()
//     } catch (err: any) {
//       console.error("Error adding review:", err)
//       setError(err.message || "Failed to add review. Please try again.")
//     } finally {
//       setIsAddingReview(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId]

//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       // Update local state
//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       // Refresh reviews to get updated counts
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews() // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   // Get user display name with improved logic
//   const getUserDisplayName = (review: Review) => {
//     // Try different user fields that might be available
//     if (review.users?.username) {
//       return review.users.username
//     }
//     if (review.users?.name) {
//       return review.users.name
//     }
//     if (review.users?.email) {
//       return review.users.email.split("@")[0]
//     }
//     if (review.user_name) {
//       return review.user_name
//     }
//     return `User ${review.user_id}`
//   }

//   // Get comment user display name
//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (comment.users?.username) {
//       return comment.users.username
//     }
//     if (comment.users?.name) {
//       return comment.users.name
//     }
//     if (comment.users?.email) {
//       return comment.users.email.split("@")[0]
//     }
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)

//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-gray-600" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800">{getUserDisplayName(review)}</span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     {/* Like/Dislike buttons */}
//                     <div className="flex items-center gap-3">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-all duration-200 ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                               ? "text-green-600 bg-green-50 px-2 py-1 rounded-full"
//                               : "text-gray-500 hover:text-green-600 hover:bg-green-50 px-2 py-1 rounded-full"
//                         }`}
//                         title={
//                           !user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"
//                         }
//                       >
//                         <ThumbsUp
//                           size={16}
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-medium">{review.likes_count || 0}</span>
//                       </button>

//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-1 text-sm transition-all duration-200 ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                               ? "text-red-600 bg-red-50 px-2 py-1 rounded-full"
//                               : "text-gray-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-full"
//                         }`}
//                         title={
//                           !user
//                             ? "Login to dislike reviews"
//                             : userLikeStatus === false
//                               ? "Remove dislike"
//                               : "Dislike this review"
//                         }
//                       >
//                         <ThumbsDown
//                           size={16}
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-medium">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     {/* Comments toggle */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} comments</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {/* Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-3 pt-3 border-t border-gray-100">
//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-3">
//                         <input
//                           type="text"
//                           value={newComment[review.id] || ""}
//                           onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                           placeholder="Add a comment..."
//                           className="flex-1 text-sm p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                         />
//                         <button
//                           onClick={() => handleAddComment(review.id)}
//                           disabled={!newComment[review.id]?.trim()}
//                           className="px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300"
//                         >
//                           Post
//                         </button>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-2">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-2 text-sm">
//                           <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-gray-500" />
//                           </div>
//                           <div className="flex-1">
//                             <span className="font-medium text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                             <span className="text-gray-600 ml-2">{comment.comment}</span>
//                             <div className="text-xs text-gray-400 mt-1">{formatDate(comment.created_at)}</div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false)
//                   setError(null)
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem
























// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null // null = no like/dislike, true = like, false = dislike
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment")
//       return
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review")
//       return
//     }

//     try {
//       setIsAddingReview(true)
//       setError(null)

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//       }

//       const newReviewResponse = await AddReview(productId, reviewData)
//       setReviews((prev) => [newReviewResponse, ...prev])

//       setNewReview({ rating: 5, comment: "" })
//       setShowAddReview(false)
//       onReviewAdded?.()
//     } catch (err: any) {
//       console.error("Error adding review:", err)
//       setError(err.message || "Failed to add review. Please try again.")
//     } finally {
//       setIsAddingReview(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId]

//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       // Update local state
//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       // Refresh reviews to get updated counts
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews() // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   const getUserDisplayName = (review: Review) => {
//     // If this is the current user's review, show their info
//     if (user && review.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || `You`
//     }

//     // Try different user fields that might be available
//     if (review.users?.username) {
//       return review.users.username
//     }
//     if (review.users?.name) {
//       return review.users.name
//     }
//     if (review.users?.email) {
//       return review.users.email.split("@")[0]
//     }
//     if (review.user_name) {
//       return review.user_name
//     }
//     return `User ${review.user_id}`
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     // If this is the current user's comment, show their info
//     if (user && comment.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || `You`
//     }

//     if (comment.users?.username) {
//       return comment.users.username
//     }
//     if (comment.users?.name) {
//       return comment.users.name
//     }
//     if (comment.users?.email) {
//       return comment.users.email.split("@")[0]
//     }
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)

//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800 flex items-center gap-2">
//                         {getUserDisplayName(review)}
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>
//                         )}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3 bg-gray-50 p-3 rounded-lg">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                               ? "text-white bg-green-500 shadow-md"
//                               : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//                         }`}
//                         title={
//                           !user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"
//                         }
//                       >
//                         <ThumbsUp
//                           size={16}
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.likes_count || 0}</span>
//                       </button>

//                       <div className="w-px h-6 bg-gray-300"></div>

//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                               ? "text-white bg-red-500 shadow-md"
//                               : "text-gray-600 hover:text-red-600 hover:bg-red-50"
//                         }`}
//                         title={
//                           !user
//                             ? "Login to dislike reviews"
//                             : userLikeStatus === false
//                               ? "Remove dislike"
//                               : "Dislike this review"
//                         }
//                       >
//                         <ThumbsDown
//                           size={16}
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-full font-medium"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {expandedComments.has(review.id) && (
//                   <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-3">
//                     <h6 className="font-semibold text-gray-800 mb-3 text-sm">Replies to this review:</h6>

//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-4 bg-white p-3 rounded-lg border">
//                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User size={14} className="text-white" />
//                         </div>
//                         <div className="flex-1 flex gap-2">
//                           <input
//                             type="text"
//                             value={newComment[review.id] || ""}
//                             onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                             placeholder="Reply to this review..."
//                             className="flex-1 text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                           />
//                           <button
//                             onClick={() => handleAddComment(review.id)}
//                             disabled={!newComment[review.id]?.trim()}
//                             className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-medium"
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-3">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-3 text-sm bg-white p-3 rounded-lg border">
//                           <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                               {user && comment.user_id === user.id && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                               )}
//                               <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                             </div>
//                             <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                         <p className="text-sm text-gray-500 text-center py-4 italic">
//                           No replies yet. Be the first to reply to this review!
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false)
//                   setError(null)
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {user && (
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                     <User size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       Reviewing as: {user.name || user.username || user.email?.split("@")[0] || "You"}
//                     </p>
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem






// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null // null = no like/dislike, true = like, false = dislike
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment")
//       return
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review")
//       return
//     }

//     try {
//       setIsAddingReview(true)
//       setError(null)

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//       }

//       const newReviewResponse = await AddReview(productId, reviewData)
//       setReviews((prev) => [newReviewResponse, ...prev])

//       setNewReview({ rating: 5, comment: "" })
//       setShowAddReview(false)
//       onReviewAdded?.()
//     } catch (err: any) {
//       console.error("Error adding review:", err)
//       setError(err.message || "Failed to add review. Please try again.")
//     } finally {
//       setIsAddingReview(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId]

//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       // Update local state
//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       // Refresh reviews to get updated counts
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews() // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   const getUserDisplayName = (review: Review) => {
//     // If this is the current user's review, show their info
//     if (user && review.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || `You`
//     }

//     // Try different user fields that might be available
//     if (review.users?.username) {
//       return review.users.username
//     }
//     if (review.users?.name) {
//       return review.users.name
//     }
//     if (review.users?.email) {
//       return review.users.email.split("@")[0]
//     }
//     if (review.user_name) {
//       return review.user_name
//     }
//     return `User ${review.user_id}`
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     // If this is the current user's comment, show their info
//     if (user && comment.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || `You`
//     }

//     if (comment.users?.username) {
//       return comment.users.username
//     }
//     if (comment.users?.name) {
//       return comment.users.name
//     }
//     if (comment.users?.email) {
//       return comment.users.email.split("@")[0]
//     }
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)

//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800 flex items-center gap-2">
//                         {getUserDisplayName(review)}
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>
//                         )}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3 bg-gray-50 p-3 rounded-lg">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                               ? "text-white bg-green-500 shadow-md"
//                               : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//                         }`}
//                         title={
//                           !user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"
//                         }
//                       >
//                         <ThumbsUp
//                           size={16}
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.likes_count || 0}</span>
//                       </button>

//                       <div className="w-px h-6 bg-gray-300"></div>

//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                               ? "text-white bg-red-500 shadow-md"
//                               : "text-gray-600 hover:text-red-600 hover:bg-red-50"
//                         }`}
//                         title={
//                           !user
//                             ? "Login to dislike reviews"
//                             : userLikeStatus === false
//                               ? "Remove dislike"
//                               : "Dislike this review"
//                         }
//                       >
//                         <ThumbsDown
//                           size={16}
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-full font-medium"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {expandedComments.has(review.id) && (
//                   <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-3">
//                     <h6 className="font-semibold text-gray-800 mb-3 text-sm">Replies to this review:</h6>

//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-4 bg-white p-3 rounded-lg border">
//                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User size={14} className="text-white" />
//                         </div>
//                         <div className="flex-1 flex gap-2">
//                           <input
//                             type="text"
//                             value={newComment[review.id] || ""}
//                             onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                             placeholder="Reply to this review..."
//                             className="flex-1 text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                           />
//                           <button
//                             onClick={() => handleAddComment(review.id)}
//                             disabled={!newComment[review.id]?.trim()}
//                             className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-medium"
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-3">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-3 text-sm bg-white p-3 rounded-lg border">
//                           <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                               {user && comment.user_id === user.id && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                               )}
//                               <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                             </div>
//                             <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                         <p className="text-sm text-gray-500 text-center py-4 italic">
//                           No replies yet. Be the first to reply to this review!
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false)
//                   setError(null)
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {user && (
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                     <User size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       Reviewing as: {user.name || user.username || user.email?.split("@")[0] || "You"}
//                     </p>
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem










// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment")
//       return
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review")
//       return
//     }

//     try {
//       setIsAddingReview(true)
//       setError(null)

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//       }

//       const newReviewResponse = await AddReview(productId, reviewData)
//       setReviews((prev) => [newReviewResponse, ...prev])

//       setNewReview({ rating: 5, comment: "" })
//       setShowAddReview(false)
//       onReviewAdded?.()
//     } catch (err: any) {
//       console.error("Error adding review:", err)
//       setError(err.message || "Failed to add review. Please try again.")
//     } finally {
//       setIsAddingReview(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId]

//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       // Update local state
//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       // Refresh reviews to get updated counts
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews() // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   // Fixed function to get user display name
//   const getUserDisplayName = (review: Review) => {
//     // If this is the current user's review, show their info from auth store
//     if (user && review.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try to get username from review data (check all possible fields)
//     const reviewUser = review.user || review.users || (review as any).user_data;
    
//     if (reviewUser) {
//       return reviewUser.name || reviewUser.username || reviewUser.email?.split("@")[0] || `User ${review.user_id}`;
//     }
    
//     // Check for direct username fields
//     if (review.user_name) {
//       return review.user_name;
//     }
    
//     if (review.username) {
//       return review.username;
//     }
    
//     // Check if the review itself has name properties
//     if ((review as any).name) {
//       return (review as any).name;
//     }
    
//     // Fallback to user ID if no name is available
//     return `User ${review.user_id}`;
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     // If this is the current user's comment, show their info
//     if (user && comment.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try different user fields that might be available
//     if (comment.user) {
//       return comment.user.name || comment.user.username || comment.user.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     if (comment.users) {
//       return comment.users.name || comment.users.username || comment.users.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     // Check for direct user_name field
//     if (comment.user_name) {
//       return comment.user_name
//     }
    
//     // Check for user data in different possible formats
//     if ((comment as any).user_data) {
//       const userData = (comment as any).user_data
//       return userData.name || userData.username || userData.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     // Fallback to user ID if no name is available
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)
//             const displayName = getUserDisplayName(review)

//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800 flex items-center gap-2">
//                         {displayName}
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>
//                         )}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3 bg-gray-50 p-3 rounded-lg">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                               ? "text-white bg-green-500 shadow-md"
//                               : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//                         }`}
//                         title={
//                           !user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"
//                         }
//                       >
//                         <ThumbsUp
//                           size={16}
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.likes_count || 0}</span>
//                       </button>

//                       <div className="w-px h-6 bg-gray-300"></div>

//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                               ? "text-white bg-red-500 shadow-md"
//                               : "text-gray-600 hover:text-red-600 hover:bg-red-50"
//                         }`}
//                         title={
//                           !user
//                             ? "Login to dislike reviews"
//                             : userLikeStatus === false
//                               ? "Remove dislike"
//                               : "Dislike this review"
//                         }
//                       >
//                         <ThumbsDown
//                           size={16}
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-full font-medium"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {expandedComments.has(review.id) && (
//                   <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-3">
//                     <h6 className="font-semibold text-gray-800 mb-3 text-sm">Replies to this review:</h6>

//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-4 bg-white p-3 rounded-lg border">
//                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User size={14} className="text-white" />
//                         </div>
//                         <div className="flex-1 flex gap-2">
//                           <input
//                             type="text"
//                             value={newComment[review.id] || ""}
//                             onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                             placeholder="Reply to this review..."
//                             className="flex-1 text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                           />
//                           <button
//                             onClick={() => handleAddComment(review.id)}
//                             disabled={!newComment[review.id]?.trim()}
//                             className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-medium"
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-3">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-3 text-sm bg-white p-3 rounded-lg border">
//                           <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                               {user && comment.user_id === user.id && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                               )}
//                               <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                             </div>
//                             <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                         <p className="text-sm text-gray-500 text-center py-4 italic">
//                           No replies yet. Be the first to reply to this review!
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false)
//                   setError(null)
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {user && (
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                     <User size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       Reviewing as: {user.name || user.username || user.email?.split("@")[0] || "You"}
//                     </p>
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem








// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   // const handleSubmitReview = async () => {
//   //   if (!newReview.comment.trim()) {
//   //     setError("Please write a comment")
//   //     return
//   //   }

//   //   if (!user?.id) {
//   //     setError("You must be logged in to submit a review")
//   //     return
//   //   }

//   //   try {
//   //     setIsAddingReview(true)
//   //     setError(null)

//   //     const reviewData = {
//   //       rating: newReview.rating,
//   //       comment: newReview.comment.trim(),
//   //       user_id: user.id,
//   //       // Add username to ensure it's stored with the review
//   //       user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//   //     }

//   //     const newReviewResponse = await AddReview(productId, reviewData)
//   //     setReviews((prev) => [newReviewResponse, ...prev])

//   //     setNewReview({ rating: 5, comment: "" })
//   //     setShowAddReview(false)
//   //     onReviewAdded?.()
//   //   } catch (err: any) {
//   //     console.error("Error adding review:", err)
//   //     setError(err.message || "Failed to add review. Please try again.")
//   //   } finally {
//   //     setIsAddingReview(false)
//   //   }
//   // }





// const handleSubmitReview = async () => {
//   if (!newReview.comment.trim()) {
//     setError("Please write a comment")
//     return
//   }

//   if (!user?.id) {
//     setError("You must be logged in to submit a review")
//     return
//   }

//   try {
//     setIsAddingReview(true)
//     setError(null)

//     const reviewData = {
//       rating: newReview.rating,
//       comment: newReview.comment.trim(),
//       user_id: user.id,
//       user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`, // ✅ Include user_name
//     }

//     const newReviewResponse = await AddReview(productId, reviewData) // ✅ This now includes user_name
//     setReviews((prev) => [newReviewResponse, ...prev])

//     setNewReview({ rating: 5, comment: "" })
//     setShowAddReview(false)
//     onReviewAdded?.()
//   } catch (err: any) {
//     console.error("Error adding review:", err)
//     setError(err.message || "Failed to add review. Please try again.")
//   } finally {
//     setIsAddingReview(false)
//   }
// }



//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     // Prevent multiple simultaneous requests
//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       // Check current status
//       const currentStatus = reviewLikeStatuses[reviewId]

//       // If clicking the same button that's already active, remove the like/dislike
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       // Update local state
//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       // Refresh reviews to get updated counts
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//         // Add username to comment data
//         user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews() // Refresh to update comment count
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   // Debug function to check review structure
//   useEffect(() => {
//     if (reviews.length > 0) {
//       console.log("Review structure:", reviews[0]);
//     }
//   }, [reviews]);

//   // Fixed function to get user display name
//   const getUserDisplayName = (review: Review) => {
//     // If this is the current user's review, show their info
//     if (user && review.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try different user fields that might be available
//     // First check if user data is nested in the review
//     if (review.user) {
//       return review.user.name || review.user.username || review.user.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     if (review.users) {
//       return review.users.name || review.users.username || review.users.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     // Check for direct user_name field (most likely)
//     if (review.user_name) {
//       return review.user_name
//     }
    
//     // Check for username field
//     if (review.username) {
//       return review.username
//     }
    
//     // Check if the review itself has name properties
//     if ((review as any).name) {
//       return (review as any).name
//     }
    
//     // Check for user data in different possible formats
//     if ((review as any).user_data) {
//       const userData = (review as any).user_data
//       return userData.name || userData.username || userData.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     // Fallback to user ID if no name is available
//     return `User ${review.user_id}`
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     // If this is the current user's comment, show their info
//     if (user && comment.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try different user fields that might be available
//     if (comment.user) {
//       return comment.user.name || comment.user.username || comment.user.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     if (comment.users) {
//       return comment.users.name || comment.users.username || comment.users.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     // Check for direct user_name field
//     if (comment.user_name) {
//       return comment.user_name
//     }
    
//     if (comment.username) {
//       return comment.username
//     }
    
//     // Check for user data in different possible formats
//     if ((comment as any).user_data) {
//       const userData = (comment as any).user_data
//       return userData.name || userData.username || userData.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     // Fallback to user ID if no name is available
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="space-y-4">
//       {/* Reviews Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <h5 className="font-montserratBold text-gray-800">Customer Reviews</h5>
//           {reviews.length > 0 && (
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <span className="text-sm text-gray-600">
//                 ({averageRating.toFixed(1)}/5 • {reviews.length} review{reviews.length !== 1 ? "s" : ""})
//               </span>
//             </div>
//           )}
//         </div>
//         {user ? (
//           <button
//             onClick={() => setShowAddReview(true)}
//             className="px-4 py-2 bg-blue-500 text-white text-sm font-montserratBold rounded-lg hover:bg-blue-600 transition-colors"
//           >
//             Add Review
//           </button>
//         ) : (
//           <p className="text-sm text-gray-500">Login to add a review</p>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

//       {/* Reviews List */}
//       <div className="space-y-4 max-h-96 overflow-y-auto">
//         {loading ? (
//           <div className="text-center py-4 text-gray-500">Loading reviews...</div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-4 text-gray-500">No reviews yet. Be the first!</div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)
//             const displayName = getUserDisplayName(review)

//             return (
//               <div key={review.id} className="border border-gray-100 rounded-lg p-4 bg-white shadow-sm">
//                 {/* Review Header */}
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={20} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-montserratBold text-sm text-gray-800 flex items-center gap-2">
//                         {displayName}
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>
//                         )}
//                       </span>
//                       <div className="flex items-center gap-2">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Review Content */}
//                 <p className="text-sm text-gray-600 leading-relaxed mb-3 bg-gray-50 p-3 rounded-lg">{review.comment}</p>

//                 {/* Review Actions */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1">
//                       <button
//                         onClick={() => handleToggleLike(review.id, true)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === true
//                               ? "text-white bg-green-500 shadow-md"
//                               : "text-gray-600 hover:text-green-600 hover:bg-green-50"
//                         }`}
//                         title={
//                           !user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"
//                         }
//                       >
//                         <ThumbsUp
//                           size={16}
//                           className={`${userLikeStatus === true ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.likes_count || 0}</span>
//                       </button>

//                       <div className="w-px h-6 bg-gray-300"></div>

//                       <button
//                         onClick={() => handleToggleLike(review.id, false)}
//                         disabled={!user || isLiking}
//                         className={`flex items-center gap-2 text-sm transition-all duration-200 px-3 py-2 rounded-full font-medium ${
//                           !user || isLiking
//                             ? "text-gray-400 cursor-not-allowed"
//                             : userLikeStatus === false
//                               ? "text-white bg-red-500 shadow-md"
//                               : "text-gray-600 hover:text-red-600 hover:bg-red-50"
//                         }`}
//                         title={
//                           !user
//                             ? "Login to dislike reviews"
//                             : userLikeStatus === false
//                               ? "Remove dislike"
//                               : "Dislike this review"
//                         }
//                       >
//                         <ThumbsDown
//                           size={16}
//                           className={`${userLikeStatus === false ? "fill-current" : ""} transition-all duration-200`}
//                         />
//                         <span className="font-bold">{review.dislikes_count || 0}</span>
//                       </button>
//                     </div>

//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-full font-medium"
//                     >
//                       <MessageCircle size={16} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>

//                   {/* Delete button for own review */}
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-xs text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>

//                 {expandedComments.has(review.id) && (
//                   <div className="mt-4 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-3">
//                     <h6 className="font-semibold text-gray-800 mb-3 text-sm">Replies to this review:</h6>

//                     {/* Add comment form */}
//                     {user && (
//                       <div className="flex gap-2 mb-4 bg-white p-3 rounded-lg border">
//                         <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
//                           <User size={14} className="text-white" />
//                         </div>
//                         <div className="flex-1 flex gap-2">
//                           <input
//                             type="text"
//                             value={newComment[review.id] || ""}
//                             onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                             placeholder="Reply to this review..."
//                             className="flex-1 text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                           />
//                           <button
//                             onClick={() => handleAddComment(review.id)}
//                             disabled={!newComment[review.id]?.trim()}
//                             className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-medium"
//                           >
//                             Reply
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {/* Comments list */}
//                     <div className="space-y-3">
//                       {reviewComments[review.id]?.map((comment) => (
//                         <div key={comment.id} className="flex gap-3 text-sm bg-white p-3 rounded-lg border">
//                           <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={12} className="text-white" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                               {user && comment.user_id === user.id && (
//                                 <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                               )}
//                               <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                             </div>
//                             <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                           </div>
//                         </div>
//                       ))}
//                       {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                         <p className="text-sm text-gray-500 text-center py-4 italic">
//                           No replies yet. Be the first to reply to this review!
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-montserratBold text-gray-800">Add Your Review</h3>
//               <button
//                 onClick={() => {
//                   setShowAddReview(false)
//                   setError(null)
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               {user && (
//                 <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                     <User size={20} className="text-white" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800">
//                       Reviewing as: {user.name || user.username || user.email?.split("@")[0] || "You"}
//                     </p>
//                     <p className="text-sm text-gray-600">{user.email}</p>
//                   </div>
//                 </div>
//               )}

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Rating</label>
//                 <div className="flex items-center gap-2">
//                   {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                   <span className="text-sm text-gray-600 ml-2">({newReview.rating}/5)</span>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-montserratBold text-gray-800 mb-2">Your Review</label>
//                 <textarea
//                   value={newReview.comment}
//                   onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                   placeholder="Share your experience..."
//                   className="w-full p-3 border border-gray-200 rounded-lg resize-none h-24 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               {error && (
//                 <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
//               )}

//               <div className="flex gap-3 pt-4">
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-montserratBold hover:bg-gray-50 transition-colors"
//                   disabled={isAddingReview}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitReview}
//                   disabled={!newReview.comment.trim() || isAddingReview || !user}
//                   className={`flex-1 py-3 px-6 rounded-lg font-montserratBold transition-colors ${
//                     !newReview.comment.trim() || isAddingReview || !user
//                       ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {isAddingReview ? "Submitting..." : "Submit Review"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem
















// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle, Eye } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, user.id)
//     } else {
//       TrackProductView(productId)
//     }
//   }, [productId, user?.id])

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment")
//       return
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review")
//       return
//     }

//     try {
//       setIsAddingReview(true)
//       setError(null)

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//         user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//       }

//       const newReviewResponse = await AddReview(productId, reviewData)
//       setReviews((prev) => [newReviewResponse, ...prev])

//       setNewReview({ rating: 5, comment: "" })
//       setShowAddReview(false)
//       onReviewAdded?.()
//     } catch (err: any) {
//       console.error("Error adding review:", err)
//       setError(err.message || "Failed to add review. Please try again.")
//     } finally {
//       setIsAddingReview(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       const currentStatus = reviewLikeStatuses[reviewId]
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//         user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   // Get user display name functions
//   const getUserDisplayName = (review: Review) => {
//     if (user && review.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     if (review.user) {
//       return review.user.name || review.user.username || review.user.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     if (review.users) {
//       return review.users.name || review.users.username || review.users.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     if (review.user_name) {
//       return review.user_name
//     }
    
//     if (review.username) {
//       return review.username
//     }
    
//     if ((review as any).name) {
//       return (review as any).name
//     }
    
//     if ((review as any).user_data) {
//       const userData = (review as any).user_data
//       return userData.name || userData.username || userData.email?.split("@")[0] || `User ${review.user_id}`
//     }
    
//     return `User ${review.user_id}`
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (user && comment.user_id === user.id) {
//       return user.name || user.username || user.email?.split("@")[0] || "You"
//     }

//     if (comment.user) {
//       return comment.user.name || comment.user.username || comment.user.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     if (comment.users) {
//       return comment.users.name || comment.users.username || comment.users.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     if (comment.user_name) {
//       return comment.user_name
//     }
    
//     if (comment.username) {
//       return comment.username
//     }
    
//     if ((comment as any).user_data) {
//       const userData = (comment as any).user_data
//       return userData.name || userData.username || userData.email?.split("@")[0] || `User ${comment.user_id}`
//     }
    
//     return `User ${comment.user_id}`
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
//       {/* Enhanced Reviews Header */}
//       <div className="border-b border-gray-200 pb-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-4">
//             <h5 className="text-2xl font-montserratBold text-gray-800">Customer Reviews</h5>
//             <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
//               <Eye size={16} className="text-blue-600" />
//               <span className="text-sm text-blue-600 font-semibold">{reviews.length} reviews</span>
//             </div>
//           </div>
//           {user ? (
//             <button
//               onClick={() => setShowAddReview(true)}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-montserratBold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               Write a Review
//             </button>
//           ) : (
//             <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">Login to add a review</p>
//           )}
//         </div>
        
//         {reviews.length > 0 && (
//           <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
//                 <div className="text-sm text-gray-600">out of 5</div>
//               </div>
//             </div>
//             <div className="h-12 w-px bg-gray-300"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
//               <div className="text-sm text-gray-600">review{reviews.length !== 1 ? "s" : ""}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//           <div className="flex items-center">
//             <X size={20} className="text-red-600 mr-2" />
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Enhanced Reviews List */}
//       <div className="space-y-6">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-500">Loading reviews...</p>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Star size={48} className="text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
//             <p className="text-gray-500">Be the first to share your experience!</p>
//           </div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)
//             const displayName = getUserDisplayName(review)

//             return (
//               <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//                 {/* Enhanced Review Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
//                       <User size={24} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-montserratBold text-lg text-gray-800">{displayName}</span>
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">Your Review</span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-sm text-gray-500">•</span>
//                         <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                       title="Delete your review"
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Enhanced Review Content */}
//                 <div className="mb-4">
//                   <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
//                     <p className="text-gray-700 leading-relaxed text-base">{review.comment}</p>
//                   </div>
//                 </div>

//                 {/* Enhanced Review Actions */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center gap-1">
//                     {/* Like Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, true)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === true
//                             ? "text-white bg-green-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-green-100 hover:text-green-600"
//                       }`}
//                       title={!user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"}
//                     >
//                       <ThumbsUp size={18} className={`${userLikeStatus === true ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.likes_count || 0}</span>
//                     </button>

//                     {/* Dislike Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, false)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === false
//                             ? "text-white bg-red-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600"
//                       }`}
//                       title={!user ? "Login to dislike reviews" : userLikeStatus === false ? "Remove dislike" : "Dislike this review"}
//                     >
//                       <ThumbsDown size={18} className={`${userLikeStatus === false ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.dislikes_count || 0}</span>
//                     </button>

//                     {/* Comments Button */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
//                     >
//                       <MessageCircle size={18} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Enhanced Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <h6 className="font-montserratBold text-gray-800 mb-4 flex items-center gap-2">
//                         <MessageCircle size={18} />
//                         Replies ({review.comments_count || 0})
//                       </h6>

//                       {/* Add comment form */}
//                       {user && (
//                         <div className="flex gap-3 mb-6 bg-white p-4 rounded-lg border shadow-sm">
//                           <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={16} className="text-white" />
//                           </div>
//                           <div className="flex-1 flex gap-3">
//                             <input
//                               type="text"
//                               value={newComment[review.id] || ""}
//                               onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                               placeholder="Write a reply..."
//                               className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                             />
//                             <button
//                               onClick={() => handleAddComment(review.id)}
//                               disabled={!newComment[review.id]?.trim()}
//                               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-semibold"
//                             >
//                               Reply
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Comments list */}
//                       <div className="space-y-4">
//                         {reviewComments[review.id]?.map((comment) => (
//                           <div key={comment.id} className="flex gap-3 bg-white p-4 rounded-lg border shadow-sm">
//                             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                               <User size={14} className="text-white" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                                 {user && comment.user_id === user.id && (
//                                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                                 )}
//                                 <span className="text-xs text-gray-400">•</span>
//                                 <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                               </div>
//                               <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                             </div>
//                           </div>
//                         ))}
//                         {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                           <div className="text-center py-8">
//                             <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
//                             <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Enhanced Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-montserratBold text-gray-800">Share Your Experience</h3>
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {user && (
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={24} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-800">
//                         {user.name || user.username || user.email?.split("@")[0] || "You"}
//                       </p>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Rate this product</label>
//                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                     {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                     <span className="text-lg font-semibold text-gray-600 ml-3">({newReview.rating}/5)</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Write your review</label>
//                   <textarea
//                     value={newReview.comment}
//                     onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                     placeholder="Tell others about your experience with this product..."
//                     className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {error && (
//                   <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//                     <p className="text-red-700 font-medium">{error}</p>
//                   </div>
//                 )}

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     onClick={() => {
//                       setShowAddReview(false)
//                       setError(null)
//                     }}
//                     className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-montserratBold hover:bg-gray-50 transition-colors"
//                     disabled={isAddingReview}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmitReview}
//                     disabled={!newReview.comment.trim() || isAddingReview || !user}
//                     className={`flex-1 py-4 px-6 rounded-xl font-montserratBold transition-all duration-300 ${
//                       !newReview.comment.trim() || isAddingReview || !user
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
//                     }`}
//                   >
//                     {isAddingReview ? "Publishing..." : "Publish Review"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem










// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, User, ThumbsUp, ThumbsDown, MessageCircle, Eye } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [isAddingReview, setIsAddingReview] = useState(false)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   // useEffect(() => {
//   //   if (user?.id) {
//   //     TrackProductView(productId, user.id)
//   //   } else {
//   //     TrackProductView(productId)
//   //   }
//   // }, [productId, user?.id])



// // Updated ReviewSystem component with corrected field names

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, {
//         user_id: user.id,
//         username: user.username || user.email?.split("@")[0] || "Anonymous"
//       })
//     } else {
//       TrackProductView(productId, { username: "Anonymous" })
//     }
//   }, [productId, user?.id])

//   // // Add review - UPDATED
//   // const handleSubmitReview = async () => {
//   //   if (!newReview.comment.trim()) {
//   //     setError("Please write a comment")
//   //     return
//   //   }

//   //   if (!user?.id) {
//   //     setError("You must be logged in to submit a review")
//   //     return
//   //   }

//   //   try {
//   //     setIsAddingReview(true)
//   //     setError(null)

//   //     const reviewData = {
//   //       rating: newReview.rating,
//   //       comment: newReview.comment.trim(),
//   //       user_id: user.id,
//   //       // ✅ FIXED: Use 'username' instead of 'user_name' to match backend schema
//   //       username: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//   //     }

//   //     const newReviewResponse = await AddReview(productId, reviewData)
//   //     setReviews((prev) => [newReviewResponse, ...prev])

//   //     setNewReview({ rating: 5, comment: "" })
//   //     setShowAddReview(false)
//   //     onReviewAdded?.()
//   //   } catch (err: any) {
//   //     console.error("Error adding review:", err)
//   //     setError(err.message || "Failed to add review. Please try again.")
//   //   } finally {
//   //     setIsAddingReview(false)
//   //   }
//   // }

//   // ✅ Keep this one
// const handleSubmitReview = async () => {
//   if (!newReview.comment.trim()) {
//     setError("Please write a comment");
//     return;
//   }

//   if (!user?.id) {
//     setError("You must be logged in to submit a review");
//     return;
//   }

//   try {
//     setIsAddingReview(true);
//     setError(null);

//     const reviewData = {
//       rating: newReview.rating,
//       comment: newReview.comment.trim(),
//       user_id: user.id,
//       username: users.username || users.email?.split("@")[0] || `User ${user.id}`,
//     };

//     const newReviewResponse = await AddReview(productId, reviewData);
//     setReviews((prev) => [newReviewResponse, ...prev]);

//     setNewReview({ rating: 5, comment: "" });
//     setShowAddReview(false);
//     onReviewAdded?.();
//   } catch (err: any) {
//     console.error("Error adding review:", err);
//     setError(err.message || "Failed to add review. Please try again.");
//   } finally {
//     setIsAddingReview(false);
//   }
// };


//   // Add comment to review - UPDATED
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//         // ✅ FIXED: Use 'username' instead of 'user_name' to match backend schema
//         username: users.username || users.email?.split("@")[0] || `User ${user.id}`,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // ✅ UPDATED: Get user display name functions - improved logic to handle username field
//   const getUserDisplayName = (review: Review) => {
//     if (users && review.user_id === user.id) {
//       return users.username || users.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       review.username ||           // ✅ NEW: Check username field first (from backend)
//       review.users?.username ||
//       review.users?.email?.split("@")[0] ||
//       (review as any).user_name || // fallback for old data
//       (review as any).name ||
//       (review as any).user_data?.username ||
//       (review as any).user_data?.name ||
//       (review as any).user_data?.email?.split("@")[0] ||
//       `User ${review.user_id}` ||
//       "Anonymous"
//     )
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (user && comment.user_id === user.id) {
//       return user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       comment.username ||           // ✅ NEW: Check username field first (from backend)
//       comment.users?.username ||
//       comment.user?.email?.split("@")[0] ||
//       (comment as any).username || // fallback for old data
//       (comment as any).user_data?.username ||
//       (comment as any).user_data?.email?.split("@")[0] ||
//       `User ${comment.user_id}` ||
//       "Anonymous"
//     )
//   }



//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Add review
//   // const handleSubmitReview = async () => {
//   //   if (!newReview.comment.trim()) {
//   //     setError("Please write a comment")
//   //     return
//   //   }

//   //   if (!user?.id) {
//   //     setError("You must be logged in to submit a review")
//   //     return
//   //   }

//   //   try {
//   //     setIsAddingReview(true)
//   //     setError(null)

//   //     const reviewData = {
//   //       rating: newReview.rating,
//   //       comment: newReview.comment.trim(),
//   //       user_id: user.id,
//   //       // FIXED: Use the correct user field from your auth store
//   //       user_name: user.username || user.name || user.email?.split("@")[0] || `User ${user.id}`,
//   //     }

//   //     const newReviewResponse = await AddReview(productId, reviewData)
//   //     setReviews((prev) => [newReviewResponse, ...prev])

//   //     setNewReview({ rating: 5, comment: "" })
//   //     setShowAddReview(false)
//   //     onReviewAdded?.()
//   //   } catch (err: any) {
//   //     console.error("Error adding review:", err)
//   //     setError(err.message || "Failed to add review. Please try again.")
//   //   } finally {
//   //     setIsAddingReview(false)
//   //   }
//   // }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       const currentStatus = reviewLikeStatuses[reviewId]
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }



//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
//     const stars = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   // FIXED: Get user display name functions - improved logic to handle all cases
//   const getUserDisplayName = (review: Review) => {
//     if (user && review.user_id === user.id) {
//       return user.username || user.name || user.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       review.user_name ||
//       review.username ||
//       (review as any).name ||
//       review.user?.username ||
//       review.user?.name ||
//       review.user?.email?.split("@")[0] ||
//       review.users?.username ||
//       review.users?.name ||
//       review.users?.email?.split("@")[0] ||
//       (review as any).user_data?.username ||
//       (review as any).user_data?.name ||
//       (review as any).user_data?.email?.split("@")[0] ||
//       `User ${review.user_id}`
//     )
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (user && comment.user_id === user.id) {
//       return user.username || user.name || user.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       comment.user_name ||
//       comment.username ||
//       (comment as any).name ||
//       comment.user?.username ||
//       comment.user?.name ||
//       comment.user?.email?.split("@")[0] ||
//       comment.users?.username ||
//       comment.users?.name ||
//       comment.users?.email?.split("@")[0] ||
//       (comment as any).user_data?.username ||
//       (comment as any).user_data?.name ||
//       (comment as any).user_data?.email?.split("@")[0] ||
//       `User ${comment.user_id}`
//     )
//   }

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
//       {/* Enhanced Reviews Header */}
//       <div className="border-b border-gray-200 pb-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-4">
//             <h5 className="text-2xl font-montserratBold text-gray-800">Customer Reviews</h5>
//             <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
//               <Eye size={16} className="text-blue-600" />
//               <span className="text-sm text-blue-600 font-semibold">{reviews.length} reviews</span>
//             </div>
//           </div>
//           {user ? (
//             <button
//               onClick={() => setShowAddReview(true)}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-montserratBold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               Write a Review
//             </button>
//           ) : (
//             <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">Login to add a review</p>
//           )}
//         </div>
        
//         {reviews.length > 0 && (
//           <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
//                 <div className="text-sm text-gray-600">out of 5</div>
//               </div>
//             </div>
//             <div className="h-12 w-px bg-gray-300"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
//               <div className="text-sm text-gray-600">review{reviews.length !== 1 ? "s" : ""}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//           <div className="flex items-center">
//             <X size={20} className="text-red-600 mr-2" />
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Enhanced Reviews List */}
//       <div className="space-y-6">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-500">Loading reviews...</p>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Star size={48} className="text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
//             <p className="text-gray-500">Be the first to share your experience!</p>
//           </div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)
//             const displayName = getUserDisplayName(review)

//             return (
//               <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//                 {/* Enhanced Review Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
//                       <User size={24} className="text-white" />
//                     </div>
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-montserratBold text-lg text-gray-800">{displayName}</span>
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">Your Review</span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-sm text-gray-500">•</span>
//                         <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                       title="Delete your review"
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Enhanced Review Content */}
//                 <div className="mb-4">
//                   <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
//                     <p className="text-gray-700 leading-relaxed text-base">{review.comment}</p>
//                   </div>
//                 </div>

//                 {/* Enhanced Review Actions */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center gap-1">
//                     {/* Like Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, true)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === true
//                             ? "text-white bg-green-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-green-100 hover:text-green-600"
//                       }`}
//                       title={!user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"}
//                     >
//                       <ThumbsUp size={18} className={`${userLikeStatus === true ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.likes_count || 0}</span>
//                     </button>

//                     {/* Dislike Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, false)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === false
//                             ? "text-white bg-red-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600"
//                       }`}
//                       title={!user ? "Login to dislike reviews" : userLikeStatus === false ? "Remove dislike" : "Dislike this review"}
//                     >
//                       <ThumbsDown size={18} className={`${userLikeStatus === false ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.dislikes_count || 0}</span>
//                     </button>

//                     {/* Comments Button */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
//                     >
//                       <MessageCircle size={18} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Enhanced Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <h6 className="font-montserratBold text-gray-800 mb-4 flex items-center gap-2">
//                         <MessageCircle size={18} />
//                         Replies ({review.comments_count || 0})
//                       </h6>

//                       {/* Add comment form */}
//                       {user && (
//                         <div className="flex gap-3 mb-6 bg-white p-4 rounded-lg border shadow-sm">
//                           <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <User size={16} className="text-white" />
//                           </div>
//                           <div className="flex-1 flex gap-3">
//                             <input
//                               type="text"
//                               value={newComment[review.id] || ""}
//                               onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                               placeholder="Write a reply..."
//                               className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                             />
//                             <button
//                               onClick={() => handleAddComment(review.id)}
//                               disabled={!newComment[review.id]?.trim()}
//                               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-semibold"
//                             >
//                               Reply
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Comments list */}
//                       <div className="space-y-4">
//                         {reviewComments[review.id]?.map((comment) => (
//                           <div key={comment.id} className="flex gap-3 bg-white p-4 rounded-lg border shadow-sm">
//                             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                               <User size={14} className="text-white" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                                 {user && comment.user_id === user.id && (
//                                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                                 )}
//                                 <span className="text-xs text-gray-400">•</span>
//                                 <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                               </div>
//                               <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                             </div>
//                           </div>
//                         ))}
//                         {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                           <div className="text-center py-8">
//                             <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
//                             <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Enhanced Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-montserratBold text-gray-800">Share Your Experience</h3>
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {user && (
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <User size={24} className="text-white" />
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-800">
//                         {user.username || user.name || user.email?.split("@")[0] || "You"}
//                       </p>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Rate this product</label>
//                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                     {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                     <span className="text-lg font-semibold text-gray-600 ml-3">({newReview.rating}/5)</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Write your review</label>
//                   <textarea
//                     value={newReview.comment}
//                     onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                     placeholder="Tell others about your experience with this product..."
//                     className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {error && (
//                   <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//                     <p className="text-red-700 font-medium">{error}</p>
//                   </div>
//                 )}

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     onClick={() => {
//                       setShowAddReview(false)
//                       setError(null)
//                     }}
//                     className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-montserratBold hover:bg-gray-50 transition-colors"
//                     disabled={isAddingReview}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmitReview}
//                     disabled={!newReview.comment.trim() || isAddingReview || !user}
//                     className={`flex-1 py-4 px-6 rounded-xl font-montserratBold transition-all duration-300 ${
//                       !newReview.comment.trim() || isAddingReview || !user
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
//                     }`}
//                   >
//                     {isAddingReview ? "Publishing..." : "Publish Review"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem





















// import type React from "react"
// import { useState, useEffect } from "react"
// import { Star, X, ThumbsUp, ThumbsDown, MessageCircle, Eye } from "lucide-react"
// import { useAuthStore } from "@/context/userContext"
// import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback"
// import {
//   GetReviews,
//   AddReview,
//   DeleteReview,
//   ToggleReviewLike,
//   GetReviewLikeStatus,
//   AddReviewComment,
//   GetReviewComments,
//   TrackProductView,
// } from "@/api/productApi"

// interface ReviewSystemProps {
//   productId: number
//   onReviewAdded?: () => void
// }

// interface NewReviewData {
//   rating: number
//   comment: string
// }

// interface ReviewLikeStatus {
//   [reviewId: number]: boolean | null
// }

// export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
//   const [reviews, setReviews] = useState<Review[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const { user } = useAuthStore()
//   const [showAddReview, setShowAddReview] = useState(false)
//   const [newReview, setNewReview] = useState<NewReviewData>({
//     rating: 5,
//     comment: "",
//   })

//   // Comments state
//   const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
//   const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({})
//   const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({})

//   // Like/dislike state
//   const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({})
//   const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set())

//   // Track product view when component mounts
//   useEffect(() => {
//     if (user?.id) {
//       TrackProductView(productId, {
//         user_id: user.id,
//         username: user.username || user.email?.split("@")[0] || "Anonymous"
//       })
//     } else {
//       TrackProductView(productId, { username: "Anonymous" })
//     }
//   }, [productId, user?.id])

//   // Add review
//   const handleSubmitReview = async () => {
//     if (!newReview.comment.trim()) {
//       setError("Please write a comment");
//       return;
//     }

//     if (!user?.id) {
//       setError("You must be logged in to submit a review");
//       return;
//     }

//     try {
//       setError(null);

//       const reviewData = {
//         rating: newReview.rating,
//         comment: newReview.comment.trim(),
//         user_id: user.id,
//         username: user.username || user.email?.split("@")[0] || `User ${user.id}`,
//       };

//       const newReviewResponse = await AddReview(productId, reviewData);
//       setReviews((prev) => [newReviewResponse, ...prev]);

//       setNewReview({ rating: 5, comment: "" });
//       setShowAddReview(false);
//       onReviewAdded?.();
//     } catch (err: any) {
//       console.error("Error adding review:", err);
//       setError(err.message || "Failed to add review. Please try again.");
//     }
//   };

//   // Add comment to review
//   const handleAddComment = async (reviewId: number) => {
//     const comment = newComment[reviewId]?.trim()
//     if (!comment || !user?.id) return

//     try {
//       const newCommentData = await AddReviewComment(reviewId, {
//         user_id: user.id,
//         comment,
//         username: user.username || user.email?.split("@")[0] || `User ${user.id}`,
//       })

//       setReviewComments((prev) => ({
//         ...prev,
//         [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
//       }))

//       setNewComment((prev) => ({ ...prev, [reviewId]: "" }))
//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error adding comment:", err)
//       setError(err.message || "Failed to add comment")
//     }
//   }

//   // Get user display name functions
//   const getUserDisplayName = (review: Review) => {
//     if (user && review.user_id === user.id) {
//       return user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       review.username ||
//       review.users?.username ||
//       review.users?.email?.split("@")[0] ||
//       `User ${review.user_id}` ||
//       "Anonymous"
//     )
//   }

//   const getCommentUserDisplayName = (comment: ReviewComment) => {
//     if (user && comment.user_id === user.id) {
//       return user.username || user.email?.split("@")[0] || "You"
//     }

//     // Try multiple possible user name fields in order of preference
//     return (
//       comment.username ||
//       comment.users?.username ||
//       `User ${comment.user_id}` ||
//       "Anonymous"
//     )
//   }

//   // Load like statuses for all reviews
//   const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
//     if (!user?.id) return

//     const statuses: ReviewLikeStatus = {}

//     for (const review of reviewsData) {
//       try {
//         const status = await GetReviewLikeStatus(review.id, user.id)
//         statuses[review.id] = status
//       } catch (error) {
//         console.error(`Error loading like status for review ${review.id}:`, error)
//         statuses[review.id] = null
//       }
//     }

//     setReviewLikeStatuses(statuses)
//   }

//   // Fetch reviews
//   const fetchReviews = async () => {
//     try {
//       setLoading(true)
//       const data = await GetReviews(productId)
//       setReviews(data)
//       await loadReviewLikeStatuses(data)
//       setError(null)
//     } catch (err: any) {
//       console.error("Error fetching reviews:", err)
//       setError(err.message || "Failed to load reviews")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Toggle review like/dislike
//   const handleToggleLike = async (reviewId: number, isLike: boolean) => {
//     if (!user?.id) {
//       setError("You must be logged in to like reviews")
//       return
//     }

//     if (likingReviews.has(reviewId)) return

//     try {
//       setLikingReviews((prev) => new Set(prev).add(reviewId))

//       const currentStatus = reviewLikeStatuses[reviewId]
//       const newStatus = currentStatus === isLike ? null : isLike

//       await ToggleReviewLike(reviewId, user.id, isLike)

//       setReviewLikeStatuses((prev) => ({
//         ...prev,
//         [reviewId]: newStatus,
//       }))

//       await fetchReviews()
//     } catch (err: any) {
//       console.error("Error toggling like:", err)
//       setError(err.message || "Failed to update like status")
//     } finally {
//       setLikingReviews((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     }
//   }

//   // Load comments for a review
//   const loadReviewComments = async (reviewId: number) => {
//     try {
//       const comments = await GetReviewComments(reviewId)
//       setReviewComments((prev) => ({ ...prev, [reviewId]: comments }))
//     } catch (err) {
//       console.error("Error loading comments:", err)
//     }
//   }

//   // Toggle comments visibility
//   const toggleComments = async (reviewId: number) => {
//     const isExpanded = expandedComments.has(reviewId)

//     if (isExpanded) {
//       setExpandedComments((prev) => {
//         const newSet = new Set(prev)
//         newSet.delete(reviewId)
//         return newSet
//       })
//     } else {
//       setExpandedComments((prev) => new Set(prev).add(reviewId))
//       if (!reviewComments[reviewId]) {
//         await loadReviewComments(reviewId)
//       }
//     }
//   }

//   // Delete review
//   const handleDeleteReview = async (reviewId: number) => {
//     if (!user?.id) return

//     try {
//       await DeleteReview(reviewId, user.id)
//       setReviews((prev) => prev.filter((review) => review.id !== reviewId))
//     } catch (err: any) {
//       console.error("Error deleting review:", err)
//       setError(err.message || "Failed to delete review")
//     }
//   }

//   // Render star rating
//   const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void): JSX.Element[] => {
//     const stars: JSX.Element[] = []
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <button
//           key={i}
//           type="button"
//           onClick={() => interactive && onStarClick?.(i)}
//           className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
//           disabled={!interactive}
//         >
//           <Star
//             size={interactive ? 24 : 16}
//             className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         </button>,
//       )
//     }
//     return stars
//   }

//   // Format date
//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Calculate average rating
//   const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

//   useEffect(() => {
//     fetchReviews()
//   }, [productId])

//   return (
//     <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
//       {/* Enhanced Reviews Header */}
//       <div className="border-b border-gray-200 pb-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center gap-4">
//             <h5 className="text-2xl font-montserratBold text-gray-800">Customer Reviews</h5>
//             <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
//               <Eye size={16} className="text-blue-600" />
//               <span className="text-sm text-blue-600 font-semibold">{reviews.length} reviews</span>
//             </div>
//           </div>
//           {user ? (
//             <button
//               onClick={() => setShowAddReview(true)}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-montserratBold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
//             >
//               Write a Review
//             </button>
//           ) : (
//             <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">Login to add a review</p>
//           )}
//         </div>
        
//         {reviews.length > 0 && (
//           <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
//                 <div className="text-sm text-gray-600">out of 5</div>
//               </div>
//             </div>
//             <div className="h-12 w-px bg-gray-300"></div>
//             <div className="text-center">
//               <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
//               <div className="text-sm text-gray-600">review{reviews.length !== 1 ? "s" : ""}</div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//           <div className="flex items-center">
//             <X size={20} className="text-red-600 mr-2" />
//             <p className="text-red-700 font-medium">{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Enhanced Reviews List */}
//       <div className="space-y-6">
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-gray-500">Loading reviews...</p>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Star size={48} className="text-gray-300 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
//             <p className="text-gray-500">Be the first to share your experience!</p>
//           </div>
//         ) : (
//           reviews.map((review) => {
//             const userLikeStatus = reviewLikeStatuses[review.id]
//             const isLiking = likingReviews.has(review.id)
//             const displayName = getUserDisplayName(review)

//             return (
//               <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
//                 {/* Enhanced Review Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
//                       <span className="text-white font-bold text-lg">{displayName.charAt(0).toUpperCase()}</span>
//                     </div>
//                     <div className="flex flex-col">
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="font-montserratBold text-lg text-gray-800">{displayName}</span>
//                         {user && review.user_id === user.id && (
//                           <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">Your Review</span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-3">
//                         <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
//                         <span className="text-sm text-gray-500">•</span>
//                         <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
//                       </div>
//                     </div>
//                   </div>
//                   {user?.id === review.user_id && (
//                     <button
//                       onClick={() => handleDeleteReview(review.id)}
//                       className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
//                       title="Delete your review"
//                     >
//                       <X size={16} />
//                     </button>
//                   )}
//                 </div>

//                 {/* Enhanced Review Content */}
//                 <div className="mb-4">
//                   <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
//                     <p className="text-gray-700 leading-relaxed text-base">{review.comment}</p>
//                   </div>
//                 </div>

//                 {/* Enhanced Review Actions */}
//                 <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                   <div className="flex items-center gap-1">
//                     {/* Like Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, true)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === true
//                             ? "text-white bg-green-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-green-100 hover:text-green-600"
//                       }`}
//                       title={!user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"}
//                     >
//                       <ThumbsUp size={18} className={`${userLikeStatus === true ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.likes_count || 0}</span>
//                     </button>

//                     {/* Dislike Button */}
//                     <button
//                       onClick={() => handleToggleLike(review.id, false)}
//                       disabled={!user || isLiking}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
//                         !user || isLiking
//                           ? "text-gray-400 cursor-not-allowed bg-gray-100"
//                           : userLikeStatus === false
//                             ? "text-white bg-red-500 shadow-lg transform scale-105"
//                             : "text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600"
//                       }`}
//                       title={!user ? "Login to dislike reviews" : userLikeStatus === false ? "Remove dislike" : "Dislike this review"}
//                     >
//                       <ThumbsDown size={18} className={`${userLikeStatus === false ? "fill-current" : ""}`} />
//                       <span className="font-bold">{review.dislikes_count || 0}</span>
//                     </button>

//                     {/* Comments Button */}
//                     <button
//                       onClick={() => toggleComments(review.id)}
//                       className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
//                     >
//                       <MessageCircle size={18} />
//                       <span>{review.comments_count || 0} replies</span>
//                     </button>
//                   </div>
//                 </div>

//                 {/* Enhanced Comments Section */}
//                 {expandedComments.has(review.id) && (
//                   <div className="mt-6 pt-6 border-t border-gray-200">
//                     <div className="bg-gray-50 rounded-xl p-4">
//                       <h6 className="font-montserratBold text-gray-800 mb-4 flex items-center gap-2">
//                         <MessageCircle size={18} />
//                         Replies ({review.comments_count || 0})
//                       </h6>

//                       {/* Add comment form */}
//                       {user && (
//                         <div className="flex gap-3 mb-6 bg-white p-4 rounded-lg border shadow-sm">
//                           <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
//                             <span className="text-white font-bold">{(user.username || user.email || "U").charAt(0).toUpperCase()}</span>
//                           </div>
//                           <div className="flex-1 flex gap-3">
//                             <input
//                               type="text"
//                               value={newComment[review.id] || ""}
//                               onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
//                               placeholder="Write a reply..."
//                               className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                               onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
//                             />
//                             <button
//                               onClick={() => handleAddComment(review.id)}
//                               disabled={!newComment[review.id]?.trim()}
//                               className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-semibold"
//                             >
//                               Reply
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {/* Comments list */}
//                       <div className="space-y-4">
//                         {reviewComments[review.id]?.map((comment) => (
//                           <div key={comment.id} className="flex gap-3 bg-white p-4 rounded-lg border shadow-sm">
//                             <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                               <span className="text-white text-sm font-bold">{getCommentUserDisplayName(comment).charAt(0).toUpperCase()}</span>
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-center gap-2 mb-2">
//                                 <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
//                                 {user && comment.user_id === user.id && (
//                                   <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
//                                 )}
//                                 <span className="text-xs text-gray-400">•</span>
//                                 <span className="text-xs text-gray-400">{formatDate(comment.created_at)}</span>
//                               </div>
//                               <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
//                             </div>
//                           </div>
//                         ))}
//                         {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
//                           <div className="text-center py-8">
//                             <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
//                             <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })
//         )}
//       </div>

//       {/* Enhanced Add Review Dialog */}
//       {showAddReview && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
//           <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-2xl font-montserratBold text-gray-800">Share Your Experience</h3>
//                 <button
//                   onClick={() => {
//                     setShowAddReview(false)
//                     setError(null)
//                   }}
//                   className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//                 >
//                   <X size={24} />
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 {user && (
//                   <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
//                     <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                       <span className="text-white font-bold text-lg">
//                         {(user.username || user.email || "U").charAt(0).toUpperCase()}
//                       </span>
//                     </div>
//                     <div>
//                       <p className="font-semibold text-gray-800">
//                         {user.username || user.email?.split("@")[0] || "You"}
//                       </p>
//                       <p className="text-sm text-gray-600">{user.email}</p>
//                     </div>
//                   </div>
//                 )}

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Rate this product</label>
//                   <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
//                     {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
//                     <span className="text-lg font-semibold text-gray-600 ml-3">({newReview.rating}/5)</span>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-lg font-montserratBold text-gray-800 mb-3">Write your review</label>
//                   <textarea
//                     value={newReview.comment}
//                     onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
//                     placeholder="Tell others about your experience with this product..."
//                     className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {error && (
//                   <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
//                     <p className="text-red-700 font-medium">{error}</p>
//                   </div>
//                 )}

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     onClick={() => {
//                       setShowAddReview(false)
//                       setError(null)
//                     }}
//                     className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-montserratBold hover:bg-gray-50 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={handleSubmitReview}
//                     disabled={!newReview.comment.trim() || !user}
//                     className={`flex-1 py-4 px-6 rounded-xl font-montserratBold transition-all duration-300 ${
//                       !newReview.comment.trim() || !user
//                         ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                         : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
//                     }`}
//                   >
//                     Publish Review
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ReviewSystem












import React from "react";
import { useState, useEffect } from "react";
import { Star, X, ThumbsUp, ThumbsDown, MessageCircle, Eye } from "lucide-react";
import { useAuthStore } from "@/context/userContext";
import type { Review, ReviewComment } from "@/lib/schemas/feedback/feedback";
import {
  GetReviews,
  AddReview,
  DeleteReview,
  ToggleReviewLike,
  GetReviewLikeStatus,
  AddReviewComment,
  GetReviewComments,
  TrackProductView,
} from "@/api/productApi";

interface ReviewSystemProps {
  productId: number;
  onReviewAdded?: () => void;
}

interface NewReviewData {
  rating: number;
  comment: string;
}

interface ReviewLikeStatus {
  [reviewId: number]: boolean | null;
}

export const ReviewSystem: React.FC<ReviewSystemProps> = ({ productId, onReviewAdded }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState<NewReviewData>({
    rating: 5,
    comment: "",
  });

  // Comments state
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [reviewComments, setReviewComments] = useState<{ [reviewId: number]: ReviewComment[] }>({});
  const [newComment, setNewComment] = useState<{ [reviewId: number]: string }>({});

  // Like/dislike state
  const [reviewLikeStatuses, setReviewLikeStatuses] = useState<ReviewLikeStatus>({});
  const [likingReviews, setLikingReviews] = useState<Set<number>>(new Set());

  // Track product view when component mounts
  useEffect(() => {
    if (user?.id) {
      TrackProductView(productId, {
        user_id: user.id,
        username: user.username || user.email?.split("@")[0] || "Anonymous"
      });
    } else {
      TrackProductView(productId, { username: "Anonymous" });
    }
  }, [productId, user?.id]);

  // Add review
  const handleSubmitReview = async () => {
    if (!newReview.comment.trim()) {
      setError("Please write a comment");
      return;
    }

    if (!user?.id) {
      setError("You must be logged in to submit a review");
      return;
    }

    try {
      setError(null);

      const reviewData = {
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        user_id: user.id,
        username: user.username || user.email?.split("@")[0] || `User ${user.id}`,
      };

      const newReviewResponse = await AddReview(productId, reviewData);
      setReviews((prev) => [newReviewResponse, ...prev]);

      setNewReview({ rating: 5, comment: "" });
      setShowAddReview(false);
      onReviewAdded?.();
    } catch (err: any) {
      console.error("Error adding review:", err);
      setError(err.message || "Failed to add review. Please try again.");
    }
  };

  // Add comment to review
  const handleAddComment = async (reviewId: number) => {
    const comment = newComment[reviewId]?.trim();
    if (!comment || !user?.id) return;

    try {
      const newCommentData = await AddReviewComment(reviewId, {
        user_id: user.id,
        comment,
        username: user.username || user.email?.split("@")[0] || `User ${user.id}`,
      });

      setReviewComments((prev) => ({
        ...prev,
        [reviewId]: [newCommentData, ...(prev[reviewId] || [])],
      }));

      setNewComment((prev) => ({ ...prev, [reviewId]: "" }));
      await fetchReviews();
    } catch (err: any) {
      console.error("Error adding comment:", err);
      setError(err.message || "Failed to add comment");
    }
  };

  // Get user display name functions
  const getUserDisplayName = (review: Review) => {
    if (user && review.user_id === user.id) {
      return user.username || user.email?.split("@")[0] || "You";
    }

    // Try multiple possible user name fields in order of preference
    return (
      review.username ||
      review.users?.username ||
      review.users?.email?.split("@")[0] ||
      `User ${review.user_id}` ||
      "Anonymous"
    );
  };

  const getCommentUserDisplayName = (comment: ReviewComment) => {
    if (user && comment.user_id === user.id) {
      return user.username || user.email?.split("@")[0] || "You";
    }

    // Try multiple possible user name fields in order of preference
    return (
      comment.username ||
      comment.users?.username ||
      `User ${comment.user_id}` ||
      "Anonymous"
    );
  };

  // Load like statuses for all reviews
  const loadReviewLikeStatuses = async (reviewsData: Review[]) => {
    if (!user?.id) return;

    const statuses: ReviewLikeStatus = {};

    for (const review of reviewsData) {
      try {
        const status = await GetReviewLikeStatus(review.id, user.id);
        statuses[review.id] = status;
      } catch (error) {
        console.error(`Error loading like status for review ${review.id}:`, error);
        statuses[review.id] = null;
      }
    }

    setReviewLikeStatuses(statuses);
  };

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await GetReviews(productId);
      setReviews(data);
      await loadReviewLikeStatuses(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching reviews:", err);
      setError(err.message || "Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  // Toggle review like/dislike
  const handleToggleLike = async (reviewId: number, isLike: boolean) => {
    if (!user?.id) {
      setError("You must be logged in to like reviews");
      return;
    }

    if (likingReviews.has(reviewId)) return;

    try {
      setLikingReviews((prev) => new Set(prev).add(reviewId));

      const currentStatus = reviewLikeStatuses[reviewId];
      const newStatus = currentStatus === isLike ? null : isLike;

      await ToggleReviewLike(reviewId, user.id, isLike);

      setReviewLikeStatuses((prev) => ({
        ...prev,
        [reviewId]: newStatus,
      }));

      await fetchReviews();
    } catch (err: any) {
      console.error("Error toggling like:", err);
      setError(err.message || "Failed to update like status");
    } finally {
      setLikingReviews((prev) => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  // Load comments for a review
  const loadReviewComments = async (reviewId: number) => {
    try {
      const comments = await GetReviewComments(reviewId);
      setReviewComments((prev) => ({ ...prev, [reviewId]: comments }));
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  // Toggle comments visibility
  const toggleComments = async (reviewId: number) => {
    const isExpanded = expandedComments.has(reviewId);

    if (isExpanded) {
      setExpandedComments((prev) => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    } else {
      setExpandedComments((prev) => new Set(prev).add(reviewId));
      if (!reviewComments[reviewId]) {
        await loadReviewComments(reviewId);
      }
    }
  };

  // Delete review
  const handleDeleteReview = async (reviewId: number) => {
    if (!user?.id) return;

    try {
      await DeleteReview(reviewId, user.id);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (err: any) {
      console.error("Error deleting review:", err);
      setError(err.message || "Failed to delete review");
    }
  };

  // Render star rating
  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void): React.ReactElement[] => {
    const stars: React.ReactElement[] = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => interactive && onStarClick?.(i)}
          className={`${interactive ? "hover:scale-110 transition-transform cursor-pointer" : "cursor-default"}`}
          disabled={!interactive}
        >
          <Star
            size={interactive ? 24 : 16}
            className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
          />
        </button>,
      );
    }
    return stars;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
      {/* Enhanced Reviews Header */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h5 className="text-2xl font-montserratBold text-gray-800">Customer Reviews</h5>
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
              <Eye size={16} className="text-blue-600" />
              <span className="text-sm text-blue-600 font-semibold">{reviews.length} reviews</span>
            </div>
          </div>
          {user ? (
            <button
              onClick={() => setShowAddReview(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-montserratBold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              Write a Review
            </button>
          ) : (
            <p className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">Login to add a review</p>
          )}
        </div>
        
        {reviews.length > 0 && (
          <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">{renderStars(Math.round(averageRating))}</div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">out of 5</div>
              </div>
            </div>
            <div className="h-12 w-px bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{reviews.length}</div>
              <div className="text-sm text-gray-600">review{reviews.length !== 1 ? "s" : ""}</div>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-center">
            <X size={20} className="text-red-600 mr-2" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Enhanced Reviews List */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Star size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </div>
        ) : (
          reviews.map((review) => {
            const userLikeStatus = reviewLikeStatuses[review.id];
            const isLiking = likingReviews.has(review.id);
            const displayName = getUserDisplayName(review);

            return (
              <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Enhanced Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{displayName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-montserratBold text-lg text-gray-800">{displayName}</span>
                        {user && review.user_id === user.id && (
                          <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-semibold">Your Review</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatDate(review.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  {user?.id === review.user_id && (
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Delete your review"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Enhanced Review Content */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border-l-4 border-blue-500">
                    <p className="text-gray-700 leading-relaxed text-base">{review.comment}</p>
                  </div>
                </div>

                {/* Enhanced Review Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLike(review.id, true)}
                      disabled={!user || isLiking}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                        !user || isLiking
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : userLikeStatus === true
                            ? "text-white bg-green-500 shadow-lg transform scale-105"
                            : "text-gray-600 bg-gray-100 hover:bg-green-100 hover:text-green-600"
                      }`}
                      title={!user ? "Login to like reviews" : userLikeStatus === true ? "Remove like" : "Like this review"}
                    >
                      <ThumbsUp size={18} className={`${userLikeStatus === true ? "fill-current" : ""}`} />
                      <span className="font-bold">{review.likes_count || 0}</span>
                    </button>

                    {/* Dislike Button */}
                    <button
                      onClick={() => handleToggleLike(review.id, false)}
                      disabled={!user || isLiking}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                        !user || isLiking
                          ? "text-gray-400 cursor-not-allowed bg-gray-100"
                          : userLikeStatus === false
                            ? "text-white bg-red-500 shadow-lg transform scale-105"
                            : "text-gray-600 bg-gray-100 hover:bg-red-100 hover:text-red-600"
                      }`}
                      title={!user ? "Login to dislike reviews" : userLikeStatus === false ? "Remove dislike" : "Dislike this review"}
                    >
                      <ThumbsDown size={18} className={`${userLikeStatus === false ? "fill-current" : ""}`} />
                      <span className="font-bold">{review.dislikes_count || 0}</span>
                    </button>

                    {/* Comments Button */}
                    <button
                      onClick={() => toggleComments(review.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-gray-600 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
                    >
                      <MessageCircle size={18} />
                      <span>{review.comments_count || 0} replies</span>
                    </button>
                  </div>
                </div>

                {/* Enhanced Comments Section */}
                {expandedComments.has(review.id) && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h6 className="font-montserratBold text-gray-800 mb-4 flex items-center gap-2">
                        <MessageCircle size={18} />
                        Replies ({review.comments_count || 0})
                      </h6>

                      {/* Add comment form */}
                      {user && (
                        <div className="flex gap-3 mb-6 bg-white p-4 rounded-lg border shadow-sm">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">{(user.username || user.email || "U").charAt(0).toUpperCase()}</span>
                          </div>
                          <div className="flex-1 flex gap-3">
                            <input
                              type="text"
                              value={newComment[review.id] || ""}
                              onChange={(e) => setNewComment((prev) => ({ ...prev, [review.id]: e.target.value }))}
                              placeholder="Write a reply..."
                              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              onKeyPress={(e) => e.key === "Enter" && handleAddComment(review.id)}
                            />
                            <button
                              onClick={() => handleAddComment(review.id)}
                              disabled={!newComment[review.id]?.trim()}
                              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 font-semibold"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Comments list */}
                      <div className="space-y-4">
                        {reviewComments[review.id]?.map((comment) => (
                          <div key={comment.id} className="flex gap-3 bg-white p-4 rounded-lg border shadow-sm">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-sm font-bold">{getCommentUserDisplayName(comment).charAt(0).toUpperCase()}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-gray-700">{getCommentUserDisplayName(comment)}</span>
                                {user && comment.user_id === user.id && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">You</span>
                                )}
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-400">{comment.created_at ? formatDate(comment.created_at) : 'Unknown date'}</span>
                              </div>
                              <p className="text-gray-600 leading-relaxed">{comment.comment}</p>
                            </div>
                          </div>
                        ))}
                        {(!reviewComments[review.id] || reviewComments[review.id].length === 0) && (
                          <div className="text-center py-8">
                            <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500 italic">No replies yet. Be the first to reply!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Enhanced Add Review Dialog */}
      {showAddReview && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-montserratBold text-gray-800">Share Your Experience</h3>
                <button
                  onClick={() => {
                    setShowAddReview(false);
                    setError(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {user && (
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {(user.username || user.email || "U").charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {user.username || user.email?.split("@")[0] || "You"}
                      </p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-lg font-montserratBold text-gray-800 mb-3">Rate this product</label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    {renderStars(newReview.rating, true, (star) => setNewReview((prev) => ({ ...prev, rating: star })))}
                    <span className="text-lg font-semibold text-gray-600 ml-3">({newReview.rating}/5)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-montserratBold text-gray-800 mb-3">Write your review</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                    placeholder="Tell others about your experience with this product..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      setShowAddReview(false);
                      setError(null);
                    }}
                    className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-montserratBold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={!newReview.comment.trim() || !user}
                    className={`flex-1 py-4 px-6 rounded-xl font-montserratBold transition-all duration-300 ${
                      !newReview.comment.trim() || !user
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    }`}
                  >
                    Publish Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSystem;