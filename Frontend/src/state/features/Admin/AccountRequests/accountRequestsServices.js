import axios from "axios";

const API_URL = "https://e-banking-backend.onrender.com/api/request/";

const CREATE_ACCOUNT_API_URL = "https://e-banking-backend.onrender.com/api/account/create";

//Get All Account Requests
const getAllAccountRequests = async (adminData) => {
  const res = await axios.get(API_URL, {
    headers: {
      authorization: `Bearer ${adminData.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Decline Account Request
const declineAccountRequest = async (payload) => {
  const res = await axios.delete(API_URL + payload.id, {
    headers: {
      authorization: `Bearer ${payload.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Approve Account Request (create account)
const ApproveAccountRequest = async (payload) => {
  const res = await axios.post(CREATE_ACCOUNT_API_URL, payload, {
    headers: {
      authorization: `Bearer ${payload.token}`,
    },
  });
  const data = res.data;

  return data;
};

//Logout
const adminsLogout = () => {
  return;
};

const accountRequestsServices = {
  getAllAccountRequests,
  declineAccountRequest,
  ApproveAccountRequest,
  adminsLogout,
};

export default accountRequestsServices;
