// components/TravelBlog.tsx
"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // Importa dynamic para cargar componentes condicionalmente
import Header from './Header';
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

// Carga condicional del mapa solo en el lado del cliente
const InteractiveMap = dynamic(() => import('./InteractiveMap'), { ssr: false });

// Obtener las opciones de países utilizando 'react-select-country-list'
const countryOptions = countryList().getData();

// Tipos y datos
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

// Array de trips con todos los destinos
const trips: Trip[] = [
  {
    id: 1,
    destination: 'Barcelona',
    date: 'abril 2022',
    description: 'Visita a Barcelona con sus famosas atracciones y gastronomía.',
    image: '/images/barcelona_ejemplo.jpg',
    driveLink: 'https://example.com/barcelona',
    location: [41.3851, 2.1734],
    placesVisited: ['Sagrada Familia', 'Parc Güell', 'Casa Batlló'],
    activities: ['Cultura', 'Gastronomía', 'Compras'],
    cuisine: 'Tapas y paella',
    accommodation: 'Hotel céntrico en la Rambla',
    tips: 'Llevar calzado cómodo y reservar entradas con antelación.',
    duration: 5,
    timelineEvents: [
      {
        date: '2022-04-10',
        title: 'Llegada a Barcelona',
        description: 'Check-in en el hotel y paseo por la Rambla.',
        image: '/images/barcelona_ejemplo.jpg',
      },
    ],
  },
  {
    id: 2,
    destination: 'Portugal',
    date: 'agosto 2022',
    description: 'Tour por las ciudades más emblemáticas de Portugal.',
    image: '/images/portugal.jpg',
    driveLink: 'https://example.com/portugal',
    location: [38.7223, -9.1393],
    placesVisited: ['Lisboa', 'Oporto', 'Sintra'],
    activities: ['Visitas guiadas', 'Degustación de vinos'],
    cuisine: 'Bacalao y pasteis de nata',
    accommodation: 'Apartamentos en el centro de Lisboa',
    tips: 'Explorar la ciudad a pie y visitar los miradores.',
    duration: 7,
    timelineEvents: [],
  },
  {
    id: 3,
    destination: 'Bélgica',
    date: 'diciembre 2022',
    description: 'Navidades en Bélgica con su magia y mercados navideños.',
    image: '/images/belgica.jpg',
    driveLink: 'https://example.com/belgica',
    location: [50.8503, 4.3517],
    placesVisited: ['Bruselas', 'Brujas', 'Gante'],
    activities: ['Mercados navideños', 'Chocolate', 'Historia'],
    cuisine: 'Chocolate y gofres',
    accommodation: 'Hotel en el centro de Bruselas',
    tips: 'Probar los gofres en las calles y disfrutar del chocolate.',
    duration: 4,
    timelineEvents: [],
  },
  {
    id: 4,
    destination: 'Tailandia',
    date: 'octubre 2023',
    description: 'Exploración de Tailandia, sus templos y playas.',
    image: '/images/tailandia.jpg',
    driveLink: 'https://example.com/tailandia',
    location: [13.7563, 100.5018],
    placesVisited: ['Bangkok', 'Chiang Mai', 'Phuket'],
    activities: ['Templos', 'Playas', 'Mercados'],
    cuisine: 'Pad Thai y curry',
    accommodation: 'Resort en la playa',
    tips: 'Negociar precios en los mercados y probar la comida callejera.',
    duration: 10,
    timelineEvents: [],
  },
  {
    id: 5,
    destination: 'Italia',
    date: 'febrero 2024',
    description: 'Viaje por las ciudades históricas de Italia.',
    image: '/images/italia.jpg',
    driveLink: 'https://example.com/italia',
    location: [41.9028, 12.4964],
    placesVisited: ['Roma', 'Florencia', 'Venecia'],
    activities: ['Cultura', 'Museos', 'Gastronomía'],
    cuisine: 'Pizza y pasta',
    accommodation: 'Hotel cerca del Coliseo',
    tips: 'Reservar entradas a los museos con antelación.',
    duration: 8,
    timelineEvents: [],
  },
  {
    id: 6,
    destination: 'Menorca',
    date: 'febrero 2024',
    description: 'Descanso en las playas tranquilas de Menorca.',
    image: '/images/menorca.jpg',
    driveLink: 'https://example.com/menorca',
    location: [39.9496, 4.1104],
    placesVisited: ['Cala Macarella', 'Mahon'],
    activities: ['Playas', 'Senderismo'],
    cuisine: 'Queso de Mahón',
    accommodation: 'Villa cerca de la playa',
    tips: 'Alquilar un coche para explorar la isla.',
    duration: 5,
    timelineEvents: [],
  },
  {
    id: 7,
    destination: 'Mallorca',
    date: 'septiembre 2024',
    description: 'Viaje a Mallorca para disfrutar de sus paisajes y cultura.',
    image: '/images/mallorca.jpg',
    driveLink: 'https://example.com/mallorca',
    location: [39.6953, 3.0176],
    placesVisited: ['Palma', 'Sóller', 'Cabo de Formentor'],
    activities: ['Cultura', 'Playas', 'Excursiones'],
    cuisine: 'Ensaimadas y sobrasada',
    accommodation: 'Hotel con vistas al mar',
    tips: 'Visitar el mercado de Palma para probar productos locales.',
    duration: 7,
    timelineEvents: [],
  },
  {
    id: 8,
    destination: 'Japón',
    date: 'octubre 2024',
    description: 'Exploración de la cultura y la tecnología de Japón.',
    image: '/images/japon.jpg',
    driveLink: 'https://example.com/japon',
    location: [35.6762, 139.6503],
    placesVisited: ['Tokio', 'Kioto', 'Osaka'],
    activities: ['Templos', 'Tecnología', 'Gastronomía'],
    cuisine: 'Sushi y ramen',
    accommodation: 'Hotel en Shibuya',
    tips: 'Utilizar el JR Pass para moverse entre ciudades.',
    duration: 12,
    timelineEvents: [],
  },
];

const TravelBlogEnhanced: React.FC = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip>(trips[0]);
  const [wishlist, setWishlist] = useState<WishlistDestination[]>([]);
  const [newDestination, setNewDestination] = useState<DestinationOption | null>(null);
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
    const countriesVisited = trips.map((trip) => trip.destination);
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

    const activitiesCount: { [key: string]: number } = {};
    trips.forEach((trip) => {
      trip.activities.forEach((activity) => {
        activitiesCount[activity] = (activitiesCount[activity] || 0) + 1;
      });
    });

    const totalDaysTraveled = trips.reduce((acc, trip) => acc + trip.duration, 0);

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
          image: '/images/generic-travel.jpg',
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
      <Header />
      <InteractiveMap trips={trips} /> {/* Cargado condicionalmente solo en el cliente */}
      <PhotoGallery trips={trips} onSlideChange={handleSlideChange} />
      <TripDetails trip={selectedTrip} />
      <TravelStatistics statistics={tripStatistics} trips={trips} />
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
      <Footer />
    </div>
  );
};

export default TravelBlogEnhanced;