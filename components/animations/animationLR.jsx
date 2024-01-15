"use client"

import { useEffect, useRef } from 'react';
import { useInView, useAnimation, motion } from 'framer-motion';

const animationLR = (
  props
) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const ctrls = useAnimation();

  useEffect(() => {
    if (isInView) {
      ctrls.start('visible');
    } else {
      ctrls.start('hidden');
    }
  }, [ctrls, isInView]);

  const animation = {
    hidden: {
      opacity: 0,
      x: props.xStart,
      y:props.yStart,
      z:props.zStart,
    },
    visible: {
      opacity: 1,
      x: props.xEnd,
      y: props.yEnd,
      z: props.zEnd,
      transition:{
        duration: props.duration,
        delay: props.delay,
        // ease: props.ease,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={props.className}
      initial="hidden"
      animate={ctrls}
      variants={animation}
    >
      {props.children}
    </motion.div>
  )
}

export default animationLR;
