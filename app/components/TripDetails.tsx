// components/TripDetails.tsx
import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './card';

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
  timelineEvents: TimelineEvent[];
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
            <VerticalTimeline>
              {trip.timelineEvents.map((event, index) => (
                <VerticalTimelineElement
                  key={index}
                  date={event.date}
                  iconStyle={{
                    background: 'rgb(33, 150, 243)',
                    color: '#fff',
                  }}
                  contentStyle={{
                    background: '#f0f4f8',
                    color: '#333',
                  }}
                  contentArrowStyle={{
                    borderRight: '7px solid  #f0f4f8',
                  }}
                >
                  <h3 className="vertical-timeline-element-title">
                    {event.title}
                  </h3>
                  <p>{event.description}</p>
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-64 object-cover rounded-lg mt-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/generic-travel.jpg';
                      }}
                    />
                  )}
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
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