import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const WhiteBoard = () => {
  const canvasRef = useRef(null); //access a DOM element in your component

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const color = useSelector((state) => state.toolbox[activeMenuItem].color);
  const size = useSelector((state) => state.toolbox[activeMenuItem].size);

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
