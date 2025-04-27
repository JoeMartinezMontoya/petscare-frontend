import { useState, useEffect } from 'react';
import axios from 'axios';

//TODO: Optimization : API error handling
const OPENCAGE_API_KEY = `${process.env.NEXT_PUBLIC_OPEN_CAGE_API_KEY}`;

export default function LocationAutocomplete({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  //? Debounce the query to prevent API spam
  useEffect(() => {
    if (isSelecting) return;

    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  //? Prevent the suggestion list from open back up when an option is selected
  useEffect(() => {
    if (!debouncedQuery || isSelecting) {
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
        onChange={(e) => {
          setIsSelecting(false);
          setQuery(e.target.value);
        }}
      />
      {suggestions.length > 0 && (
        <ul className='list-group position-absolute w-100'>
          {suggestions.map((place) => (
            <li
              key={`${place.geometry.lat}-${place.geometry.lng}`}
              className='list-group-item list-group-item-action'
              onClick={() => {
                setIsSelecting(true);
                onSelect({
                  formatted: place.formatted,
                  city:
                    place.components?.city ||
                    place.components?.town ||
                    place.components?.village ||
                    place.components?.local_administrative_area ||
                    place.components?.county ||
                    null,
                  postcode: place.components?.postcode || null,
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
