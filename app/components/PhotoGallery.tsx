// components/PhotoGallery.tsx
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from './button';

type Trip = {
  id: number;
  destination: string;
  date: string;
  image: string;
  driveLink: string;
};

type PhotoGalleryProps = {
  trips: Trip[];
  onSlideChange: (index: number) => void;
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ trips, onSlideChange }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Nuestros recuerdos viajeros</h2>
        <Carousel
          className="w-full max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg"
          onSlideChange={onSlideChange}
        >
          <CarouselContent>
            {trips.map((trip) => (
              <CarouselItem key={trip.id}>
                <Card>
                  <CardContent className="p-0 relative">
                    <a
                      href={trip.driveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={trip.image}
                        alt={trip.destination}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
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
  );
};

export default PhotoGallery;
