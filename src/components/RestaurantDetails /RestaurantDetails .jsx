import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as restaurantService from '../../services/restaurantService'
import { Link } from 'react-router-dom'
import CommentForm from '../CommentForm/CommentForm'


const RestaurantDetails = (props) => {
    
    const {restaurantId} = useParams()

    const [restaurant, setRestaurant] = useState()
  
    useEffect (() => {
          const fetchRestaurant = async () => {
             const restaurantData = await restaurantService.show(restaurantId)
             setRestaurant(restaurantData) 
          }
        fetchRestaurant()  
    }, [restaurantId])

  const handleAddComment = async (formData) => {
    const newComment = await restaurantService.createComment(formData, restaurantId)
    setRestaurant({...restaurant, comments: [...restaurant.comments, newComment]})
  }

  if(!restaurant) return <main>Loading.....</main>



  return ( 
    <main className="res-details"> 
    <header className="res-details">
      

        <h1>{restaurant.name}</h1>

        <p>{restaurant.author?.username || "Unknown"} Posted on {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : "Date not available"}</p>


       {restaurant.author?._id === props.user?._id && (
  <div>
    <Link to={`/restaurant/${restaurantId}/edit`}>Edit</Link>
    <button onClick={() => props.handleDeleteRES(restaurantId)}>Delete</button>
  </div>
)}


    </header>
    <Link to={`/restaurant/${restaurant._id}/menu`}>Menu</Link>
    <section>
          <h2>Comments:</h2>
            <CommentForm handleAddComment={handleAddComment} />

            {!restaurant.comments.length && <p>There are no comments, Add comment now.</p>} 

            {restaurant.comments.map((comment) => (
                 <div key={comment._id}>
                     <p>{comment.content}</p>
                 </div>
            ))}
    </section>
    </main>
  )

}

export default RestaurantDetails 