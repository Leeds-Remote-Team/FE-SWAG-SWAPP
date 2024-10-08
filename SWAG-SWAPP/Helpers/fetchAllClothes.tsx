import axios from 'axios';

export const fetchAllClothes = (user_id) => {
  const url = `https://swagswapp-api.onrender.com/api/clothes/${user_id}`;

  return axios
    .get(url)
    .then((response) => {
      return response.data;  
    })
    .catch((error) => {
      console.log(error)
    });
};