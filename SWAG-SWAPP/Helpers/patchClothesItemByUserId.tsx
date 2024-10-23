import axios from "axios";

export const patchClothesItemByUserId = (user_id, item_id, newDetails) => {
  const url = `https://be-swagswapp.onrender.com/api/clothes/${user_id}/${item_id}`;
  return axios
    .get(url, newDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
