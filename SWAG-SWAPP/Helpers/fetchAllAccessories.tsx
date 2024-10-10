export const fetchAllAccessories = (user_id) => {
  const url = `https://be-swagswapp.onrender.com/api/clothes/${user_id}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data.filter((item) => item.top_category === "accessories");
    });
};
