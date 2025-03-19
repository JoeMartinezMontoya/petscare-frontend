import { useState, useEffect } from 'react';
import axios from 'axios';

const OPENCAGE_API_KEY = '783e47de678145319e80341be8277c44';

export default function LocationAutocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const { data } = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            debouncedQuery
          )}&key=${OPENCAGE_API_KEY}&language=fr&limit=5`
        );

        setSuggestions(data.results);
      } catch (error) {
        console.error('Erreur API OpenCage:', error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  return (
    <div className='position-relative'>
      <input
        type='text'
        className='form-control'
        placeholder='Entrez une adresse...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className='list-group position-absolute w-100'>
          {suggestions.map((place) => (
            <li
              key={place.formatted}
              className='list-group-item list-group-item-action'
              onClick={() => {
                onSelect({
                  formatted: place.formatted,
                  geometry: {
                    lat: place.geometry.lat,
                    lng: place.geometry.lng,
                  },
                });
                setQuery(place.formatted);
                setSuggestions([]);
              }}>
              {place.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
