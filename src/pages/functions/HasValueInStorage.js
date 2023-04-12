export function HasValueInStorage (key) {
  return window.localStorage.getItem(key) !== null
}
