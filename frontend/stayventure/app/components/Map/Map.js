import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
// import styles from '../../../styles';

//Utilized the youtube video to help learn about leaflet and how to create markers
//https://www.youtube.com/watch?v=ls_Eue1xUtY&list=PLyWyQBSWLw1NH1wsA0wkSMTlQ45P0AqCj
//Leaflet from basic to advance video

export default function Map({ searchQuery, minPrice, maxPrice, center }) {
    const [properties, setProperties] = useState([]);
    const [isLoading, setLoading] = useState(true);
    // const [center, setMapCenter] = useState([51.505, -0.09]);
    // if (!center){
    //     center = [51.505, -0.09];
    // }
    // console.log("center in map", center);
    useEffect(() => {
        // Fetch data on the client-side
        async function fetchProperties() {
            // Fetch data only if window object exists (client-side)
            if (typeof window !== 'undefined') {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/properties`);
                    const data = await res.json();
                    setProperties(data);
                    setLoading(false);
                    
                } catch (error) {
                    console.error("Error fetching properties:", error);
                    setLoading(false);
                }
            }
        }

        fetchProperties();
    }, []);

    if (isLoading) return <></>;
    if (properties.length === 0) return <></>;
    // console.log(properties);
    

    const search = searchQuery ? searchQuery.toLowerCase() : "";
    const minimumPrice = minPrice || 0;
    const maximumPrice = maxPrice || Infinity;

    const customIcon = new Icon({
        iconUrl: '/placeholder.png',
        iconSize: [38, 38]
        
    });
    

    return (
        <div className="modal-content">
        <MapContainer center={center} zoom={5} style={{ height: '1000px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {properties
                .filter(property =>
                    (property.country.toLowerCase().startsWith(search) ||
                        property.city.toLowerCase().startsWith(search) ||
                        property.prov_state.toLowerCase().startsWith(search)) &&
                    property.price >= minimumPrice &&
                    property.price <= maximumPrice &&
                    property.geocode.length === 2 && 
                    !isNaN(property.geocode[0]) &&
                    !isNaN(property.geocode[1]) 
                )
                .map((marker, index) => (
                    <Marker key={index} position={marker.geocode} icon={customIcon}>
                        <Popup>
                            <div>
                                <h2>{marker.title}</h2>
                                <p>
                                    <strong>Location:</strong> {marker.city}, {marker.prov_state}, {marker.country}
                                </p>
                                <p>
                                    <strong>Price:</strong> ${marker.price} per night
                                </p>
                                <p>{marker.description}</p>
                                <p>
                                    <strong>Address:</strong> {marker.address}, {marker.city}, {marker.prov_state}, {marker.postalCode}
                                </p>
                                <a href={`/properties/${marker._id}`} target="_blank" rel="noopener noreferrer">See Listing</a>
                            </div>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
        </div>
    );
};
