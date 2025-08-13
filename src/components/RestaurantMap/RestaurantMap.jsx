import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker } from 'react-map-gl';

export default function RestaurantMap({ lat, lng }) {
  return (
    <Map
      initialViewState={{
        latitude: lat ?? 26.0667,
        longitude: lng ?? 50.5577,
        zoom: 10
      }}
      style={{ width: '100%', height: 300 }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      {lat && lng && <Marker latitude={lat} longitude={lng} color="red" />}
    </Map>
  );
}
