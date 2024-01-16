"use client"
import { useEffect } from "react";
import { useInView } from "framer-motion"
import { useAnimation, motion } from "framer-motion";
import { useRef } from 'react';

const AnimatedTitle = (
  props
) => {

  const ref= useRef(null)
  const isInView = useInView(ref)
  const ctrls = useAnimation();

  useEffect(() => {
    if (isInView) {
      ctrls.start("animate");
    }
    if (!isInView) {
      ctrls.start("initial");
    }
  }, [ctrls, isInView])

  const titleAnimation = {
    animate: {
      // margin: auto,
      opacity: props.opacityEnd,
      scale: props.scaleEnd,
      transition : {
        duration: props.duration,
        // ease: [0.2, 0.65, 0.3, 0.9],
        ease: "linear",
      },
      // borderRadius: props.borderRadiusEnd,
      width: props.widthEnd,
      height: props.heightEnd,
      // transform: props.transformEnd,
      // marginTop: props.marginTopEnd,
      // marginBottom: props.marginBottomEnd,
      // top: props.topEnd,
    },
    initial: {
      // margin: auto,
      opacity: props.opacityStart,
      scale: props.scaleStart,
      // borderRadius: props.borderRadiusStart,
      width: props.widthStart,
      height: props.heightStart,
      // transform: props.transformStart,
      // marginTop: props.marginTopStart,
      // marginBottom: props.marginBottomStart,
      // top: props.topStart,
    }
  };

  return (
    <motion.div
      ref={ref}
      className={props.className}
      initial="initial"
      animate={ctrls}
      variants={titleAnimation}
    >
      {props.children}
    </motion.div>
  )
}

export default AnimatedTitle
