import { groupBy, map } from 'ramda';

export const byUri = (items) => map((items) => items.shift(), groupBy(item => item._links.self.href, items));
