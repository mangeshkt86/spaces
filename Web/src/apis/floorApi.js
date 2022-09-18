import { API_URL } from "../config/urls";

export function getFloors(location) {
  return fetch(
    `${API_URL}/floor?$filter=locationId eq ${location.Id} && expand=TblZones`
  ).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Floor not found for location ${x.statusText}`);
  });
}

export function getFloor(floorId) {
  return fetch(`${API_URL}/floor(${floorId})?$expand=TblZones`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Floor not found ${x.statusText}`);
  });
}

export function getZones(floors) {
  var floorIds = floors.map((x) => x.Id).join(",");
  return fetch(
    `${API_URL}/Zone?$filter=floorId in [${floorIds}] && expand=TblDesks,Floor`
  ).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Zone not found for floor ${x.statusText}`);
  });
}
export function getZone(id) {
  return fetch(
    `${API_URL}/Zone?$filter=Id eq ${id}&&expand=TblDesks,Floor`
  ).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value[0]);
    }
    return new Error(`Zone not found ${x.statusText}`);
  });
}

export function getDesks(zones) {
  var zoneIds = zones.map((x) => x.Id).join(",");
  return fetch(`${API_URL}/Desk?$filter=zoneId in [${zoneIds}]`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Desks not found for zones ${zoneIds}:  ${x.statusText}`);
  });
}

export function getDesk(id) {
  return fetch(`${API_URL}/Desk(${id})?$expand=Zone`).then((x) => {
    if (x.ok) {
      return x.json().then((r) => r.value);
    }
    return new Error(`Desks not found ${id}:  ${x.statusText}`);
  });
}
