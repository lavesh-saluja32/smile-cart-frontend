import { QUERY_KEY } from "constants/query";

import countriesApi from "apis/countries";
import statesApi from "apis/states";
import { prop } from "ramda";
import { useQuery } from "react-query";

export const useFetchCountries = () =>
  useQuery({
    queryKey: QUERY_KEY.COUNTRIES,
    queryFn: () => countriesApi.fetch(),
    select: prop("countries"),
    staleTime: Infinity,
  });

export const useFetchStates = stateParams =>
  useQuery({
    queryKey: [QUERY_KEY.STATES, stateParams],
    queryFn: () => statesApi.fetch(stateParams),
    select: prop("states"),
    staleTime: Infinity,
  });
