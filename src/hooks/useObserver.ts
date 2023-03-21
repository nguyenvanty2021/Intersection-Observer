import { useEffect, useState } from "react";
export const useObserver = (ref: any, options: any) => {
  const { rootMargin } = options;
  const [observerEntry, setObserverEntry] = useState<any>(null);
  useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setObserverEntry(entry);
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);
  }, [ref, rootMargin]);

  return observerEntry;
};
