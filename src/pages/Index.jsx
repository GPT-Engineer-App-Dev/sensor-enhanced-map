import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for buildings in Oslo
const buildings = [
  { id: 1, name: 'Building 1', position: [59.9139, 10.7522], sensorData: 'Temperature: 20°C, Humidity: 30%' },
  { id: 2, name: 'Building 2', position: [59.9149, 10.7522], sensorData: 'Temperature: 22°C, Humidity: 35%' },
  // ... Add 8 more buildings with dummy data
];

// Custom pin icon
const pinIcon = new L.Icon({
  iconUrl: 'path/to/default/marker-icon.png', // Placeholder path for default marker icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <Box height="100vh" width="100vw">
      <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buildings.map(building => (
          <Marker
            key={building.id}
            position={building.position}
            icon={pinIcon}
            eventHandlers={{
              click: () => {
                setActiveBuilding(building);
              },
            }}
          />
        ))}
        {activeBuilding && (
          <Popup
            position={activeBuilding.position}
            onClose={() => {
              setActiveBuilding(null);
            }}
          >
            <Box>
              <h2>{activeBuilding.name}</h2>
              <p>{activeBuilding.sensorData}</p>
            </Box>
          </Popup>
        )}
      </MapContainer>
    </Box>
  );
};

export default Index;