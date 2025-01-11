import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const create = (newNote) => {
  return axios.post(baseUrl, newNote).then((res) => res.data);
};

const update = (id, changedNote) => {
  return axios.put(`${baseUrl}/${id}`, changedNote).then((res) => res.data);
};

export default { getAll, create, update };
