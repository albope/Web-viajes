// components/TravelStatistics.tsx
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import Select from 'react-select';

type Statistics = {
  totalCountriesVisited: number;
  totalDaysTraveled: number;
  countriesPerYearData: { year: string; countries: number }[];
  activitiesCount: { [key: string]: number };
};

type Trip = {
  destination: string;
  date: string;
  placesVisited: string[];
};

type TravelStatisticsProps = {
  statistics: Statistics;
  trips: Trip[];
};

const TravelStatistics: React.FC<TravelStatisticsProps> = ({ statistics, trips }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const years = statistics.countriesPerYearData.map((data) => ({
    value: data.year,
    label: data.year,
  }));

  const filteredTrips = selectedYear
    ? trips.filter((trip) => trip.date.includes(selectedYear))
    : [];

  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-6">
          Estadísticas de Viajes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gráfica de Barras: Número de Destinos Visitados por Año */}
          <Card>
            <CardHeader>
              <CardTitle>Número de Destinos Visitados por Año</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Bar
                  data={{
                    labels: statistics.countriesPerYearData.map(
                      (data) => data.year
                    ),
                    datasets: [
                      {
                        label: 'Destinos Visitados',
                        data: statistics.countriesPerYearData.map(
                          (data) => data.countries
                        ),
                        backgroundColor: 'rgba(75,192,192,0.6)',
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Destinos Visitados por Año',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0, // Asegura números enteros
                        },
                        title: {
                          display: true,
                          text: 'Cantidad de Destinos',
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Año',
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Gráfica de Barras Horizontales: Tipos de Actividades Más Realizadas */}
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Actividades Más Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div style={{ height: '300px' }}>
                <Bar
                  data={{
                    labels: Object.keys(statistics.activitiesCount),
                    datasets: [
                      {
                        label: 'Actividades',
                        data: Object.values(statistics.activitiesCount),
                        backgroundColor: 'rgba(153,102,255,0.6)',
                      },
                    ],
                  }}
                  options={{
                    indexAxis: 'y', // Barras horizontales
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Actividades Más Realizadas',
                      },
                    },
                    scales: {
                      x: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0, // Asegura números enteros
                        },
                        title: {
                          display: true,
                          text: 'Cantidad',
                        },
                      },
                      y: {
                        title: {
                          display: true,
                          text: 'Actividades',
                        },
                      },
                    },
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Nueva Tarjeta: Países y Ciudades Visitadas por Año */}
          <Card>
            <CardHeader>
              <CardTitle>Países y Ciudades Visitadas por Año</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                options={years}
                onChange={(option) => setSelectedYear(option ? option.value : null)}
                placeholder="Selecciona un año"
                isClearable
                className="mb-4"
              />
              {selectedYear ? (
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Destinos en {selectedYear}
                  </h3>
                  <ul className="list-disc list-inside">
                    {filteredTrips.map((trip, index) => (
                      <li key={index}>
                        <strong>{trip.destination}</strong>
                        <ul className="list-disc list-inside ml-5">
                          {trip.placesVisited.map((city, idx) => (
                            <li key={idx}>{city}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                  {filteredTrips.length === 0 && (
                    <p>No hay destinos registrados para este año.</p>
                  )}
                </div>
              ) : (
                <p>Selecciona un año para ver los destinos visitados.</p>
              )}
            </CardContent>
          </Card>

          {/* Tiempo Total de Viaje */}
          <Card>
            <CardHeader>
              <CardTitle>Tiempo Total de Viaje</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {statistics.totalDaysTraveled} días
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TravelStatistics;