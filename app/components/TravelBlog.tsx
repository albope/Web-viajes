"use client"; // Esto convierte el componente en un Client Component
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from '../components/button'; // Ajustar la ruta dependiendo de la ubicación del archivo
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Facebook, Instagram, Twitter } from "lucide-react"

// Datos actualizados de los viajes
const trips = [
  { id: 1, destination: 'Portugal', date: 'agosto 2022', description: 'Explorando las hermosas costas y la rica historia de Portugal.', image: '/images/portugal.jpg', location: [39.3999, -8.2245], driveLink: 'https://drive.google.com/drive/folders/your-portugal-folder-id' },
  { id: 2, destination: 'Bélgica', date: 'diciembre 2022', description: 'Disfrutando de la arquitectura medieval y la deliciosa cerveza belga.', image: '/images/belgica.jpg', location: [50.5039, 4.4699], driveLink: 'https://drive.google.com/drive/folders/your-belgium-folder-id' },
  { id: 3, destination: 'Tailandia', date: 'octubre 2023', description: 'Aventuras en el sudeste asiático, entre templos y playas paradisíacas.', image: '/images/tailandia.jpg', location: [15.8700, 100.9925], driveLink: 'https://drive.google.com/drive/folders/your-thailand-folder-id' },
  { id: 4, destination: 'Italia', date: 'febrero 2024', description: 'Un viaje culinario y cultural por las ciudades italianas.', image: '/images/italia.jpg', location: [41.8719, 12.5674], driveLink: 'https://drive.google.com/drive/folders/your-italy-folder-id' },
  { id: 5, destination: 'Japón', date: 'octubre 2024', description: 'Descubriendo la fascinante mezcla de tradición y modernidad en Japón.', image: '/images/japon.jpg', location: [36.2048, 138.2529], driveLink: 'https://drive.google.com/drive/folders/your-japan-folder-id' },
  { id: 6, destination: 'Menorca', date: 'junio 2024', description: 'Relajándonos en las calas cristalinas de Menorca.', image: '/images/menorca.jpg', location: [39.9499, 4.1147], driveLink: 'https://drive.google.com/drive/folders/your-menorca-folder-id' },
  { id: 7, destination: 'Mallorca', date: 'septiembre 2024', description: 'Explorando la mayor de las Islas Baleares y sus encantos.', image: '/images/mallorca.jpg', location: [39.6953, 3.0176], driveLink: 'https://drive.google.com/drive/folders/your-mallorca-folder-id' },
  { id: 8, destination: 'Barcelona', date: 'abril 2022', description: 'Un fin de semana largo en la vibrante capital catalana.', image: '/images/barcelona.jpg', location: [41.3851, 2.1734], driveLink: 'https://drive.google.com/drive/folders/your-barcelona-folder-id' },
]

const highlights = [
  { id: 1, title: 'Atardecer en Sintra', description: 'Viendo el sol ponerse sobre los coloridos palacios de Sintra, Portugal.' },
  { id: 2, title: 'Degustación de cervezas en Brujas', description: 'Probando las mejores cervezas artesanales en un pub medieval de Brujas, Bélgica.' },
  { id: 3, title: 'Snorkel en Koh Phi Phi', description: 'Nadando entre peces tropicales en las cristalinas aguas de Koh Phi Phi, Tailandia.' },
  { id: 4, title: 'Paseo en góndola en Venecia', description: 'Recorriendo los románticos canales de Venecia al atardecer, Italia.' },
  { id: 5, title: 'Ceremonia del té en Kioto', description: 'Participando en una tradicional ceremonia del té en un templo de Kioto, Japón.' },
]

const customIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

export default function TravelBlogEnhanced() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0])

  const handleSlideChange = (index: number) => {
    setSelectedTrip(trips[index])
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Encabezado */}
      <header className="py-8 bg-black text-white">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Nuestros viajecitos</h1>
          <img src="/images/profile.jpg" alt="Foto de la pareja" className="rounded-full w-16 h-16 object-cover" />
        </div>
      </header>

      {/* Mapa interactivo (ahora antes de la galería) */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Mapa de Nuestros Viajes</h2>
          <Card>
            <CardContent className="p-0">
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer center={[41.3851, 2.1734]} zoom={4} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {trips.map((trip) => (
                    <Marker key={trip.id} position={trip.location as [number, number]} icon={customIcon}>
                      <Popup>{trip.destination}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Galería de fotos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Nuestros recuerdos viajeros</h2>
          <Carousel 
            className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
            onSlideChange={handleSlideChange}
          >
            <CarouselContent>
              {trips.map((trip) => (
                <CarouselItem key={trip.id}>
                  <Card>
                    <CardContent className="p-0">
                      <a href={trip.driveLink} target="_blank" rel="noopener noreferrer">
                        <img src={trip.image} alt={trip.destination} className="w-full h-64 object-cover rounded-t-lg" />
                      </a>
                    </CardContent>
                    <CardHeader>
                      <CardTitle>{trip.destination}</CardTitle>
                      <CardDescription>{trip.date}</CardDescription>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Detalles del viaje */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Detalles del Viaje</h2>
          <Card>
            <CardHeader>
              <CardTitle>{selectedTrip.destination}</CardTitle>
              <CardDescription>{selectedTrip.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{selectedTrip.description}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nueva sección: Momentos Destacados */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Momentos Destacados</h2>
          <Accordion type="single" collapsible className="w-full">
            {highlights.map((highlight) => (
              <AccordionItem key={highlight.id} value={`item-${highlight.id}`}>
                <AccordionTrigger>{highlight.title}</AccordionTrigger>
                <AccordionContent>
                  {highlight.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-center mt-4 text-sm text-muted-foreground">&copy; 2023 Nuestras Aventuras. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
