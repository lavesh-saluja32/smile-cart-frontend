import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button } from "neetoui";
import { isNil } from "ramda";

import ProductQuantity from "./commons/ProductQuantity";

const AddToCart = ({ slug }) => {
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const handleClick = e => {
    console.log("lklllll");
    console.log(setSelectedQuantity);
    e.stopPropagation();
    e.preventDefault();
    setSelectedQuantity(1);
  };
  if (!isNil(selectedQuantity)) {
    return <ProductQuantity {...{ slug }} />;
  }

  return <Button label="Add to cart" size="large" onClick={handleClick} />;
};

export default AddToCart;
