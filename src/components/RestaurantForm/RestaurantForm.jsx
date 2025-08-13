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
    } else {
      setFormData(initialState);
    }
  }, [props.selectedRestaurant]);

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
        navigate(updatedRestaurant && updatedRestaurant._id ? `/restaurant/${updatedRestaurant._id}` : "/");
      } else {
        const newRestaurant = await props.handleAddRestaurant(dataToSend);
        navigate(newRestaurant && newRestaurant._id ? `/restaurant/${newRestaurant._id}` : "/");
      }
    } catch (err) {
      console.error("Error saving restaurant:", err);
    }

    setFormData(initialState);
    setCoordinates(null);
  };

  return (
    <>
     <div
  style={{
    padding: '2rem',
    background: 'linear-gradient(135deg, #0F2027, #203A43, #2C5364)',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}
>
  <h1
    style={{
      textAlign: 'center',
      fontSize: '2.8rem',
      fontWeight: 800,
      marginBottom: '3rem',
      background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textShadow: '0 2px 10px rgba(0,0,0,0.3)',
    }}
  >
    {props.selectedRestaurant ? 'Edit Restaurant' : 'Add Restaurant'}
  </h1>

  <form
    onSubmit={handleSubmit}
    style={{
      background: 'rgba(255,255,255,0.07)',
      borderRadius: '20px',
      padding: '1.5rem',
      color: 'white',
      backdropFilter: 'blur(15px)',
      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '800px',
      transition: 'transform 0.35s ease, box-shadow 0.35s ease',
    }}
  >
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="name" style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{
          background: 'rgba(255,255,255,0.07)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          width: '100%',
        }}
      />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="type" style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
        Type:
      </label>
      <input
        type="text"
        id="type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        required
        style={{
          background: 'rgba(255,255,255,0.07)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          width: '100%',
        }}
      />
    </div>

    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="description" style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
        Description:
      </label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        style={{
          background: 'rgba(255,255,255,0.07)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          width: '100%',
          minHeight: '150px',
          resize: 'vertical',
        }}
      />
    </div>

   
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor="location" style={{ fontWeight: 'bold', marginBottom: '0.5rem', display: 'block' }}>
        Location:
      </label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        placeholder="Click on map to select location"
        readOnly
        required
        style={{
          background: 'rgba(255,255,255,0.07)',
          color: 'white',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '12px',
          padding: '12px',
          fontSize: '1rem',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          width: '100%',
        }}
      />
    </div>

    <div
      style={{
        width: '100%',
        height: '250px',
        borderRadius: '12px',
        overflow: 'hidden',
        marginBottom: '1rem',
        flexShrink: 0,
        transition: 'transform 0.3s ease',
      }}
    >
      <Map
        initialViewState={{
          latitude: coordinates ? coordinates.latitude : 26.0667,
          longitude: coordinates ? coordinates.longitude : 50.5577,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        onClick={handleMapClick}
      >
        {coordinates && <Marker latitude={coordinates.latitude} longitude={coordinates.longitude} color="red" />}
      </Map>
    </div>

    <button
      type="submit"
      style={{
        display: 'block',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FF6A00, #EE0979)',
        color: 'white',
        padding: '0.65rem',
        borderRadius: '12px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
    >
      {props.selectedRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
    </button>
  </form>
</div>




    </>
  );
};

export default RestaurantForm;
