export async function getDestinations(keyword) {
  try {
    const response = await fetch(
      process.env.REACT_APP_BOOKINGCOM_URL +
        "locations?name=" +
        keyword +
        "&locale=en-gb",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_BOOKINGCOM_KEY,
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      }
    );
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      alert("An error has occurred. Please try again later!");
      return null;
    }
  } catch (error) {}
}
