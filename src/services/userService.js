import http from "./httpService";

const apiEndpoint = "/users";

function getUserUrl(id) {
  return `${apiEndpoint}/${id}`;
}


export function getUsers() {
  return http.get(apiEndpoint);
}

export function getUser(userId) {
  return http.get(getUserUrl(userId));
}

export function register(user) {
  return http.post(apiEndpoint, {
    username: user.username
    });
}