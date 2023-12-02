export async function getHotels({
  destId,
  destType,
  roomCount,
  checkInDate,
  sortBy,
  guestCount,
  checkOutDate,
  filters,
  activePage,
}) {
  const url = process.env.REACT_APP_BOOKINGCOM_URL + "search";
  const params = new URLSearchParams({
    dest_id: destId,
    dest_type: destType,
    room_number: roomCount,
    checkin_date: checkInDate,
    order_by: sortBy || "popularity",
    adults_number: guestCount,
    checkout_date: checkOutDate,
    categories_filter_ids: filters.length > 0 ? filters.join(",") : null,
    page_number: activePage,
    units: "metric",
    locale: "en-gb",
    filter_by_currency: "USD",
    include_adjacency: "true",
  });
  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_BOOKINGCOM_KEY,
        "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
      },
    });
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      return null;
    }
  } catch (error) {}
}
