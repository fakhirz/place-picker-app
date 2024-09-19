const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function fetchAvailablePlaces() {
  const response = await fetch(`${BASE_URL}/places`);
  const resData = await response.json();
  if (!response.ok) {
    throw Error("Failed to fetch places!");
  }
  return resData.places;
}
export async function fetchUserPlaces() {
  const response = await fetch(`${BASE_URL}/user-places`);
  const resData = await response.json();
  if (!response.ok) {
    throw Error("Failed to fetch User places!");
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch(`${BASE_URL}/user-places`, {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resData = await response.json();
  if (!response.ok) {
    throw Error("Failed to update user data.");
  }
  return resData.message;
}
