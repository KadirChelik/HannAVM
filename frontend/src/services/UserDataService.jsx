import http from './http-common';

export function fetchUsers() {
  return http.get('/users');
}

export function getUser(email) {
  return http.get(`users/${email}`);
}

export function addUser(data) {
  return http.post('/register', data);
}

export function login(data){
    return http.post("/login",data);
  }

export function updateUser(id, data) {
  return http.put(`/users/${id}`, data);
}

export function deleteUser(id) {
  return http.delete(`/users/${id}`);
}

export const changePassword = (id, oldPassword, newPassword) => {
  return http.post(`/users/${id}/change-password`, {
    id,
    oldPassword,
    newPassword
  });
};