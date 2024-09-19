import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";
import { useFetch } from "../hooks/useFecth.js";
async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces); // Resolve with sorted places
      },
      (error) => {
        resolve([]); // Resolve with empty array on error
      }
    );
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetch(fetchSortedPlaces, []);
  if (error) {
    return <Error title={"An error occurred"} message={error.message} />;
  }
  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText={"Fetching places data..."}
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
