import config from '../config';
import TokenService from '../services/token-service';

const TallyhoApiService = {
  getTasks() {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(event => Promise.reject(event)) : res.json()
    );
  },
  getTaskToDelete(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => {
      if (res.ok) {
        return {};
      } else {
        return res.json().then(event => Promise.reject(event));
      }
    });
  },
  postTask(title, image) {
    return fetch(`${config.API_ENDPOINT}/tasks`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        image,
      }),
    }).then(res => {
      if (!res.ok) {
        return res.json().then(event => Promise.reject(event));
      } else {
        return res.json();
      }
    });
  },
  getTask(taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  updateTask(newTask, taskId) {
    return fetch(`${config.API_ENDPOINT}/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(newTask),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res => {
      if (!res.ok) return res.json().then(error => Promise.reject(error));
    });
  },
};

export default TallyhoApiService;
