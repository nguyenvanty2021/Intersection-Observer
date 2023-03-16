import { useEffect, useMemo, useState } from "react";
const useElementOnScreen = (options: any, myRef: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const callbackFunction = (entries: any) => {
    const [entry] = entries; // = entries[0]
    setIsVisible(entry.isIntersecting);
  };
  const optionsMemo = useMemo(() => {
    return options;
  }, [options]);
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, optionsMemo);
    const currentTarget = myRef.current;
    if (currentTarget) observer.observe(currentTarget);
    //  console.log(myRef.current);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myRef, optionsMemo]);
  return isVisible;
};
export default useElementOnScreen;
