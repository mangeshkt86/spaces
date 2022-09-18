import { API_URL } from "../config/urls";

export function getFloors(location) {
  return fetch(`${API_URL}/floor?$filter=locationId eq ${location.Id}`).then(
    (x) => {
      if (x.ok) {
        return x.json().then((r) => r.value);
      }
      return new Error(`Floor not found for location ${x.statusText}`);
    }
  );
}

export function getZones(floor) {
  return fetch(`${API_URL}/zone?$filter=floorId eq ${floor.Id}`).then(
    (x) => {
      if (x.ok) {
        return x.json().then((r) => r.value);
      }
      return new Error(`Zone not found for floor ${x.statusText}`);
    }
  );
}
