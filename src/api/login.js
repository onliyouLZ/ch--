import axios from 'axios'


export function login(username,password) {
  let param={
    username:username,
    password:password
  };
  return axios.get("http://localhost:3000/users?name="+param.username);
}
