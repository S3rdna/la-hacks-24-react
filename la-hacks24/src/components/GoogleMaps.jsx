
import { useState } from 'react'
import '../App.css'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};


function GoogleMaps() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAsTzkXLz5wwjtaFh5SVtd6RX_tAGgNCno',
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <>
    <h2>Google Ma-ps</h2>
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  




    </>
  )
}

export default GoogleMaps
