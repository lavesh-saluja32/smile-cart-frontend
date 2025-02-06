import { useState } from "react";

import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import { useFetchProducts } from "hooks/reactQuery/useProductsApi";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const debouncedSearchKey = useDebounce(searchKey);
  const { data: { products = [] } = {}, isLoading } = useFetchProducts({
    searchTerm: debouncedSearchKey,
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
            onChange={event => setSearchKey(event.target.value)}
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
    </div>
  );
};
export default ProductList;
