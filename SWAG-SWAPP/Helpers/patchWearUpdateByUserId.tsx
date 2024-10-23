import axios from "axios";

export const patchWearUpdateByUserId = (user_id, item_id, newWearUpdate) => {
  const url = `https://be-swagswapp.onrender.com/api/clothes/${user_id}/${item_id}`;
  return axios
    .get(url, newWearUpdate)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
