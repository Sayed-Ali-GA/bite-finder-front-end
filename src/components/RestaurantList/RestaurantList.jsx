import { Link } from "react-router-dom";

const RestaurantList = ( props ) => {
  const { restaurants, handleSelect } = props;

  return (
    <>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.length ? (
          restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              <span onClick={() => handleSelect(restaurant)}>
                <Link to={`/restaurant/${restaurant._id}`}>
                {restaurant.name}
                </Link>
              </span>
              {/* <button onClick={() => handleUpdate(restaurant)}>Update</button>{" "}
              <button onClick={() => handleDelete(restaurant._id)}>Delete</button>{" "} */}

              <Link to={`/restaurant/${restaurant._id}/menu`}>Menu</Link>
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