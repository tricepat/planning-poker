import axios from 'axios';
import config from '../config';

const {dbApiUrl} = config;

export default {
  getUser: (id) => {
    return axios.get(`${dbApiUrl}/users/${id}`).then(response => {
      return response.data;
    });
  },
  createUser: (newUser) => {
    return axios.post(`${dbApiUrl}/users/new`, newUser).then(response => {
      return response.data;
      });
  },
  getPollById: (id) => {
    return axios.get(`${dbApiUrl}/polls/${id}`).then(response => {
      return response.data;
    });
  },
  createPoll: (newPoll) => {
    return axios.post(`${dbApiUrl}/polls/new`, newPoll).then(response => {
      return response.data;
    });
  },
  getTasks: (id) => {
    return axios.get(`${dbApiUrl}/tasks/inPoll/${id}`).then(response => {
      return response.data;
    });
  },
  createTask: (newTask) => {
    return axios.post(`${dbApiUrl}/tasks/new`, newTask).then(response => {
      return response.data;
    });
  },
  updateTask: (id, valuesMap) => {
    return axios.post(`${dbApiUrl}/tasks/${id}`, valuesMap).then(response => {
      return response.data;
    });
  },
  vote: (id, vote) => {
    return axios.post(`${dbApiUrl}/tasks/vote/${id}`, vote).then(response => {
      return response.data;
    });
  }
}
