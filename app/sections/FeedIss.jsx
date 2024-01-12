
"use client"

import dynamic from "next/dynamic";
import SatelliteInfo from "@components/utilities/satellite_info";


const FeedIss = () => {

  const MapWithNoSSR = dynamic(() => import("@components/utilities/map"), {
    ssr: false
  });

  return (

    <div className="h-[100vh] w-[100vw] p-10 flex ">

      <div className="w-[65%] h-full p-5 flex flex-col items-center justify-center">
        <iframe
          className="w-full aspect-video"
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

      <div className="w-[35%] h-full p-5 flex flex-col items-center justify-evenly">
        <div id="map" className="w-full aspect-video">
          <MapWithNoSSR
            // lat={data.latitude}
            // lng={data.longitude}
          />
        </div>
        <SatelliteInfo className="w-[50%]"/>
      </div>

    </div>
  )
}

export default FeedIss
