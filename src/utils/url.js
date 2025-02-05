import { keysToSnakeCase } from "neetocist";
import { stringify } from "qs";
import { toPairs, omit, pipe, isEmpty } from "ramda";

export const buildUrl = (route, params) => {
  const placeholder = [];
  toPairs(params).forEach(([key, value]) => {
    if (route.includes(`:${key}`)) {
      placeholder.push(key);
      route = route.replace(`:${key}`, encodeURIComponent(value));
    }
  });

  const queryParams = pipe(
    omit(placeholder),
    keysToSnakeCase,
    stringify
  )(params);

  return isEmpty(queryParams) ? route : `${route}?${queryParams}`;
};
