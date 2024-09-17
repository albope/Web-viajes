// components/TravelBlogEnhanced.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import InteractiveMap from './InteractiveMap';
import PhotoGallery from './PhotoGallery';
import TripDetails from './TripDetails';
import TravelStatistics from './TravelStatistics';
import Wishlist from './Wishlist';
import Footer from './Footer';
import countryList from 'react-select-country-list';

// Registrar Chart.js manualmente (ya está hecho en los componentes individuales)
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  ArcElement
);

// Types
type TimelineEvent = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

type Trip = {
  id: number;
  destination: string;
  date: string;
  description: string;
  image: string;
  driveLink: string;
  location: [number, number];
  placesVisited: string[];
  activities: string[];
  cuisine: string;
  accommodation: string;
  tips: string;
  duration: number;
  timelineEvents: TimelineEvent[];
};

type DestinationOption = {
  value: string;
  label: string;
};

type WishlistDestination = {
  id: number;
  name: string;
  value: string;
  planned: boolean;
  date: Date;
  image?: string;
};

// Array de trips con todos los destinos
const trips: Trip[] = [
  // ... [Aquí va el array de trips que ya has definido anteriormente]
  // Asegúrate de que todas las imágenes existen en /public/images
];

// Usar 'react-select-country-list' para opciones de países
const countryOptions = countryList().getData();

const TravelBlogEnhanced: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip>(trips[0]);
  const [wishlist, setWishlist] = useState<WishlistDestination[]>([]);
  const [newDestination, setNewDestination] = useState<DestinationOption | null>(
    null
  );
  const [plannedDate, setPlannedDate] = useState<Date | null>(null);

  const [tripStatistics, setTripStatistics] = useState<{
    totalCountriesVisited: number;
    totalDaysTraveled: number;
    countriesPerYearData: { year: string; countries: number }[];
    activitiesCount: { [key: string]: number };
  }>({
    totalCountriesVisited: 0,
    totalDaysTraveled: 0,
    countriesPerYearData: [],
    activitiesCount: {},
  });

  useEffect(() => {
    calculateTripStatistics();
  }, []);

  const calculateTripStatistics = () => {
    // Número de Países Visitados
    const countriesVisited = trips.map((trip) => trip.destination);

    // Países Visitados Por Año
    const countriesPerYear: { [key: string]: Set<string> } = {};
    trips.forEach((trip) => {
      const year = trip.date.match(/\d{4}/)?.[0];
      if (year) {
        countriesPerYear[year] = countriesPerYear[year] || new Set();
        countriesPerYear[year].add(trip.destination);
      }
    });

    const countriesPerYearData = Object.keys(countriesPerYear).map((year) => ({
      year,
      countries: countriesPerYear[year].size,
    }));

    // Tipos de Actividades Más Realizadas
    const activitiesCount: { [key: string]: number } = {};
    trips.forEach((trip) => {
      trip.activities.forEach((activity) => {
        activitiesCount[activity] = (activitiesCount[activity] || 0) + 1;
      });
    });

    // Tiempo Total de Viaje
    const totalDaysTraveled = trips.reduce(
      (acc, trip) => acc + trip.duration,
      0
    );

    setTripStatistics({
      totalCountriesVisited: new Set(countriesVisited).size,
      totalDaysTraveled,
      countriesPerYearData,
      activitiesCount,
    });
  };

  const handleSlideChange = (index: number) => {
    setSelectedTrip(trips[index]);
  };

  const handleAddDestination = () => {
    if (newDestination && plannedDate) {
      setWishlist([
        ...wishlist,
        {
          id: wishlist.length + 1,
          name: newDestination.label,
          value: newDestination.value,
          planned: true,
          date: plannedDate,
          image: '/images/generic-travel.jpg', // Usa una imagen genérica o específica si está disponible
        },
      ]);
      setNewDestination(null);
      setPlannedDate(null);
    }
  };

  const handleRemoveDestination = (id: number) => {
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Mapa Interactivo */}
      <InteractiveMap trips={trips} />

      {/* Galería de Fotos */}
      <PhotoGallery trips={trips} onSlideChange={handleSlideChange} />

      {/* Detalles del Viaje con Línea de Tiempo Interactiva */}
      <TripDetails trip={selectedTrip} />

      {/* Dashboard de Estadísticas de Viajes */}
      <TravelStatistics statistics={tripStatistics} trips={trips} />

      {/* Lista de Deseos */}
      <Wishlist
        wishlist={wishlist}
        countryOptions={countryOptions}
        newDestination={newDestination}
        setNewDestination={setNewDestination}
        plannedDate={plannedDate}
        setPlannedDate={setPlannedDate}
        handleAddDestination={handleAddDestination}
        handleRemoveDestination={handleRemoveDestination}
      />

      {/* Pie de Página */}
      <Footer />
    </div>
  );
};

export default TravelBlogEnhanced;