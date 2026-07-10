import React, { useEffect, useState } from "react";

interface SlideshowImage {
  src: string;
  key: string;
}

export default function HeroSlideshow() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // List of all images in public/images/slideshow
    const imagePaths = [
      "/images/slideshow/IMG_4150.JPG",
      "/images/slideshow/IMG_4178.JPG",
      "/images/slideshow/IMG_4181.JPG",
      "/images/slideshow/IMG_4208.JPG",
      "/images/slideshow/IMG_4237.JPG",
      "/images/slideshow/IMG_4244.JPG",
      "/images/slideshow/IMG_4257.JPG",
      "/images/slideshow/IMG_5075.JPG",
      "/images/slideshow/PXL_20260314_113345627.jpg",
    ];

    // Randomize order
    const shuffled = [...imagePaths].sort(() => Math.random() - 0.5);
    const imageObjects = shuffled.map((src, index) => ({
      src,
      key: `${src}-${index}`,
    }));

    setImages(imageObjects);
  }, []);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="heroSlideshowContainer">
      {images.map((img, index) => (
        <div
          key={img.key}
          className={`heroSlideshowSlide ${index === currentIndex ? "is-active" : ""}`}
        >
          <img src={img.src} alt={`Slideshow image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
