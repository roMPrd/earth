//src/components/custom-cursor.tsx
'use client'
// Import necessary React hooks and components
import React, {useEffect, useRef, useState } from 'react';
// Define cursor colors
// const CURSOR_COLORS = {
//   "h1": "green-400",
//   "button": "orange-500",
//   "default": "sky-500"
// };
// Main CustomCursor component
const CustomCursor = () => {
  // Reference to the cursor element
  const cursorRef = useRef(null);
  // State to track cursor position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track cursor color
  const [cursorSize, setCursorSize] = useState('w-4 h-4 border-2');
  // State to track cursor Large Target
  const [cursorLargeTarget, setCursorLargeTarget] = useState('hidden');
  // State to track click event
  // const [clicked, setClicked] = useState(false);

  useEffect(() => {

    // <---------- Event listener for mouse movement ---------->
    const handleMouseMove = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    // Event listener for mouse click
    // const handleMouseDown = () => {
    //   console.log('clicked', clicked)
    //   setClicked(true);
    //   // Reset click state after 800 milliseconds
    //   setTimeout(() => {
    //     setClicked(false);
    //   }, 800);
    // };

    // <---------- Event listener for mouseover clickable elements ---------->
    const handleMouseOver = (e) => {
      // const tagName = e.target.id;

      if (e.target.classList.contains('cursorLarge') ? (setCursorSize('w-8 h-8 border-2'), setCursorLargeTarget('')) : (setCursorSize('w-4 h-4 border-2'), setCursorLargeTarget('hidden')) );
      // Get the HTML tag name
      // Set cursor color based on the tag, default to "sky-500"
      // setCursorColor(CURSOR_COLORS[tagName] || CURSOR_COLORS["default"]);
    };

    // <---------- Remove Custom Cursor when out of page ---------->
    document.addEventListener('mouseover', function() {
      document.getElementById('mouseCursor').classList.remove('hideContent');
    });
    document.addEventListener('mouseleave', function() {
      document.getElementById('mouseCursor').classList.add('hideContent');
    });

    // <---------- Remove Custom Cursor when on iframe ---------->
    const iFrame = document.getElementById('iFrame');
    iFrame.addEventListener('mouseover', function() {
      document.getElementById('mouseCursor').style.display = 'none';
    });
    iFrame.addEventListener('mouseleave', function() {
      document.getElementById('mouseCursor').style.display = 'block';
    });

    // const iFrame = document.getElementsByClassName('iFrame');
    // console.log('iFrame', iFrame)
    // iFrame.map((i) => {
    //   i.addEventListener('mouseover', function() {
    //     document.getElementById('mouseCursor').style.display = 'none';
    //   });
    //   i.addEventListener('mouseleave', function() {
    //     document.getElementById('mouseCursor').style.display = 'block';
    //   });
    // });

    // const iFrame = document.getElementsByTagName('iframe');
    // console.log('iFrame', iFrame)
    // if (!iFrame) {
    //   iFrame.map((i) => {
    //     i.addEventListener('mouseover', function() {
    //       document.getElementById('mouseCursor').style.display = 'none';
    //     });
    //     i.addEventListener('mouseleave', function() {
    //       document.getElementById('mouseCursor').style.display = 'block';
    //     });
    //   });
    // }

    window.addEventListener("mousemove", handleMouseMove);
    // window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseover", handleMouseOver);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      // window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []); // useEffect runs only once on mount

  return (
    <>
      <div
        id='mouseCursor'
        style={{ top: position.y, left: position.x }}
        ref={cursorRef}
        className={`p-0 fixed pointer-events-none [transition-all] -translate-x-1/2 -translate-y-1/2 z-[9999] ease-in [duration-500] rounded-full ${cursorSize} flex justify-center items-center`}
      >
        <div
          className={`w-1 h-1 border-2 ${cursorLargeTarget} absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full ease-in [transition-all duration-500] z-9999`}>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
