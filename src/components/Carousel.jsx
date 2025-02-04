import { useState } from "react";

import { Left, Right } from "neetoicons";
import { Button } from "neetoui";

const Carousel = ({ imageUrls, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const handleIndex = key => {
    setCurrentIndex(key);
  };

  return (
    <div className="flex items-center">
      <Button
        alt={title}
        className="rink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <div className="flex-col items-center justify-center">
        <img
          className="max-w-56 h-56 max-h-56 w-56"
          src={imageUrls[currentIndex]}
        />
        <div className="flex w-[100%] justify-center">
          {imageUrls.map((_ele, index) => (
            // eslint-disable-next-line react/jsx-key
            <div
              key={index}
              className={`h-3 w-3 cursor-pointer rounded-full border-2 border-black ${
                currentIndex === index ? "bg-black" : "bg-white"
              }`}
              onClick={() => handleIndex(index)}
            />
          ))}
        </div>
      </div>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Right}
        style="text"
        onClick={handleNext}
      />
    </div>
  );
};

export default Carousel;
