import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
  },
});
const getAll = () => {
  return http.get('/api/transaction/allTransactions');
};

const getByPeriod = (period) => {
  return http.get(`/api/transaction?period=${period}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const update = (id, data) => {
  return http.put(`/api/transaction/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

export default { getAll, getByPeriod, create, update, remove };
