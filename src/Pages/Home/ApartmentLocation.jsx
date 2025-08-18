// src/components/ApartmentLocation.jsx

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix the default Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ApartmentLocation = () => {
    const torontoPosition = [43.65107, -79.347015];

    return (
        <section className="   py-24 ">
            <div className='max-w-7xl p-9 bg-base-200 mx-auto rounded-lg '>
                <h2 className="text-3xl font-bold text-center mb-6">
                    Our Apartment Location – Toronto, Canada
                </h2>

                <p className="text-center max-w-2xl mx-auto mb-8 ">
                    Our apartment is located in the heart of Toronto, Canada. Easily accessible via public transportation with nearby amenities. Enjoy modern living with convenience.
                </p>

                <div className="h-[450px]  w-full rounded-2xl overflow-hidden shadow-lg">
                    <MapContainer
                    
                        center={torontoPosition}
                        zoom={13}
                        scrollWheelZoom={false}
                        className="h-full  w-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={torontoPosition}>
                            <Popup>
                                Our Apartment <br /> Downtown Toronto
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default ApartmentLocation;
