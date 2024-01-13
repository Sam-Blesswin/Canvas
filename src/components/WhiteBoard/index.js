import { MENU_ITEMS } from "@/constants";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { menuItemClick, actionItemClick } from "../../slice/menuSlice";

const WhiteBoard = () => {
  const canvasRef = useRef(null); //access a DOM element in your component
  const shouldDraw = useRef(false); //useRef is used to maintain a mutable state across renders without triggering a re-render of the component itself.

  //for undo and redo
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

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
    } else if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointer.current > 0) {
        historyPointer.current--;
        ctx.putImageData(drawHistory.current[historyPointer.current], 0, 0); //draw the previous state on the canvas
      }
    } else if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1) {
        historyPointer.current++;
        ctx.putImageData(drawHistory.current[historyPointer.current], 0, 0); //draw the next state on the canvas
      }
    }

    dispatch(actionItemClick(null)); //Reset actionMenuItem
  }, [actionMenuItem, dispatch]);

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

    drawHistory.current.push(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    ); //push the current state to array
    historyPointer.current = drawHistory.current.length - 1; //set the pointer to the current state

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
      console.log("MOUSE UP");
      shouldDraw.current = false;

      //Update history array
      const currentImageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      drawHistory.current.push(currentImageData); //push the current state to array
      historyPointer.current = drawHistory.current.length - 1; //set the pointer to the current state
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default WhiteBoard;
