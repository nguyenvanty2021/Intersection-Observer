import { useRef, useEffect, useState } from "react";
import { useObserver } from "../hooks/useObserver";
import "./image.css";
export const Image = ({ image, isLast, nextPage }: any) => {
  const imageRef = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const entry = useObserver(imageRef, { rootMargin: "600px" });
  const animatedEntry = useObserver(imageRef, { rootMargin: "0px" });
  console.log(entry);
  useEffect(() => {
    if (!entry) return;
    if (isLast && entry.isIntersecting) {
      // is last element and viewport
      nextPage();
    }
    if (entry.isIntersecting) {
      // another element in view port not last
      setImageUrl(entry.target.dataset.src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, isLast]);

  useEffect(() => {
    if (animatedEntry?.isIntersecting) {
      setIsVisible(true);
    }
  }, [animatedEntry]);
  console.log(image);
  const imageClass = `image ${isVisible ? "show" : ""}`;
  return (
    <div className={imageClass} style={{ minHeight: 300 }}>
      <p>Author: {image.author}</p>
      <img
        // @ts-ignore
        ref={imageRef}
        src={imageUrl}
        data-src={`${image.download_url}.jpg`}
        alt={image.author}
        width="500"
      />
    </div>
  );
};
