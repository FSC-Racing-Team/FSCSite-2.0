import { useEffect, useState } from "react";

interface SlideshowImage {
  src: string;
  key: string;
}

export default function HeroSlideshow() {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
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

    const shuffled = [...imagePaths].sort(() => Math.random() - 0.5);
    const imageObjects = shuffled.map((src, index) => ({
      src,
      key: `${src}-${index}`,
    }));

    setImages(imageObjects);
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    let timeoutId: number | undefined;

    const advance = () => {
      const nextIndex = (activeIndex + 1) % images.length;
      setIncomingIndex(nextIndex);
      setIsTransitioning(true);

      timeoutId = window.setTimeout(() => {
        setActiveIndex(nextIndex);
        setIncomingIndex(null);
        setIsTransitioning(false);
      }, 1800);
    };

    const timer = window.setInterval(advance, 5000);

    return () => {
      window.clearInterval(timer);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [activeIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="heroSlideshowContainer" aria-live="polite" aria-label="Hero slideshow">
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        const isIncoming = index === incomingIndex && isTransitioning;
        const isOutgoing = index === activeIndex && isTransitioning;

        return (
          <div
            key={image.key}
            className={[
              "heroSlideshowSlide",
              isActive ? "is-active" : "",
              isIncoming ? "is-incoming" : "",
              isOutgoing ? "is-outgoing" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <img
              className="heroSlideshowImage"
              src={image.src}
              alt={`Slideshow image ${index + 1}`}
            />
          </div>
        );
      })}
      <div className="heroSlideshowBlurLayer" aria-hidden="true" />
    </div>
  );
}
