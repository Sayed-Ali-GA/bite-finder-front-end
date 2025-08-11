const RestaurantList = ({ restaurants, handleSelect }) => {
  return (
    <>
      <h1>Restaurant List</h1>
      <ul>
        {restaurants.length ? (
          restaurants.map((restaurant) => (
            <li key={restaurant._id}>
              <span onClick={() => handleSelect(restaurant)}>
                {restaurant.name}
              </span>
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