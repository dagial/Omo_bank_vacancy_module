import axios from "axios";

export const CreateProfileAPI = async (profile) => {
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      'Authorization': `JWT ${localStorage.getItem('access')}`
    },
  };
  return await axios.post(`${process.env.REACT_APP_API_URL}/omo_bank/user/register/`, profile, config);
};

export const DetailGetAPI = async (id) => {
  const config = {
    headers: {
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  }
  return await axios.get(`${process.env.REACT_APP_API_URL}/omo_bank/user/edit/${id}`, config);
};
export const DetailPatchAPI= async (id,data)=>{
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      'Authorization': `JWT ${localStorage.getItem('access')}`
    },
  };
  return await axios.patch(`${process.env.REACT_APP_API_URL}/omo_bank/user/edit/${id}`, data, config)
}
export const DetailDeleteAPI=async(id,data)=>{
  const config = {
    headers: {
      "Content-type": "multipart/form-data",
      "Authorization": `JWT ${localStorage.getItem('access')}`
    },
  };

  return await axios.delete(`${process.env.REACT_APP_API_URL}/omo_bank/user/edit/${id}`, data, config)
}