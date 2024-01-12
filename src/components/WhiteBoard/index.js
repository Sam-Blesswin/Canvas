import { useEffect, useRef } from "react";

const WhiteBoard = () => {
  const canvasRef = useRef(null); //access a DOM element in your componen

  //The useEffect hook is used here because it runs after the component mounts and the DOM is rendered.
  useEffect(() => {
    if (!canvasRef.current) return; //NULL check

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WhiteBoard;
