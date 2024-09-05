"use client"; // Esto convierte el componente en un Client Component
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button'; // Ajustar la ruta dependiendo de la ubicación del archivo
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { Facebook, Instagram, Twitter } from "lucide-react"
import { CornerDownLeft } from 'lucide-react'

// Datos actualizados de los viajes
const trips = [
  {
    id: 1,
    destination: 'Barcelona',
    date: 'abril 2022',
    description: 'Un fin de semana largo en la vibrante capital catalana.',
    image: '/images/barcelona.jpg',
    location: [41.3851, 2.1734],
    driveLink: 'https://drive.google.com/drive/folders/your-barcelona-folder-id',
    placesVisited: ['Sagrada Familia', 'Parque Güell', 'Las Ramblas'],
    activities: ['Tour arquitectónico de Gaudí', 'Paseo por el Barrio Gótico', 'Visita al Camp Nou'],
    cuisine: 'Disfrutamos de tapas variadas y una auténtica paella en la Barceloneta.',
    accommodation: 'Nos alojamos en un apartamento acogedor en el barrio del Eixample.',
    tips: 'Compra las entradas para la Sagrada Familia con antelación para evitar largas colas.'
  },
  {
    id: 2,
    destination: 'Portugal',
    date: 'agosto 2022',
    description: 'Explorando las hermosas costas y la rica historia de Portugal.',
    image: '/images/portugal.jpg',
    location: [39.3999, -8.2245],
    driveLink: 'https://drive.google.com/drive/folders/your-portugal-folder-id',
    placesVisited: ['Lisboa', 'Oporto', 'Algarve'],
    activities: ['Recorrido en tranvía por Lisboa', 'Cata de vinos en Oporto', 'Playa en el Algarve'],
    cuisine: 'Probamos el bacalao a bras y los deliciosos pasteles de nata.',
    accommodation: 'Alternamos entre hoteles boutique y casas rurales tradicionales.',
    tips: 'No te pierdas el fado en vivo en los bares de Lisboa por la noche.'
  },
  {
    id: 3,
    destination: 'Bélgica',
    date: 'diciembre 2022',
    description: 'Disfrutando de la arquitectura medieval y la deliciosa cerveza belga.',
    image: '/images/belgica.jpg',
    location: [50.5039, 4.4699],
    driveLink: 'https://drive.google.com/drive/folders/your-belgium-folder-id',
    placesVisited: ['Bruselas', 'Brujas', 'Gante'],
    activities: ['Visita al Atomium', 'Paseo en bote por los canales de Brujas', 'Tour de cervezas'],
    cuisine: 'Degustamos waffles, chocolates y una variedad de cervezas artesanales.',
    accommodation: 'Nos hospedamos en un hotel histórico en el centro de Bruselas.',
    tips: 'Compra un pase de tren para moverte fácilmente entre las ciudades belgas.'
  },
  {
    id: 4,
    destination: 'Tailandia',
    date: 'octubre 2023',
    description: 'Aventuras en el sudeste asiático, entre templos y playas paradisíacas.',
    image: '/images/tailandia.jpg',
    location: [15.8700, 100.9925],
    driveLink: 'https://drive.google.com/drive/folders/your-thailand-folder-id',
    placesVisited: ['Bangkok', 'Chiang Mai', 'Islas Phi Phi'],
    activities: ['Visita al Gran Palacio', 'Santuario de elefantes en Chiang Mai', 'Snorkel en Phi Phi'],
    cuisine: 'Nos deleitamos con pad thai callejero y curry verde auténtico.',
    accommodation: 'Alternamos entre hoteles de lujo y bungalows en la playa.',
    tips: 'Lleva ropa adecuada para visitar los templos y respeta las costumbres locales.'
  },
  {
    id: 5,
    destination: 'Italia',
    date: 'febrero 2024',
    description: 'Un viaje culinario y cultural por las ciudades italianas.',
    image: '/images/italia.jpg',
    location: [41.8719, 12.5674],
    driveLink: 'https://drive.google.com/drive/folders/your-italy-folder-id',
    placesVisited: ['Roma', 'Florencia', 'Venecia'],
    activities: ['Tour por el Coliseo', 'Visita a la Galería Uffizi', 'Paseo en góndola'],
    cuisine: 'Probamos auténtica pasta casera, pizza napolitana y gelato artesanal.',
    accommodation: 'Nos alojamos en pequeños hoteles familiares en el centro de cada ciudad.',
    tips: 'Compra el pase Roma Pass para ahorrar en entradas y transporte público.'
  },
  {
    id: 6,
    destination: 'Menorca',
    date: 'junio 2024',
    description: 'Relajándonos en las calas cristalinas de Menorca.',
    image: '/images/menorca.jpg',
    location: [39.9499, 4.1147],
    driveLink: 'https://drive.google.com/drive/folders/your-menorca-folder-id',
    placesVisited: ['Ciutadella', 'Cala Macarella', 'Monte Toro'],
    activities: ['Kayak en calas vírgenes', 'Visita a sitios prehistóricos', 'Puesta de sol en Cova d\'en Xoroi'],
    cuisine: 'Disfrutamos de caldereta de langosta y queso de Mahón.',
    accommodation: 'Alquilamos una villa con piscina cerca de Ciutadella.',
    tips: 'Alquila un coche para explorar las calas más remotas y hermosas de la isla.'
  },
  {
    id: 7,
    destination: 'Mallorca',
    date: 'septiembre 2024',
    description: 'Explorando la mayor de las Islas Baleares y sus encantos.',
    image: '/images/mallorca.jpg',
    location: [39.6953, 3.0176],
    driveLink: 'https://drive.google.com/drive/folders/your-mallorca-folder-id',
    placesVisited: ['Palma de Mallorca', 'Cala d\'Or', 'Serra de Tramuntana'],
    activities: ['Visita a la Catedral de Palma', 'Paseo en barco por las calas', 'Senderismo en la Serra'],
    cuisine: 'Degustamos la auténtica ensaimada mallorquina y probamos el delicioso tumbet.',
    accommodation: 'Nos alojamos en un encantador agroturismo en el centro de la isla.',
    tips: 'Recomendamos alquilar un coche para explorar la isla con libertad y visitar las calas menos concurridas.'
  },
  {
    id: 8,
    destination: 'Japón',
    date: 'octubre 2024',
    description: 'Descubriendo la fascinante mezcla de tradición y modernidad en Japón.',
    image: '/images/japon.jpg',
    location: [36.2048, 138.2529],
    driveLink: 'https://drive.google.com/drive/folders/your-japan-folder-id',
    placesVisited: ['Tokio', 'Kioto', 'Monte Fuji'],
    activities: ['Visita al Templo Senso-ji', 'Ceremonia del té en Kioto', 'Baño en onsen con vista al Monte Fuji'],
    cuisine: 'Probamos sushi fresco en el mercado de Tsukiji y ramen auténtico en Tokio.',
    accommodation: 'Experimentamos tanto hoteles cápsula modernos como ryokans tradicionales.',
    tips: 'Compra el Japan Rail Pass antes de llegar para ahorrar en transporte entre ciudades.'
  }
]

