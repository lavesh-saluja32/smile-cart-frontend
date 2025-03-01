import { QUERY_KEY } from "constants/query";

import { QueryClient, QueryCache } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storege: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
  maxAge: Infinity,
  dehydrateOptions: {
    shouldDehydrateQuery: ({ queryKey }) =>
      [QUERY_KEY.COUNTRIES, QUERY_KEY.STATES].some(key =>
        queryKey.includes(key)
      ),
  },
});

export default queryClient;
