import axios from 'axios';
import config from '../config';

const {dbApiUrl} = config;

export default {
  createUser: (newUser) => {
    return axios.post(`${dbApiUrl}/users/new`, newUser).then(response => {
      console.log('new user response ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  createPoll: (newPoll) => {
    return axios.post(`${dbApiUrl}/polls/new`, newPoll).then(response => {
      console.log('new poll response ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  getPollById: (id) => {
    return axios.get(`${dbApiUrl}/polls/${id}`).then(response => {
      console.log('fetched poll: ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  addTask: (id, newTask) => {
    return axios.post(`${dbApiUrl}/polls/${id}/addTask`, newTask).then(response => {
      console.log('adding task response ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  }
}
