import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import RestaurantMap from "../RestaurantMap/RestaurantMap";
import "./RestaurantList.css";

const RestaurantList = ({ restaurants, handleSelect }) => {
  return (
    <div className="restaurant-container">
      <h1 className="title">🍽 Explore Our Restaurants</h1>

      {restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => {
            const { _id, name, type, description, location, ownerId, createdAt, coordinates } = restaurant;
            return (
              <div className="restaurant-card" key={_id}>
                
               
                <div className="card-header">
                  <h2>{name}</h2>
                  <span className="type-badge">{type}</span>
                </div>

             
                <div className="card-content">
                  <p className="description">{description}</p>
                  <p className="location">📍 <strong>{location}</strong></p>
                  <p className="meta">
                    {ownerId?.username || "Unknown"} —{" "}
                    {createdAt ? new Date(createdAt).toLocaleDateString() : "Date not available"}
                  </p>

               
                  {coordinates?.lat && coordinates?.lng && (
                    <div className="map-container">
                      <RestaurantMap lat={coordinates.lat} lng={coordinates.lng} />
                    </div>
                  )}
                </div>

           
                <Link
                  to={`/restaurant/${_id}`}
                  onClick={() => handleSelect(restaurant)}
                  className="view-btn"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="no-data">No Restaurants Yet</h2>
      )}
    </div>
  );
};


RestaurantList.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSelect: PropTypes.func.isRequired,
};

export default RestaurantList;
