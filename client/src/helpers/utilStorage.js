
export const tokenExists = () => {
  return localStorage.getItem('imtegra-jwt') !== null;
}
export const getToken = () => {
  return localStorage.getItem('imtegra-jwt');
}

export const roleExists = () => {
  return localStorage.getItem('imtegra-role') !== null;
}

export const getRole = () => {
  return localStorage.getItem('imtegra-role');
}

export default {
  tokenExists,
  getToken,
  roleExists,
  getRole
}
