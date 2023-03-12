import { useState, useEffect } from "react";

export default function useSize() {
  const [size, setSize] = useState(window.innerWidth);
  const resizeHanlder = () => {
    const width = window.innerWidth;
    setSize(width);
  };
  useEffect(() => {
    window.addEventListener("resize", resizeHanlder);
    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, []);

  return size;
}
