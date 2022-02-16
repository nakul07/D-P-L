import { get, set, remove } from './localStorage';
import { NURIX_TOKEN_KEY } from '../constants/constants';
import { refreshAccessToken } from './refreshAccessToken';

/**
 * The function that wraps all the utilities based on jwt.
 *
 * @param {String} baseUrl
 */
export default function JWTToken(baseUrl) {
  /**
   * Decode a JWT Token.
   *
   * @param  {String} token
   */
  function decodeJWT(token) {
    if (!token) {
      return null;
    }
    try {
      const base64Url = token.split('.')[1];
      return JSON.parse(window.atob(base64Url));
    } catch (e) {
      return null;
    }
  }

  /**
   * Get the refresh token stored in the local storage.
   *
   * @returns {String} - Stored token.
   */
  function getRefreshToken() {
    try {
      const token = get(NURIX_TOKEN_KEY);
      return token && token.refreshToken;
    } catch (e) {
      return null;
    }
  }

  /**
   * Store the provided access token to local storage.
   *
   * @param {object} token - Token to store.
   * @returns {object} - Stored token.
   */
  function setAccessToken(token) {
    set(NURIX_TOKEN_KEY, token);
    return token;
  }

  /**
   * Refresh token if expired.
   *
   * @returns {Promise<{accessToken: *, refreshToken: string}>}
   */
  async function refreshToken() {
    return refreshAccessToken(getRefreshToken(), baseUrl);
  }

  /**
   * Get the access token stored in the local storage.
   *
   * @returns {String} - Stored token.
   */
  function getAccessToken() {
    const token = get(NURIX_TOKEN_KEY);
    if (!token) {
      return null;
    }
    return token && token.accessToken;
  }

  /**
   * Get the logged in user mapped to the jwt.
   *
   * @returns {boolean|object}
   */
  function getLoggedInUser() {
    const token = getAccessToken();
    if (token) {
      return decodeJWT(token);
    }
    return false;
  }

  /**
   * Clear the access token stored.
   * Can be used to implement logout functionality.
   */
  function clearToken() {
    remove(NURIX_TOKEN_KEY);
  }

  /**
   * Returns the access token header for use in the fetch api.
   *
   * @returns {{Authorization: string}|{}}
   */
  function getAccessHeader() {
    const accessToken = getAccessToken();
    if (accessToken) {
      return {
        Authorization: `Bearer ${accessToken}`
      };
    }
    return {};
  }

  return {
    setAccessToken,
    getAccessToken,
    clearToken,
    getAccessHeader,
    refreshToken,
    getLoggedInUser
  };
}
