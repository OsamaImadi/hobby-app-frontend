import http from "./httpService";

const apiEndpoint = "/hobbies";

function getHobbyUrl(id) {
  return `${apiEndpoint}/${id}`;

}
export function getHobbies() {
  return http.get(apiEndpoint);
}

export function getHobbiesOfUser(hobbyId) {
  return http.get(`${apiEndpoint}/user/${hobbyId}`);
}


export function saveHobby(hobby) {
  if (hobby._id) {
    const body = { ...hobby };
    delete body._id;
    return http.put(getHobbyUrl(hobby._id), body);
  }

  return http.post(apiEndpoint, hobby);
}

export function deleteHobby(hobbyId) {
  return http.delete(getHobbyUrl(hobbyId));
}
