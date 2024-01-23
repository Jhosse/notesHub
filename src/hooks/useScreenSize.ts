import { useState, useEffect } from "react";
import { debounce } from "../utils/functions";

interface IScreenSize {
  isMobile: boolean;
  isDesktop: boolean;
}

const useScreenSize = (): IScreenSize => {
  const isClient = typeof window === "object";

  const [screenSize, setScreenSize] = useState<IScreenSize>(() => {
    if (!isClient) {
      // Default values for SSR or non-browser environments
      return {
        isMobile: false,
        isDesktop: false,
      };
    }

    // Use the current window size as the initial state
    return {
      isMobile: window.innerWidth <= 740,
      isDesktop: window.innerWidth > 740,
    };
  });

  useEffect(() => {
    if (!isClient) {
      // Avoid running on the server
      return;
    }

    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth <= 740,
        isDesktop: window.innerWidth > 740,
      });
    };

    const debouncedResizeHandler = debounce(handleResize, 300); // Adjust debounce time as needed
    window.addEventListener("resize", debouncedResizeHandler);

    return () => {
      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, [isClient]);

  return screenSize;
};

export default useScreenSize;
