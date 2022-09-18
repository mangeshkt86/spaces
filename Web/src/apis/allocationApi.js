import { APIURL, API_URL } from "../config/urls";

export function getAllAllocations(location) {
  return fetch(`${API_URL}/Allocation`).then(
    (x) => {
      if (x.ok) {
        return x.json().then((r) => r.value);
      }
      return new Error(`Allocations not found ${x.statusText}`);
    }
  );
}

