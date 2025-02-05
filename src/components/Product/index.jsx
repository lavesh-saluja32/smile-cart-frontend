import { useEffect, useState } from "react";

import productsApi from "apis/products";
import AddToCart from "components/AddToCart";
import { Typography } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";

import Carousel from "./Carousel";

import { PageNotFound, Header, PageLoader } from "../commons";

const Product = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { slug } = useParams();
  const fetchProduct = async () => {
    try {
      const product = await productsApi.show(slug);
      console.log(product);
      setProduct(product);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
    availableQuantity,
  } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  if (isError) return <PageNotFound />;

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="px-6 pb-6">
      <Header title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          {isNotNil(imageUrl) ? (
            <Carousel imageUrls={[imageUrls ?? null, imageUrl]} title={name} />
          ) : (
            <img alt={name} className="w-48" src={imageUrl} />
          )}
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <AddToCart {...{ availableQuantity, slug }} />
        </div>
      </div>
    </div>
  );
};

export default Product;
