import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    const debounceOnResize = debounce(handleResize, 100, {
      leading: true,
    });

    window.addEventListener('resize', debounceOnResize);

    return () => {
      window.removeEventListener('resize', debounceOnResize);
    };
  }, []);

  return windowSize;
};
