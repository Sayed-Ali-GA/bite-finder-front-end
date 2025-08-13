// import { Link } from "react-router-dom";

// const RestaurantList = ( props ) => {
//   const { restaurants, handleSelect } = props;

//   return (
//     <>
//       <h1>Restaurant List</h1>
//       <ul>
//         {restaurants.length ? (
//           restaurants.map((restaurant) => (
//             <li key={restaurant._id}>
//               <span onClick={() => handleSelect(restaurant)}>
//                 <Link to={`/restaurant/${restaurant._id}`}>

//                 <h2>{restaurant.name}</h2>  
//                 <p>{restaurant.description}</p>
//                 {restaurant.location}       
//                 <p>{restaurant.ownerId?.username || "Unknown"} Posted on {restaurant.createdAt ? new Date(restaurant.createdAt).toLocaleDateString() : "Date not available"}</p>
                
//                 </Link>
//               </span>
              
//               {/* <button onClick={() => handleUpdate(restaurant)}>Update</button>{" "}
//               <button onClick={() => handleDelete(restaurant._id)}>Delete</button>{" "} */}

//               {/* <Link to={`/restaurant/${restaurant._id}/menu`}>Menu</Link> */}

//             </li>
//           ))
//         ) : (
//           <h2>No Restaurants Yet</h2>
//         )}
//       </ul>
//     </>
//   );
// };

// export default RestaurantList;

import { Link } from "react-router-dom";
import RestaurantMap from "../RestaurantMap/RestaurantMap";

const RestaurantList = (props) => {
  const { restaurants, handleSelect } = props;

  return (
    <>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.length ? (
          restaurants.map((restaurant) => (
            <li
              key={restaurant._id}
              
            >
             
              <Link
                to={`/restaurant/${restaurant._id}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display: "block",
                }}
                onClick={() => handleSelect(restaurant)}
              >
                <h2>{restaurant.name}</h2>
                <h5>{restaurant.type}</h5>
                <p>{restaurant.description}</p>
                <p>
                  <strong>Location:</strong> {restaurant.location}
                </p>
                
              </Link>

            
              {restaurant.coordinates?.lat && restaurant.coordinates?.lng && (
                <RestaurantMap
                  lat={restaurant.coordinates.lat}
                  lng={restaurant.coordinates.lng}
                />
              )}
              <p>
                  {restaurant.ownerId?.username || "Unknown"} — Posted on{" "}
                  {restaurant.createdAt
                    ? new Date(restaurant.createdAt).toLocaleDateString()
                    : "Date not available"}
                </p>
            </li>
            
          ))
        ) : (
          <h2>No Restaurants Yet</h2>
        )}
      </ul>
    </>
  );
};

export default RestaurantList;