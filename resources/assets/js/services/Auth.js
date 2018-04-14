import Vue from 'vue';
import axios from 'axios';
const api = 'quiz.json'
const dbapi = 'db.json'
export default {
    getData (data) { alert(121);
        return axios.get(`http://localhost:8000/db.json`, data)
            .then(response => response.data)
            .catch(error => Promise.reject(error.response));
    },
	register (data) { alert(121);
		return axios.post(`/api/register`, data)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	login (data) {
		return axios.post(`api/login`, data)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	authenticate () {alert(1);
		return axios.get(`api/authenticate`)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	refresh (token) {
		return axios.post('api/authenticate/refreshToken', { token: token })
		  .then(response => response.data)
		  .catch(error => Promise.reject(error.response));
	}
}
