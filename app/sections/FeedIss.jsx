
"use client"

import dynamic from "next/dynamic";
import SatelliteInfo from "@components/utilities/satellite_info";
import { spaceGrotesk } from "../fonts/spaceGrotesk";
import AnimationLR from "@components/animations/animationLR";
import AnimationSectionTitles from "@components/animations/animationSectionTitles";


const FeedIss = () => {

  const MapWithNoSSR = dynamic(() => import("@components/utilities/map"), {
    ssr: false
  });

  return (

    <section className="relative flex flex-col gap-40 pt-40 my-40 border border-[--color-secondary] rounded-xl">
      <div className='absolute w-full mx-auto top-0 -translate-y-2/4 left-0 z-[51] text-center'>
        <AnimationSectionTitles
          duration={0.7}
          staggerChildren={0.2}
          divClassName="w-fit mx-auto flex gap-4"
          spanClassName={`${spaceGrotesk.className} backdrop-filter backdrop-blur-xl font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
          text={["International", "Space", "Station"]}
        />
      </div>

      <div className="absolute top-[50%] left-[50%] w-[50vw] -translate-x-2/4 -translate-y-2/4 opacity-10">
        <img src="assets/ISS_emblem.png" alt="logo-iss" />
      </div>

      <div className="flex items-center justify-between">

        <AnimationLR
          className="z-50 w-[75%] -translate-x-20 border border-[--color-secondary] shadow-xl rounded-xl cursor-none"
          xStart={-180}
          xEnd={-80}
          yStart={0}
          yEnd={0}
          duration={2}
          delay={0}
          children={
            // <div className="z-50 w-[75%] -translate-x-20 border border-[--color-secondary] shadow-xl rounded-xl">
              <iframe
                id='iFrame'
                className="w-full aspect-video rounded-xl"
                // width="560"
                // height="315"
                src="https://www.youtube.com/embed/jPTD2gnZFUw?autoplay=1&si=HbMIjeYZOStV5va_"
                title="YouTube video player"
                // frameBorder="0"
                autoPlay="1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
              </iframe>
            // {/* </div> */}
          }
        />

        <AnimationLR
          className="w-[45%]"
          xStart={100}
          xEnd={0}
          yStart={0}
          yEnd={0}
          duration={1}
          delay={0.2}
          children={
            <h1
              // className="text-[18px] md:text-[40px] font-bold text-center"
              className={`${spaceGrotesk.className} font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
            >
            <span className='text-red-600'>●</span> Live Feed
            </h1>
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <AnimationLR
          className="z-50 -translate-x-20 translate-y-20 w-auto p-5 rounded-xl "
          xStart={-180}
          xEnd={-80}
          yStart={80}
          yEnd={80}
          duration={1}
          delay={0.2}
          children={
            <>
            {/* <div className="z-50 -translate-x-20 translate-y-20 w-auto p-5 rounded-xl"> */}
              <h1
                // className="text-[18px] md:text-[40px] font-bold text-center"
                className={`${spaceGrotesk.className} backdrop-filter backdrop-blur-xl font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
                >
                Live Tracking
              </h1>
              <SatelliteInfo className="w-[100%] h-full"/>
            {/* </div> */}
            </>
          }
        />
        <AnimationLR
          className="w-[65%] translate-x-20 translate-y-20 border border-[--color-secondary] shadow-xl rounded-xl backdrop-filter backdrop-blur-xl"
          xStart={180}
          xEnd={80}
          yStart={80}
          yEnd={80}
          duration={1}
          delay={0}
          children={
            // <div className="w-[65%] translate-x-20 translate-y-20 border border-[--color-secondary] shadow-xl rounded-xl backdrop-filter backdrop-blur-xl">
              <div id="map" className="w-full h-full aspect-video text-center">
                <MapWithNoSSR
                  // lat={data.latitude}
                  // lng={data.longitude}
                  />
              </div>
            // </div>
          }
        />
      </div>


    </section>
  )
}

export default FeedIss
