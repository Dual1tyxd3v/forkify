import { FETCH_DELAY } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async (url) => {
  try {
    const resp = await Promise.race([fetch(url), timeout(FETCH_DELAY)]);

    if (!resp.ok) throw new Error('Could not found!');

    return await resp.json();
  } catch (e) {
    throw e;
  }
}; 

export const postJSON = async (url, body) => {
  try {
    const resp = await Promise.race([fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }), timeout(FETCH_DELAY)]);

    if (!resp.ok) throw new Error('Could not post!');

    return await resp.json();
  } catch (e) {
    throw e;
  }
}; 
