export const fetchSortedClothes = (sortBy, order, user_id, searchText) => {
  const url = `https://be-swagswapp.onrender.com/api/clothes/${user_id}?sortBy=${sortBy}&order=${order}&searchText=${searchText}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
};

export const fetchMostPopularClothes = (user_id, searchText = "") => {
  return fetchSortedClothes("wear_frequency", "desc", user_id, searchText);
};

export const fetchNeedsSomeLovingClothes = (user_id, searchText = "") => {
  return fetchSortedClothes("wear_frequency", "asc", user_id, searchText);
};

export const fetchRecentlyWornClothes = (user_id, searchText = "") => {
  return fetchSortedClothes("last_date_worn", "desc", user_id, searchText);
};

export const fetchNewlyAddedClothes = (user_id, searchText = "") => {
  return fetchSortedClothes("item_id", "desc", user_id, searchText);
};

export const fetchAccessories = (user_id, searchText = "") => {
  return fetchSortedClothes("wear_frequency", "desc", user_id, searchText);
};
