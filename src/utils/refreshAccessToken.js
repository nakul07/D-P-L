import endpoints from '../constants/endpoints';
import { set } from './localStorage';
import { NURIX_TOKEN_KEY } from '../constants/constants';

const post = async function(url, baseUrl, data) {
  const response = await window.fetch(`${baseUrl}${url}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      accept: 'application/json;charset=UTF-8'
    }
  });
  if (response.status.toString().startsWith('4')) {
    localStorage.clear();
    window.location.href = `/login?redirect_uri=${window.location.pathname}`;
    throw new Error('Login required');
  }
  return response.json();
};

/**
 * Refresh the access token.
 *
 * @param {string} token
 * @param {string} baseUrl
 * @returns {Promise<{accessToken: *, refreshToken: string}>}
 */
export async function refreshAccessToken(token, baseUrl) {
  try {
    const response = await post(`${endpoints.refreshToken}`, baseUrl, {
      grant_type: 'refresh_token',
      refresh_token: token
    });
    const accessToken = response.access_token;
    const refreshToken = response.refresh_token;
    set(NURIX_TOKEN_KEY, { accessToken, refreshToken });
    return { accessToken, refreshToken };
  } catch (error) {
    localStorage.clear();
    window.location.href = `/login?redirect_uri=${window.location.pathname}`;
    return {};
  }
}

export default { refreshAccessToken };
