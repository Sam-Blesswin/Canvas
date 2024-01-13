import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector } from "react-redux";

const WhiteBoard = () => {
  const canvasRef = useRef(null); //access a DOM element in your component
  const shouldDraw = useRef(false); //useRef is used to maintain a mutable state across renders without triggering a re-render of the component itself.

  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  // useEffect is used here for non-urgent updates that don't impact the layout or visual aspect directly.
  // It updates the line width and stroke style of the canvas context. Since these updates don't require
  // immediate visual feedback and don't cause layout shifts, useEffect is appropriate.
  // It re-runs only when `size` or `color` changes.
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.lineWidth = size;
    ctx.strokeStyle = color;
  }, [size, color]);

  // useLayoutEffect is used for updates that need to be reflected on-screen immediately.
  // It sets the canvas dimensions to fill the entire viewport. This needs to happen synchronously
  // before the browser paints the screen to avoid any flickering or layout shift.
  // Also, it sets up event listeners for drawing operations on the canvas, which need to be in place
  // as soon as the canvas is resized and before any user interaction.
  useLayoutEffect(() => {
    if (!canvasRef.current) return; //NULL check

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleMouseDown = (e) => {
      shouldDraw.current = true;
      ctx.beginPath();
      ctx.moveTo(e.clientX, e.clientY); //start the line from the current mouse position
    };

    const handleMouseMove = (e) => {
      if (!shouldDraw.current) return;
      ctx.lineTo(e.clientX, e.clientY); //draw the line to the current mouse position
      ctx.stroke(); //draw the line to the current mouse position
    };

    const handleMouseUp = (e) => {
      shouldDraw.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WhiteBoard;
