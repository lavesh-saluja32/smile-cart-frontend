import { useEffect, useState } from "react";

import productsApi from "apis/products";
import Header from "components/commons/Header";
import PageLoader from "components/commons/PageLoader";
import useDebounce from "hooks/useDebounce";
import { Search } from "neetoicons";
import { Input, NoData } from "neetoui";
import { isEmpty } from "ramda";

import ProductListItem from "./ProductListItem";

const ProductList = () => {
  const [searchKey, setSearchKey] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const debouncedSearchKey = useDebounce(searchKey);
  const fetchProducts = async () => {
    try {
      const response = await productsApi.fetch({
        searchTerm: debouncedSearchKey,
      });
      console.log(response.products, "pp");
      setProducts(response.products);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchKey]);

  if (isLoading) {
    return <PageLoader />;
  }

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
