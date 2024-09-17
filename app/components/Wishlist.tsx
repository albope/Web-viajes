// components/Wishlist.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { Button } from './button';
import Countdown from 'react-countdown';

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

type WishlistProps = {
  wishlist: WishlistDestination[];
  countryOptions: DestinationOption[];
  newDestination: DestinationOption | null;
  setNewDestination: React.Dispatch<React.SetStateAction<DestinationOption | null>>;
  plannedDate: Date | null;
  setPlannedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  handleAddDestination: () => void;
  handleRemoveDestination: (id: number) => void;
};

const Wishlist: React.FC<WishlistProps> = ({
  wishlist,
  countryOptions,
  newDestination,
  setNewDestination,
  plannedDate,
  setPlannedDate,
  handleAddDestination,
  handleRemoveDestination,
}) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: any) => {
    if (completed) {
      return <span>¡Es hora de viajar!</span>;
    } else {
      return (
        <span>
          {days} días {hours} horas {minutes} minutos {seconds} segundos
        </span>
      );
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">Nuestra Lista de Deseos</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Próximos Destinos</h3>
          <p className="mb-4">
            Selecciona los lugares que quieres visitar y cuándo planeas hacerlo
          </p>

          {/* Formulario para añadir nuevo destino */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Select
                value={newDestination}
                onChange={setNewDestination}
                options={countryOptions}
                className="flex-grow"
                placeholder="Selecciona un destino"
              />
              <DatePicker
                selected={plannedDate}
                onChange={(date) => setPlannedDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="Selecciona mes y año"
                minDate={new Date()}
                className="form-input w-full sm:w-44 px-2 py-1 border rounded"
              />
              <button
                onClick={handleAddDestination}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Añadir
              </button>
            </div>
          </div>

          {/* Tarjetas de la Lista de Deseos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlist.map((destination) => (
              <div
                key={destination.id}
                className="bg-gray-100 p-4 rounded-lg relative"
              >
                <button
                  onClick={() => handleRemoveDestination(destination.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  aria-label={`Eliminar ${destination.name}`}
                >
                  &times;
                </button>
                {destination.image && (
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/generic-travel.jpg';
                    }}
                  />
                )}
                <h4 className="text-lg font-semibold mb-2">
                  {destination.name}
                </h4>
                {destination.date && (
                  <p className="mb-2">
                    Fecha planificada:{' '}
                    {destination.date.toLocaleDateString('es-ES', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
                {destination.date && (
                  <div>
                    <p className="mb-1">Cuenta atrás:</p>
                    <Countdown date={destination.date} renderer={renderer} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;