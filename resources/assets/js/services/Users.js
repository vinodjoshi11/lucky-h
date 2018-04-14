import Vue from 'vue';
import axios from 'axios';

export default {
	getUsers () {
		return axios.get(`api/users`)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));
	},
	removeUser (id) {
		return axios.delete(`api/users/${id}`)
			.then(response => response.data)
			.catch(error => Promise.reject(error.response));		
	}
}