// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"

// const RestaurantForm = (props) => {
//   const navigate = useNavigate()

//   const initialState = { 
//     name: '',
//     type: '',
//     location: '',
//     description: '',
//   }

//   const [formData, setFormData] = useState(initialState)

//   // Pre-fill form if editing
//   useEffect(() => {
//     if (props.selectedRestaurant) {
//       setFormData({
//         name: props.selectedRestaurant.name || '',
//         type: props.selectedRestaurant.type || '',
//         location: props.selectedRestaurant.location || '',
//         description: props.selectedRestaurant.description || '',
//       })
//     }
//   }, [props.selectedRestaurant])

//   const handleChange = (evt) => {
//     setFormData({ ...formData, [evt.target.name]: evt.target.value })
//   }

//   const handleSubmit = async (evt) => {
//     evt.preventDefault()

//     try {
//       if (props.selectedRestaurant) {
//         // Editing
//         const updatedRestaurant = await props.handleUpdateRestaurant(formData, props.selectedRestaurant._id)
//         if (updatedRestaurant && updatedRestaurant._id) {
//           navigate(`/restaurant/${updatedRestaurant._id}`)
//         } else {
//           navigate("/") // fallback
//         }
//       } else {
//         // Adding
//         const newRestaurant = await props.handleAddRestaurant(formData)
//         if (newRestaurant && newRestaurant._id) {
//           navigate(`/restaurant/${newRestaurant._id}`)
//         } else {
//           navigate("/") // fallback
//         }
//       }
//     } catch (err) {
//       console.error("Error saving restaurant:", err)
//     }

//     setFormData(initialState)
//   }

//   return (
//     <>
//       <h1>{props.selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h1>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="name">Name:</label>
//         <input
//           required 
//           type="text" 
//           name="name" 
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <label htmlFor="type">Type:</label>
//         <input
//           required 
//           type="text" 
//           name="type" 
//           value={formData.type}
//           onChange={handleChange}
//         />

//         <label htmlFor="location">Location:</label>
//         <input 
//           required
//           type="text" 
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         />

//         <label htmlFor="description">Description:</label>
//         <textarea
//           required 
//           name="description" 
//           value={formData.description}
//           onChange={handleChange} 
//         ></textarea>

//         <button type="submit">
//           {props.selectedRestaurant ? "Edit" : "Submit"}
//         </button>
//       </form>
//     </>
//   )
// }

// export default RestaurantForm





import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const RestaurantForm = (props) => {
  const navigate = useNavigate();

  const initialState = { 
    name: '',
    type: '',
    location: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (props.selectedRestaurant) {
      setFormData({
        name: props.selectedRestaurant.name || '',
        type: props.selectedRestaurant.type || '',
        location: props.selectedRestaurant.location || '',
        description: props.selectedRestaurant.description || '',
      });

      if (props.selectedRestaurant.location) {
        const [lat, lng] = props.selectedRestaurant.location.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          setCoordinates({ latitude: lat, longitude: lng });
        }
      }
    }

    else{
      setFormData(initialState)
    }
  }, [props.selectedRestaurant])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    setCoordinates({ latitude: lat, longitude: lng });
    setFormData({ ...formData, location: `${lat.toFixed(6)},${lng.toFixed(6)}` });
  };

const handleSubmit = async (evt) => {
  evt.preventDefault();

  
  const dataToSend = {
    ...formData,
    coordinates: coordinates ? { lat: coordinates.latitude, lng: coordinates.longitude } : undefined
  };

  try {
    if (props.selectedRestaurant) {
      const updatedRestaurant = await props.handleUpdateRestaurant(dataToSend, props.selectedRestaurant._id);
      if (updatedRestaurant && updatedRestaurant._id) {
        navigate(`/restaurant/${updatedRestaurant._id}`);
      } else {

        navigate("/");
      }
    } else {
      const newRestaurant = await props.handleAddRestaurant(dataToSend);
      if (newRestaurant && newRestaurant._id) {
        navigate(`/restaurant/${newRestaurant._id}`);
      } else {
        navigate("/");
      }
    }
  } catch (err) {
    console.error("Error saving restaurant:", err);
  }

  setFormData(initialState);
  setCoordinates(null);
};


  return (
    <>
      <h1>{props.selectedRestaurant ? "Edit Restaurant" : "Add Restaurant"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          required 
          type="text" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
        />

        <label htmlFor="type">Type:</label>
        <input
          required 
          type="text" 
          name="type" 
          value={formData.type}
          onChange={handleChange}
        />

          <br />

        <label htmlFor="location">Location (lat,lng):</label>
        <input 
          required
          type="text" 
          name="location"
          value={formData.location}
          placeholder="Click on map to select location"
          readOnly
        />

        <div style={{ width: '100%', height: 300, marginBottom: '1rem' }}>
          <Map
          initialViewState={{
  latitude: coordinates ? coordinates.latitude : 26.0667,
  longitude: coordinates ? coordinates.longitude : 50.5577,
  zoom: 10
}}

            style={{ width: '100%', height: '100%' }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
            onClick={handleMapClick}
          >
            {coordinates && (
              <Marker latitude={coordinates.latitude} longitude={coordinates.longitude} color="red" />
            )}
          </Map>
        </div>

        <label htmlFor="description">Description:</label>
        <textarea
          required 
          name="description" 
          value={formData.description}
          onChange={handleChange} 
        />

        <button type="submit">
          {props.selectedRestaurant ? "Edit" : "Submit"}
        </button>
      </form>
    </>
  );
};

export default RestaurantForm;
