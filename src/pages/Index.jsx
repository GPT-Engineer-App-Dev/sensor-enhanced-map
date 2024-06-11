import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for buildings in Oslo
const buildings = [
  { id: 1, name: 'Building 1', position: [59.9139, 10.7522], sensorData: 'Temperature: 20°C, Humidity: 30%' },
  { id: 2, name: 'Building 2', position: [59.9149, 10.7522], sensorData: 'Temperature: 22°C, Humidity: 35%' },
  { id: 3, name: 'Building 3', position: [59.9159, 10.7522], sensorData: 'Temperature: 21°C, Humidity: 33%' },
  { id: 4, name: 'Building 4', position: [59.9169, 10.7522], sensorData: 'Temperature: 23°C, Humidity: 37%' },
  { id: 5, name: 'Building 5', position: [59.9179, 10.7522], sensorData: 'Temperature: 19°C, Humidity: 29%' },
  { id: 6, name: 'Building 6', position: [59.9189, 10.7522], sensorData: 'Temperature: 24°C, Humidity: 40%' },
  { id: 7, name: 'Building 7', position: [59.9199, 10.7522], sensorData: 'Temperature: 18°C, Humidity: 28%' },
  { id: 8, name: 'Building 8', position: [59.9209, 10.7522], sensorData: 'Temperature: 25°C, Humidity: 42%' },
  { id: 9, name: 'Building 9', position: [59.9219, 10.7522], sensorData: 'Temperature: 17°C, Humidity: 27%' },
  { id: 10, name: 'Building 10', position: [59.9229, 10.7522], sensorData: 'Temperature: 26°C, Humidity: 45%' },
];

// Default Leaflet marker icon
const defaultIcon = L.icon({
  iconUrl: L.Icon.Default.prototype._getIconUrl.call(this, 'icon'),
  shadowUrl: L.Icon.Default.prototype._getIconUrl.call(this, 'shadow'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
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
            icon={defaultIcon}
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