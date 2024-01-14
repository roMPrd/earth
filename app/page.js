// import Image from 'next/image'

'use client'

import HomePage from './sections/HomePage'
import FeedIss from './sections/FeedIss'
import Photos from './sections/Photos'
import Thanks from './sections/Thanks'
import Footer from './sections/Footer'

import { useEffect, useRef } from "react";

export default function Home() {

  const heroRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = ev;
      heroRef.current.style.setProperty("--x", `${clientX}px`);
      heroRef.current.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <section ref={heroRef} className=' before:pointer-events-none before:fixed before:inset-0 before:z-0 before:bg-[radial-gradient(circle_farthest-side_at_var(--x,_10px)_var(--y,_10px),_var(--color-secondary)_0%,_transparent_100%)] before:opacity-40'>
     {/* <style jsx>{`
        .hero {
          height: 100vh;
          width: 100%;
          background-image: radial-gradient(
            circle farthest-side at var(--x, 100px) var(--y, 100px),
            #1250aa 0%,
            transparent 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title {
          font-size: 80px;
          text-transform: uppercase;
          transform: rotate(10deg) translateX(calc(var(--x) / 10, 0px));
        }
      `}
      </style> */}
      <HomePage />
      <section className='w-[80%] mx-auto flex flex-col gap-20'>
        <FeedIss />
        <Photos />
        <Thanks />
        <Footer />
      </section>
    </section>
  )
}