const highlights = [
  { id: 1, title: 'Cabo de Gata + Portugal', description: 'Viendo el sol ponerse sobre los coloridos palacios de Sintra, Portugal.' },
  { id: 2, title: 'Los Flandes', description: 'Probando las mejores cervezas artesanales en un pub medieval de Brujas, Bélgica.' },
  { id: 3, title: 'Barcelona', description: 'Nadando entre peces tropicales en las cristalinas aguas de Koh Phi Phi, Tailandia.' },
  { id: 4, title: 'Tailandia', description: 'Recorriendo los románticos canales de Venecia al atardecer, Italia.' },
  { id: 5, title: 'Italia', description: 'Participando en una tradicional ceremonia del té en un templo de Kioto, Japón.' },
  { id: 6, title: 'Menorca', description: 'Nadando entre peces tropicales en las cristalinas aguas de Koh Phi Phi, Tailandia.' },
  { id: 7, title: 'Mallorca', description: 'Explorando la mayor de las Islas Baleares y sus encantos.' },
  { id: 8, title: 'Japón', description: 'Caminando por las calles de Tokio, Japón.' },
]

const customIcon = new Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

function ZoomResetControl() {
  const map = useMap()
  const [showReset, setShowReset] = useState(false)
  const initialZoom = 4

  useMapEvent('zoom', () => {
    setShowReset(map.getZoom() !== initialZoom)
  })

  const handleReset = () => {
    map.setView([41.3851, 2.1734], initialZoom)
  }

  if (!showReset) return null

  return (
    <div className="leaflet-bottom leaflet-left" style={{ marginBottom: '40px' }}>
      <div className="leaflet-control leaflet-bar">
        <Button onClick={handleReset} variant="outline" size="icon" className="bg-white">
          <CornerDownLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Añade esta nueva interfaz para los destinos de la lista de deseos
interface WishlistDestination {
  id: number;
  name: string;
  planned: boolean;
  date: string;
}

export default function TravelBlogEnhanced() {
  const [selectedTrip, setSelectedTrip] = useState(trips[0])
  const [wishlist, setWishlist] = useState<WishlistDestination[]>([]);

  const [newDestination, setNewDestination] = useState('');

  const handleSlideChange = (index: number) => {
    setSelectedTrip(trips[index])
  }

  const handleWishlistChange = (id: number, field: 'planned' | 'date', value: boolean | string) => {
    setWishlist(wishlist.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  }

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDestination.trim() !== '') {
      setWishlist([
        ...wishlist,
        {
          id: wishlist.length + 1,
          name: newDestination.trim(),
          planned: false,
          date: ''
        }
      ]);
      setNewDestination('');
    }
  }

  const handleRemoveDestination = (id: number) => {
    setWishlist(wishlist.filter(item => item.id !== id));
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

      {/* Mapa interactivo */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Mapa de Nuestros Viajes</h2>
          <Card>
            <CardContent className="p-0">
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer center={[41.3851, 2.1734]} zoom={4} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {trips.map((trip) => (
                    <Marker key={trip.id} position={trip.location as [number, number]} icon={customIcon}>
                      <Popup>{trip.destination}</Popup>
                    </Marker>
                  ))}
                  <ZoomControl position="bottomright" />
                  <ZoomResetControl />
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
                    <CardContent className="p-0 relative">
                      <a href={trip.driveLink} target="_blank" rel="noopener noreferrer">
                        <img src={trip.image} alt={trip.destination} className="w-full h-64 object-cover rounded-t-lg" />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <Button variant="secondary">
                            Ver álbum en Google Drive
                          </Button>
                        </div>
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
              <p className="mb-4">{selectedTrip.description}</p>
              <h3 className="font-semibold mt-4">Lugares visitados:</h3>
              <ul className="list-disc list-inside mb-2">
                {selectedTrip.placesVisited.map((place, index) => (
                  <li key={index}>{place}</li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4">Actividades:</h3>
              <ul className="list-disc list-inside mb-2">
                {selectedTrip.activities.map((activity, index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
              <h3 className="font-semibold mt-4">Gastronomía:</h3>
              <p>{selectedTrip.cuisine}</p>
              <h3 className="font-semibold mt-4">Alojamiento:</h3>
              <p>{selectedTrip.accommodation}</p>
              <h3 className="font-semibold mt-4">Consejos:</h3>
              <p>{selectedTrip.tips}</p>
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

      {/* Nueva sección: Lista de Deseos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Nuestra Lista de Deseos</h2>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Próximos Destinos</h3>
            <p className="mb-4">Selecciona los lugares que quieres visitar y cuándo planeas hacerlo</p>
            
            {/* Formulario para añadir nuevo destino */}
            <form onSubmit={handleAddDestination} className="mb-6">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="Nuevo destino"
                  className="form-input flex-grow px-2 py-1 border rounded"
                />
                <button type="submit" className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Añadir
                </button>
              </div>
            </form>

            {/* Lista de destinos */}
            {wishlist.map((destination) => (
              <div key={destination.id} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
                <div className="flex items-center space-x-2 flex-grow">
                  <input
                    type="checkbox"
                    id={`destination-${destination.id}`}
                    checked={destination.planned}
                    onChange={(e) => handleWishlistChange(destination.id, 'planned', e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <label htmlFor={`destination-${destination.id}`} className="flex-grow">
                    {destination.name}
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="month"
                    value={destination.date}
                    onChange={(e) => handleWishlistChange(destination.id, 'date', e.target.value)}
                    className="form-input w-full sm:w-44 px-2 py-1 border rounded"
                    disabled={!destination.planned}
                  />
                  <button
                    onClick={() => handleRemoveDestination(destination.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
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
          <p className="text-center mt-4 text-sm text-muted-foreground">&copy; 2024 Alberto & Carmen. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
