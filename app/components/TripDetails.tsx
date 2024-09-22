// components/TripDetails.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';

// Tipos de datos
type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

type Trip = {
  destination: string;
  date: string;
  placesVisited: string[];
  activities: string[];
  cuisine: string;
  accommodation: string;
  tips: string;
  timelineEvents: TimelineEvent[]; // Solo contendrá un evento
};

type TripDetailsProps = {
  trip: Trip | null;
};

const TripDetails: React.FC<TripDetailsProps> = ({ trip }) => {
  if (!trip) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Detalles del Viaje</h2>
          <Card>
            <CardContent>
              <p>No hay detalles disponibles para este viaje.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Extrae el momento más memorable (único evento del viaje)
  const memorableMoment = trip.timelineEvents[0];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Detalles del Viaje</h2>
        <Card>
          <CardHeader>
            <CardTitle>{trip.destination}</CardTitle>
            <CardDescription>{trip.date}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Mostrar el momento más memorable si existe */}
            {memorableMoment ? (
              <div className="mb-6">
                <h3 className="text-2xl font-bold mt-4 mb-2">El momento más memorable</h3>
                <h4 className="font-semibold">{memorableMoment.title}</h4>
                <p className="text-gray-600">{memorableMoment.date}</p>
                <p>{memorableMoment.description}</p>
                {memorableMoment.image && (
                  <img
                    src={memorableMoment.image}
                    alt={memorableMoment.title}
                    className="w-full h-64 object-cover rounded-lg mt-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/generic-travel.jpg';
                    }}
                  />
                )}
              </div>
            ) : (
              <p className="text-gray-500">No hay eventos disponibles.</p>
            )}

            {/* Detalles Adicionales del Viaje */}
            <h3 className="font-semibold mt-4">Lugares visitados:</h3>
            <ul className="list-disc list-inside mb-2">
              {trip.placesVisited.map((place, index) => (
                <li key={index}>{place}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4">Actividades:</h3>
            <ul className="list-disc list-inside mb-2">
              {trip.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-4">Gastronomía:</h3>
            <p>{trip.cuisine}</p>
            <h3 className="font-semibold mt-4">Alojamiento:</h3>
            <p>{trip.accommodation}</p>
            <h3 className="font-semibold mt-4">Consejos:</h3>
            <p>{trip.tips}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TripDetails;