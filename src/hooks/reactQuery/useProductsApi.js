import { QUERY_KEY } from "constants/query";

import productsApi from "apis/products";
import { useQuery } from "react-query";

export const useShowProducts = slug => {
  const res = useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, slug],
    queryFn: () => productsApi.show(slug),
  });
  console.log(res.data);

  return res;
};

export const useFetchProducts = params =>
  useQuery({
    queryKey: [QUERY_KEY.PRODUCTS, params],
    queryFn: () => productsApi.fetch(params),
  });
