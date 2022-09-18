import { API_URL } from "../config/urls";

export function getLocations() {    
  return fetch(`${API_URL}/location?$expand=TblFloors`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Location not found ${x.statusText}`);
  });
}
  