import { useState, useRef } from "react";
import "./Carousel.css";

const Carousel = ({
  images = [],
  isLoading = false,
  imageLimit = images.length - 1,
  customPrevButton,
  customNextButton,
  imagePerSlide = 2,
  onImgClick = () => {},
}) => {
  const imageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // TODO: This function should be throttled
  const handleScroll = (e) => {
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  const handleImageClick = (img, index) => {
    onImgClick(img, index);
  };

  const handleKeyPress = (e) => {
    if (e.key == "ArrowRight" || e.key == "ArrowDown") {
      goToNext();
    } else if (e.key == "ArrowLeft" || e.key == "ArrowUp") {
      goToPrev();
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="carousel">
      <div
        tabIndex={0}
        onKeyDown={handleKeyPress}
        onWheel={handleScroll}
        className="image-container"
        style={{
          transform: `translateX(-${(currentIndex * 100) / imagePerSlide}%)`,
        }}
      >
        {/* Can be optimized by using the react-window package */}
        {images.map((image, index) => {
          return (
            <img
              ref={imageRef}
              src={image.thumbnail}
              alt={image.title}
              key={index}
              className="image"
              style={{ minWidth: `${100 / imagePerSlide}%` }}
              onClick={() => handleImageClick(image, index)}
            />
          );
        })}
      </div>

      {customPrevButton instanceof Function ? (
        customPrevButton(goToPrev)
      ) : (
        <button className="btn prev" onClick={goToPrev}>
          Prev
        </button>
      )}

      {customNextButton instanceof Function ? (
        customNextButton(goToNext)
      ) : (
        <button className="btn next" onClick={goToNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default Carousel;
