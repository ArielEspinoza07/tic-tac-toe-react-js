export function SetValueInStorage (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}
