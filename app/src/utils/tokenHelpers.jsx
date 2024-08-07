const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};
function setToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
function setEmail(email) {
  localStorage.setItem("email", JSON.stringify(email));
}
const getEmail = () => {
  return JSON.parse(localStorage.getItem("email"));
};
const clearToken = () => {
  localStorage.removeItem("token");
};
export { setToken, getToken, setEmail, getEmail, clearToken };
