import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll hasta arriba con smooth
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null; // No renderiza nada
};

export default ScrollToTop;