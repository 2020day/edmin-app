import Cookies from 'js-cookie';

/**
*
*     @param {object] info
*/
// eslint-disable-next-line no-unused-vars
export function setUserCookei(info) {
  const arr = Object.entries(info);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < arr.length; i++) {
    Cookies.set(arr[i][0], arr[i][1]);
  }
}

// eslint-disable-next-line no-unused-vars
export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    email: Cookies.get('email'),
    role: Cookies.get('role'),
  };
}

// eslint-disable-next-line no-unused-vars
export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('email');
  Cookies.remove('role');
  return true;
}
