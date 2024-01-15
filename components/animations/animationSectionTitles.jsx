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
      scale: 0,
      // x: props.xStart,
      // y:props.yStart,
      // z:props.zStart,
    },
    visible: {
      opacity: 1,
      scale: 1,
      // x: props.xEnd,
      // y: props.yEnd,
      // z: props.zEnd,
      transition:{
        duration: props.duration,
        // delay: index * 20,
        // ease: props.ease,
        // delayChildren: 1,
        staggerChildren: props.staggerChildren,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={props.divClassName}
      // transition={{
      //   delayChildren: 5,
      //   staggerChildren: 5,
      // }}
      initial="hidden"
      animate={ctrls}
      variants={animation}
    >
      {props.text.map((text, index) => {
        return (
          <motion.span
            key={index}
            // initial="hidden"
            // animate={ctrls}
            variants={animation}
            className={props.spanClassName}
            // delay= {index + 5}
          >
            {text.length === index + 1 ? text  : text + ' '}
          </motion.span>
        );
      })}
    </motion.div>
  )
}

export default animationLR;
