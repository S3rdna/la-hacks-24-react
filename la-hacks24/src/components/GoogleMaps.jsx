import { useState, useEffect } from 'react';
import '../App.css';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url("https://imgur.com/tqBuiCv")', // Replace with your retro map image URL
    backgroundSize: 'cover',
    border: '2px solid #ccc', // Add a border for a vintage frame effect
    borderRadius: '10px' // Add border radius for rounded corners
};
const defaultCenter = {
    lat: 7.2905715, // default latitude
    lng: 80.6337262, // default longitude
};

const currfake = {
  lat: 34.0671424, 
  lng: -118.4513456,
};

const minZoomLevel = 15; // Adjust the minimum zoom level as needed
const maxZoomLevel = 30;

// Array of restaurant names
const restaurantNames = ["Gushi Korean", "Hangry Moon's", "Bella Pita UCLA", "Coffee by Default", "Pauley Pavilion"];
const currfakeName = ["Pauley Pavilion"]

const calcDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d * 0.621371; // Convert to miles
}

const deg2rad = (deg) => {
  return deg * (Math.PI / 180)
}


// Function to fetch coordinates of a restaurant using Google Maps Geocoding API
const fetchRestaurantCoordinates = async (restaurantName) => {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${restaurantName}&key=AIzaSyAeG3P6Emr77_rBXL9A6mJuYkYHVbOCRXs`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        } else {
            console.error(`No coordinates found for ${restaurantName}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching restaurant coordinates:', error);
        return null;
    }
};

function GoogleMaps() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userMarker, showUserMarker] = useState(false);



    
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAeG3P6Emr77_rBXL9A6mJuYkYHVbOCRXs',
        libraries,
    });

    useEffect(() => {
        const fetchRestaurantMarkers = async () => {
            const userPosition = currentPosition || defaultCenter;
            const restaurantMarkers = [];
            for (const restaurantName of restaurantNames) {
                const coordinates = await fetchRestaurantCoordinates(restaurantName);
                if (coordinates) {
                    const distance = calcDistance(userPosition.lat, userPosition.lng, coordinates.lat, coordinates.lng);
                    if (distance <= 10) { // Check if restaurant is within 10 miles radius
                        restaurantMarkers.push({ name: restaurantName, coordinates });
                    }
                }
            }
            setRestaurants(restaurantMarkers);
            setLoading(false);
        };
        fetchRestaurantMarkers();
    }, [currentPosition]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                    setLoading(false);
                    console.log(currentPosition)
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoading(false);
                }
            );
            
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                    setLoading(false);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setLoading(false);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded || loading) {
        return <div>Loading maps...</div>;
    }

    

    

    return (
        <>
            <div>
            {currentPosition && (
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        zoom={17}
                        center={currentPosition || defaultCenter}
                        options={{ minZoom: minZoomLevel, maxZoom: maxZoomLevel, mapTypeId: 'satellite' }}
                        mapId='retro'
                    >

                      
                        {<Marker 
                            position={currentPosition}
                            icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Change pin color here
                                scaledSize: new window.google.maps.Size(100, 100), // Adjust pin size if needed
                            }}
                        />}
                        
                        {restaurants.map((restaurant, index) => (
                            <Marker 
                                key={index} 
                                position={restaurant.coordinates}
                                icon={{
                                    url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', // Change pin color here
                                    scaledSize: new window.google.maps.Size(40, 40), // Adjust pin size if needed
                                }}
                            />
                        ))}
                    </GoogleMap>
                )}
            </div>
        </>
    );
}

export default GoogleMaps;
