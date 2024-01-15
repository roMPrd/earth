"use client"

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedTitle from "@components/animations/animatedTitle";
import { spaceGrotesk } from "../fonts/spaceGrotesk";

const texts = ["Earth", "World", "Planet", "Home", "Future"]
const variants = {
  enter: {
    y: 20,
    opacity: 0,
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    y: -20,
    opacity: 0,
  },
}

const TextLoop = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let next = index + 1;
      if (next === texts.length) {next = 0};
      setIndex(next);
    }, 3 * 1000);
  }, [index, setIndex]);

  return (
    <div className="w-full relative flex justify-center items-center">

      <h1
        // className="mr-[0.5rem] text-2xl text-end w-[50%]"
        className={`${spaceGrotesk.className} mr-[0.5rem] w-[50%] font-bold text-end leading-none tracking-tighter text-[20px] sm:text-[25px] md:text-[30px] lg:text-[40px]`}
      >
        This is our
      </h1>
      <div className ="text-center flex items-center w-[50%]">
        <AnimatePresence>
          <motion.span
            className={`absolute font-bold text-end leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
            // style={{ position: "absolute", font-size: "2.5em" }}
            key={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: {
                type: "ease",
                // stiffness: 300,
                // damping: 200
              },
              opacity: { duration: 0.5 }
            }}
          >
            {texts[index].toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <section className="z-50 relative flex justify-center items-center h-[100dvh] w-[100dvw]">
      <div className="h-full w-full">
        <video
          src="assets/earth_video.mp4"
          className="h-full w-full object-cover"
          autoPlay="autoplay"
          loop="loop"
          muted={true}
          preload="auto"
        >
        </video>
      </div>
      <div className="z-1 absolute w-full flex items-center justify-center text-white">
        <AnimatedTitle
          className="w-full"
          children={<TextLoop />}
        />
      </div>
    </section>
  )
}

export default HomePage
