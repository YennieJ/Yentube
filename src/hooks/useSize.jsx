import { useState, useEffect } from "react";

export default function useSize() {
  const [size, setSize] = useState(window.innerWidth > 499);
  const resizeHanlder = () => {
    const width = window.innerWidth > 499;
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
