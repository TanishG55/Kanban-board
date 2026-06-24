import { useEffect } from "react";

export function useLockBodyScroll(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    // Save the original overflow style to restore it accurately later
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Clean up function to re-enable scrolling when unmounted or closed
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
}