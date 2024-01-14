
"use client"

import dynamic from "next/dynamic";
import SatelliteInfo from "@components/utilities/satellite_info";
import { spaceGrotesk } from "../fonts/spaceGrotesk";


const FeedIss = () => {

  const MapWithNoSSR = dynamic(() => import("@components/utilities/map"), {
    ssr: false
  });

  return (

    <section className="relative flex flex-col gap-40 pt-40 my-40 border border-[--color-secondary] rounded-xl">
      <div className='absolute w-full mx-auto top-0 -translate-y-2/4 left-0 z-[51] text-center'>
        <div className='w-fit mx-auto'>
          <h1
            className={`${spaceGrotesk.className} backdrop-filter backdrop-blur-xl font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
            >
            International Space Station
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="z-50 w-[75%] -translate-x-20 border border-[--color-secondary] shadow-xl rounded-xl">
          <iframe
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
        </div>

        <div className="w-[45%]">
          <h1
            // className="text-[18px] md:text-[40px] font-bold text-center"
            className={`${spaceGrotesk.className} font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
          >
           <span className='text-red-600'>●</span> Live Feed
          </h1>
          {/* <h1 className="text-[18px] mr-20 md:text-[40px] font-bold text-center">Live</h1> */}
          {/* <h1 className="text-[18px] md:text-[40px] font-bold">International Space Station</h1> */}
          {/* <h1 className="text-[18px] md:text-[40px] font-bold text-center">ISS</h1> */}
          {/* <h1 className="text-[18px] ml-20 md:text-[40px] font-bold text-center">Feed</h1> */}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="z-50 -translate-x-20 translate-y-20 w-auto p-5 rounded-xl">
          <h1
            // className="text-[18px] md:text-[40px] font-bold text-center"
            className={`${spaceGrotesk.className} backdrop-filter backdrop-blur-xl font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
          >
            Live Tracking
          </h1>
          <SatelliteInfo className="w-[100%] h-full"/>
        </div>
        <div className="w-[65%] translate-x-20 translate-y-20 border border-[--color-secondary] shadow-xl rounded-xl backdrop-filter backdrop-blur-xl">
          <div id="map" className="w-full h-full aspect-video text-center">
            <MapWithNoSSR
              // lat={data.latitude}
              // lng={data.longitude}
              />
          </div>
        </div>
      </div>


    </section>
  )
}

export default FeedIss
