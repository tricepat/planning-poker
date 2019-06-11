import axios from 'axios';
import config from '../config';

const {dbApiUrl} = config;

export default {
  createUser: (newUser) => {
    return axios.post(`${dbApiUrl}/users/new`, newUser).then(response => {
      console.log('createUser response ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  getPollById: (id) => {
    return axios.get(`${dbApiUrl}/polls/${id}`).then(response => {
      console.log('getPollById response: ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  createPoll: (newPoll) => {
    return axios.post(`${dbApiUrl}/polls/new`, newPoll).then(response => {
      console.log('createPoll response ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  getTasks: (id) => {
    return axios.get(`${dbApiUrl}/tasks/inPoll/${id}`).then(response => {
      console.log('getTasks rersponse: ' + response);
      return response.data;
    }).catch((error) => {
        console.log(error);
    });
  },
  createTask: (newTask) => {
    return axios.post(`${dbApiUrl}/tasks/new`, newTask).then(response => {
      console.log('createTask response ' + response);
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
  updateTask: (id, valuesMap) => {
    return axios.post(`${dbApiUrl}/tasks/${id}`, valuesMap).then(response => {
      console.log('updateTask response ' + response);
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  },
  vote: (id, vote) => {
    return axios.post(`${dbApiUrl}/tasks/vote/${id}`, vote).then(response => {
      console.log('vote response ' + response);
      return response.data;
    }).catch((error) => {
      console.log(error);
    });
  }
}
