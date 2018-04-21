/*
* Created by Brian.Hao211@gmail.com
*/
export default {
  setPersistToken: (token) => {
    window.localStorage.setItem('token', token);
  },

  setToken: (token) => {
    window.sessionStorage.setItem('token', token);
  },

  getToken: () => {
    return window.sessionStorage.getItem('token') || window.localStorage.getItem('token') || '';
  },

  destoryToken: () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
  }
}