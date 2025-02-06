import { useState } from "react";

import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useFuncDebounce from "hooks/useFuncDebounce";
//import useDebounce from "hooks/useDebounce";
import useQueryParams from "hooks/useQueryParams";
import { filterNonNull } from "neetocist";
import { Search } from "neetoicons";
import { Input, NoData, Pagination } from "neetoui";
import { isEmpty } from "ramda";
import { useHistory } from "react-router-dom";
import routes from "routes";
import { buildUrl } from "utils/url";

import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX } from "./constants";
import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  //const debouncedSearchKey = useDebounce(searchKey);
  const queryParams = useQueryParams();
  const { page, pageSize, searchTerm = "" } = queryParams;
  const productsParams = {
    searchTerm,
    page: Number(page) || DEFAULT_PAGE_INDEX,
    pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE,
  };

  const { data: { products = [], totalProductsCount } = {}, isLoading } =
    useFetchProducts(productsParams);
  const history = useHistory();

  const handlePageNavigation = page =>
    history.replace(
      buildUrl(routes.products.index, {
        page,
        pageSize: DEFAULT_PAGE_SIZE,
        searchTerm,
      })
    );

  const updateQueryParams = useFuncDebounce(value => {
    const params = {
      page: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchTerm: value || null,
    };
    setSearchKey(value);

    history.replace(buildUrl(routes.products.index, filterNonNull(params)));
  });

  if (isLoading) {
    return <PageLoader />;
  }
  console.log(products, "NEW");

  return (
    <div className="flex flex-col">
      <Header
        shouldShowBackButton={false}
        title="Smile Cart"
        actionBlock={
          <Input
            placeholder="Search products"
            prefix={<Search />}
            type="search"
            value={searchKey}
            onChange={event => {
              setSearchKey(event.target.value);
              updateQueryParams(event.target.value);
            }}
          />
        }
      />
      {isEmpty(products) ? (
        <NoData className="h-full w-full" title="No products to show" />
      ) : (
        <div className="grid grid-cols-2 justify-items-center gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map(product => (
            <ProductListItem key={product.slug} {...product} />
          ))}
        </div>
      )}
      <div className="mb-5 self-end">
        <Pagination
          count={totalProductsCount}
          pageNo={Number(page) || DEFAULT_PAGE_INDEX}
          pageSize={Number(pageSize) || DEFAULT_PAGE_SIZE}
          navigate={page => {
            handlePageNavigation(page);
          }}
        />
      </div>
    </div>
  );
};
export default ProductList;
