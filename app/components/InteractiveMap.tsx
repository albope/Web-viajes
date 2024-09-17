// components/InteractiveMap.tsx
import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Card, CardContent } from './card';

type Trip = {
  id: number;
  destination: string;
  description: string;
  image: string;
  location: [number, number];
  driveLink: string;
};

type InteractiveMapProps = {
  trips: Trip[];
};

const customIcon = L.icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({ trips }) => {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Mapa de Nuestros Viajes</h2>
        <Card>
          <CardContent className="p-0">
            <div className="h-96 rounded-lg overflow-hidden">
              <MapContainer
                center={[20.0, 0.0]} // Centro global
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {trips.map((trip) => (
                  <Marker
                    key={trip.id}
                    position={trip.location}
                    icon={customIcon}
                  >
                    <Popup>
                      <strong>{trip.destination}</strong>
                      <br />
                      {trip.description}
                    </Popup>
                  </Marker>
                ))}
                <ZoomControl position="bottomright" />
              </MapContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default InteractiveMap;