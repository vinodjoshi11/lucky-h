import axios from 'axios';
import store from '../store/store';
import Auth from '../services/Auth';

const onSuccess = (response) => 
{
  store.dispatch('loading/setLoading', false);

  return response;
}
const onError = (error) => {
  switch (error.response.status) {
    case 401:
      const originalRequest = error.config;
      if (!originalRequest._retry && error.response.data === 'Token Expired') {
        originalRequest._retry = true;
        const refreshToken = store.getters['auth/refreshtoken'];
        return Auth.refresh(refreshToken).then((response) => {
            store.commit('auth/setAccessToken', response.token.access);
            return axios(originalRequest);
          }).catch((error) => {
            store.dispatch('auth/logout');
            return Promise.reject(error);
          });
      } 
    break;
    default:
    break;
  }

  store.dispatch('loading/setLoading', false);

  return Promise.reject(error); 
}

const beforeRequestSuccess = (config) => {
  store.dispatch('loading/setLoading', true);
  config.headers.Authorization = `Bearer ${store.getters['auth/accesstoken']}`;
  return config;
}

const beforeRequestError = (error) => {
  store.dispatch('loading/setLoading', false);
  return Promise.reject(error);
}

export { onSuccess, onError, beforeRequestSuccess, beforeRequestError };