export function setToLocalStorage(name: string, data: unknown) {
  localStorage.setItem(name, JSON.stringify(data));
}
