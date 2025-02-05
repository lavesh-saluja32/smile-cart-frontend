import { useRef } from "react";

import { TooltipWrapper } from "components/commons";
import useSelectedQuantity from "hooks/useSelectedQuantity";
import { Button, Input, Toastr } from "neetoui";

import { VALID_COUNT_REGEX } from "./constants";

const ProductQuantity = ({ slug, availableQuantity }) => {
  const countInputFocus = useRef(null);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);
  const parsedSelectedQuantity = parseInt(selectedQuantity) || 0;
  console.log(selectedQuantity, availableQuantity, " ll");

  const isNotValidQuantity = selectedQuantity >= availableQuantity;

  const preventNavigation = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleSetCount = event => {
    const { value } = event.target;
    const isNotValidInputQuantity = parseInt(value) > availableQuantity;

    if (isNotValidInputQuantity) {
      Toastr.error(`Only ${availableQuantity} units are available`, {
        autoClose: 2000,
      });
      setSelectedQuantity(availableQuantity);
      countInputFocus.current.blur();
    } else if (VALID_COUNT_REGEX.test(value)) {
      setSelectedQuantity(value);
    }
  };

  return (
    <div className="neeto-ui-border-black neeto-ui-rounded inline-flex flex-row items-center border">
      <Button
        className="focus-within:ring-0"
        label="-"
        style="text"
        onClick={e => {
          setSelectedQuantity(parsedSelectedQuantity - 1);
          preventNavigation(e);
        }}
      />
      <Input
        nakedInput
        className="ml-2"
        contentSize="2"
        ref={countInputFocus}
        value={selectedQuantity}
        onChange={handleSetCount}
        onClick={preventNavigation}
      />
      <TooltipWrapper
        content="Reached maximum units"
        position="top"
        showTooltip={isNotValidQuantity}
      >
        <Button
          className="focus-within:ring-0"
          disabled={isNotValidQuantity}
          label="+"
          style="text"
          onClick={e => {
            preventNavigation(e);
            setSelectedQuantity(parsedSelectedQuantity + 1);
          }}
        />
      </TooltipWrapper>
    </div>
  );
};
export default ProductQuantity;
