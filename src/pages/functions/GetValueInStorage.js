export function GetValueInStorage (key) {
  return JSON.parse(window.localStorage.getItem(key))
}
