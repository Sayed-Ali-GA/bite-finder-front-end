import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as restaurantService from "../../services/restaurantService";
import CommentForm from "../CommentForm/CommentForm";

const RestaurantDetails = (props) => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

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
    setRestaurant({
      ...restaurant,
      comments: [...restaurant.comments, newComment],
    });
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await restaurantService.deleteComment(restaurantId, commentId);
      setRestaurant((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
    } catch (error) {
      console.error("Failed to delete comment", error);
    }
  };

  if (!restaurant) return <main>Loading.....</main>;

  return (
    <main className="res-details">
      <header className="res-details">
        <h1>{restaurant.name}</h1>
        <h2>{restaurant.type}</h2>
        <p>
          {restaurant.ownerId?.username || "Unknown"} Posted on{" "}
          {restaurant.createdAt
            ? new Date(restaurant.createdAt).toLocaleDateString()
            : "Date not available"}
        </p>

        {restaurant.ownerId?._id === props.user?._id && (
          <div>
            <button
              onClick={() => {
                props.handleRestaurantSelect(restaurant);
                navigate(`/restaurant/${restaurantId}/edit`);
              }}
            >
              Edit
            </button>
            <button onClick={() => props.handleDeleterestaurant(restaurantId)}>
              Delete
            </button>
          </div>
        )}
      </header>

      <Link to={`/restaurant/${restaurant._id}/menu`}>Menu of {restaurant.name}</Link>

      <section>
        <h2>Comments:</h2>
        <CommentForm handleAddComment={handleAddComment} />

        {!restaurant.comments.length && <p>There are no comments, Add comment now.</p>}

        {restaurant.comments.map((comment) => (
          <div key={comment._id}>
            <button onClick={() => handleDeleteComment(comment._id)}>
              Delete {comment.content}
            </button>
            <p>
              {comment.authorId.username}: {comment.content}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
};
// a commit

export default RestaurantDetails;
