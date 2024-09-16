import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isLoading, setIsLoading] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    setIsLoading(true);
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places.");
        }
        setAvailablePlaces(data.places);
      } catch (error) {
        setError({ message: error.message || "An unknown error occurred." });
      }

      setIsLoading(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return (
      <ErrorMessage title="Failed to fetch places" message={error.message} />
    );
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText="Loading places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
