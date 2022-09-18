import { API_URL } from "../config/urls";

export function getRoles() {
  const userRoles = [
    { name: "Admin", id: 1 },
    { name: "Department Lead", id: 2 },
    { name: "Manager", id: 3 },
    { name: "Employee", id: 4 },
  ];
  return new Promise((resolve,reject)=>{
    return resolve(userRoles);
  });
  return fetch(`${API_URL}/userRole`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Roles not found ${x.statusText}`);
  });
}

export function getUser(id){
return new Promise((resolve,reject)=>{
  return resolve({
    id: id,
    name: "Mangesh Tambulwadkar",
    oeCode:"A111",
    active: true
  });
})
  return fetch(`${API_URL}/user/${id}`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`User not found ${x.statusText}`);
  });
}