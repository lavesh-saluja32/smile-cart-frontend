import { QUERY_KEY } from "constants/query";

import productsApi from "apis/products";
import { existsBy } from "neetocist";
import { Toastr } from "neetoui";
import { prop } from "ramda";
import { useTranslation } from "react-i18next";
import { useQuery, useQueries } from "react-query";
import useCartItemsStore from "stores/useCartItemsStore";

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
    keepPreviousData: true,
  });

export const useFetchCartProducts = slugs => {
  const { t } = useTranslation();
  const { cartItems, setSelectedQuantity } = useCartItemsStore();

  const response = useQueries(
    slugs.map(slug => ({
      queryKey: [QUERY_KEY.PRODUCTS, slug],
      queryFn: () => productsApi.show(slug),
      onSuccess: ({ availableQuantity, name }) => {
        if (availableQuantity >= cartItems[slug]) return;
        setSelectedQuantity(slug, availableQuantity);
        if (availableQuantity === 0) {
          Toastr.error(t("product.error.removedFromCart", { name }), {
            autoClose: 2000,
          });
        }
      },
    }))
  );
  const data = response.map(prop("data")).filter(Boolean);
  const isLoading = existsBy({ isLoading: true }, response);

  return { data, isLoading };
};
