import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import * as restaurantService from '../../services/restaurantService'
import { Link } from 'react-router-dom'
import CommentForm from '../CommentForm/CommentForm'


const RestaurantDetails = (props) => {
    
    const {restaurantId} = useParams()

    const [restaurant, setRestaurant] = useState()
  
    useEffect (() => {
          const fetchRestaurant = async () => {
             const restaurantData = await restaurantService.show(restaurantId)
             setRestaurant(restaurantId) 
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
      

        <h1>{restaurant.title}</h1>

         <p>{restaurant.auther.username} Posted on {new Date (restaurant.createdAt).toLocaleDateString()}</p> 

         {restaurant.auther._id === props.user?._id && (
            <div>
                 <Link to={`/restaurant/${restaurantId}/edit`}>Edit</Link>
                 <button onClick={() => props.handleDeleteRES(restaurantId)}>Delete</button>
            </div>
         )}

    </header>
    
    <section>
          <h2>Comments:</h2>
            <CommentForm handleAddComment={handleAddComment} />

            {!restaurant.comments.length && <p>There are no comments, Add comment now.</p>} 

            {restaurant.comments.map((comment) => (
                 <div key={comment._id}>
                     <p>{comment.text}</p>
                 </div>
            ))}
    </section>
    </main>
  )

}

  export default RestaurantDetails