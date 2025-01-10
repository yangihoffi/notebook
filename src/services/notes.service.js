import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newNote) => {
  return axios.post(baseUrl, newNote);
};

const update = (id, changedNote) => {
  return axios.put(`${baseUrl}/${id}`, changedNote);
};

export default { getAll, create, update };
