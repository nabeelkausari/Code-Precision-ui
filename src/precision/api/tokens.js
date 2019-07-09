import { fetchLinkAs } from './helpers';
import * as base64 from 'base-64';
import { authorizer } from './auth';
import { TOKEN } from './media-types';

const tokensLink = {
  href: '/tokens',
  method: 'POST',
  accept: TOKEN
};

export const returnProcessedToken = (token) => {
  authorizer.setHeader(`Bearer ${token.authorization}`);
  return token;
};
export const tokens = {
  create: (username, password) => {
    const headers = new Headers();
    headers.set('Authorization', `Basic ${base64.encode(`${username}:${password}`)}`);
    return fetchLinkAs(tokensLink, undefined, headers)
      .then(token => returnProcessedToken(token));
  }
};
