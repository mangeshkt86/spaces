import { API_URL } from "../config/urls";

export function getFloors() {    
  return fetch(`${API_URL}/floor`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Floor not found ${x.statusText}`);
  });
}
  