import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as restaurantService from '../../services/restaurantService';
import CommentForm from '../CommentForm/CommentForm';
import './RestaurantDetails.css'

const RestaurantDetails = (props) => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState();

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurantData = await restaurantService.show(restaurantId);
      setRestaurant(restaurantData);
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handleAddComment = async (formData) => {
    const newComment = await restaurantService.createComment(formData, restaurantId);
    newComment.authorId = { username: props.user.username };
    setRestaurant({ ...restaurant, comments: [...restaurant.comments, newComment] });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await restaurantService.deleteComment(restaurantId, commentId);
      setRestaurant(prev => ({
        ...prev,
        comments: prev.comments.filter(c => c._id !== commentId)
      }));
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (!restaurant) return <main style={{color:'white', textAlign:'center', marginTop:'3rem'}}>Loading restaurant data...</main>;

  const isOwner = restaurant.ownerId?._id === props.user?._id;

  return (
    <div className="restaurant-details-container">
<header className="restaurant-header">
  <Link to="/restaurant" className="back-link">← Back</Link>

  <h1 className="restaurant-name">{restaurant.name}</h1>
  <h2 className="restaurant-type">{restaurant.type}</h2>
  <p className="restaurant-meta">
    Posted by <strong>{restaurant.ownerId?.username || "Unknown"}</strong> on {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : "Date not available"}
  </p>

  {isOwner && (
    <div className="restaurant-actions">
      <Link to={`/restaurant/${restaurantId}/edit`} className="btn-edit">Edit</Link>
      <button className="btn-delete" onClick={() => props.handleDeleterestaurant(restaurantId)}>Delete</button>
    </div>
  )}
</header>

      <section className="menu-link-section">
        <Link to={`/restaurant/${restaurant._id}/menu`} className="btn-view-menu">
          View Menu of {restaurant.name}
        </Link>
      </section>

      {/* COMMENT SECTION UNCHANGED */}
      <section className="comments-section">
        <h2>Comments:</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!restaurant.comments.length && <p className="no-comments">There are no comments yet. Be the first to add one!</p>}
        {restaurant.comments.map((comment) => (
          <div key={comment._id}>
            <button onClick={() => handleDeleteComment(comment._id)}>Delete {comment.content}</button>
            <p>{comment.authorId.username}: {comment.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RestaurantDetails;
