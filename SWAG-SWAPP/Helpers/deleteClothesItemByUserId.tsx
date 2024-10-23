import axios from "axios";

export const deleteClothesByUserId = (user_id, item_id) => {
  const url = `https://be-swagswapp.onrender.com/api/clothes/${user_id}/${item_id}`;
  return axios
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
