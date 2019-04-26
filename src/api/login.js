import axios from 'axios'


export function login(username,password) {
  let param={
    username:username,
    password:password
  };
  return axios.get("users?name="+param.username);
}
