import { useEffect, useState, useRef, memo } from "react";

import { useShowProducts } from "hooks/reactQuery/useProductsApi";
import { Left, Right } from "neetoicons";
import { Button } from "neetoui";
import { useParams } from "react-router-dom";

const Carousel = () => {
  const { slug } = useParams();
  const { data: { imageUrls: partialImageUrls, title } = {} } =
    useShowProducts(slug);
  console.log(title);
  const imageUrls = partialImageUrls.filter(ele => !!ele);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };

  useEffect(() => {
    timerRef.current = setInterval(handleNext, 3000);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex items-center">
      <Button
        alt={title}
        className="rink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={() => {
          handlePrevious();
          resetTimer();
        }}
      />
      <div className="flex-col items-center justify-center">
        <img
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={() => {
          handleNext();
          resetTimer();
        }}
      />
    </div>
  );
};

export default memo(Carousel);
