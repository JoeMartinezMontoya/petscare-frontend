'use client';
import { useEffect, useState } from 'react';
import { Map, Marker } from 'pigeon-maps';

const MAPTILER_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAP_TILER_API_KEY;
// const MAP_ID = 'streets-v2';
const MAP_ID = 'landscape';
// const MAP_ID = 'basic-v2';

function mapTiler(x, y, z, dpr) {
  return `https://api.maptiler.com/maps/${MAP_ID}/256/${z}/${x}/${y}${
    dpr >= 2 ? '@2x' : ''
  }.png?key=${MAPTILER_ACCESS_TOKEN}`;
}

export default function MapComponent({ latitude, longitude, petName }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) return <p>Chargement de la carte...</p>;

  const position =
    latitude && longitude ? [latitude, longitude] : [45.75, 4.85];

  return (
    <div className='map-container'>
      <Map
        provider={mapTiler}
        dprs={[1, 2]}
        height={400}
        defaultCenter={position}
        defaultZoom={16}>
        <Marker width={50} anchor={position} />
      </Map>
    </div>
  );
}
