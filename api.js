import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:5001",
});

export const fetchUsers = async () => {
  return api
    .get("users")
    .then((response) => response.data)
    .catch((err) => console.log("Error fetching users", err));
};

export const fetchProfessions = async () => {
  return api
    .get("professions")
    .then((response) => response.data)
    .catch((err) => console.log("Error fetching professions", err));
};
export const addUser = async (name, age, occupationId) => {
  return api
    .post("users", {
      name,
      age,
      occupationId,
      status: true
    })
    .then((response) => {
      response.data;
      console.log("User added!");
    })
    .catch((err) => console.log("Error adding user", err));
};

export const deleteUser = async (id) => {
  return api
    .delete(`users/${id}`)
    .then((response) => response.data)
    .catch((err) => console.log("Error deleting", err));
};
export const editUser = async (id, name, age, occupationId) => {
  return api
    .patch(`users/${id}`, {
      name,
      age,
      occupationId
    })
    .then((response) => response.data)
    .catch((err) => console.log("Error editing user", err));
};

export const editStatus = async(id, status)=>{
  return api.patch(`users/${id}`, {
    status
  })
  .then(response=>response.data)
  .catch(err=>console.log("Error editing status", err))
}