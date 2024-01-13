import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { menuItemClick, actionItemClick } from "../../slice/menuSlice";

const WhiteBoard = () => {
  const canvasRef = useRef(null); //access a DOM element in your component
  const shouldDraw = useRef(false); //useRef is used to maintain a mutable state across renders without triggering a re-render of the component itself.

  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const URL = canvas.toDataURL(); //generates a image url
      const anchor = document.createElement("a");
      anchor.href = URL;
      anchor.download = "whiteboard.png";
      anchor.click(); //saves the file
      console.log(URL);
    }

    dispatch(actionItemClick(null)); //Reset actionMenuItem
  }, [actionMenuItem]);

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

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height); //fill the entire canvas with white color

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
