// const map = L.map('map').setView([51.505, -0.09], 13);

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// import {
//   MapContainer,
//   TileLayer,
//   useMap,
// } from 'https://cdn.esm.sh/react-leaflet'

// import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
// import { TileLayer } from 'https://cdn.esm.sh/react-leaflet/TileLayer'
// import { useMap } from 'https://cdn.esm.sh/react-leaflet/hooks'
"use client"

import dynamic from "next/dynamic";
import SatelliteInfo from "@components/utilities/satellite_info";
import { useState, useEffect } from 'react'

// import fetch_position from "@components/utilities/fetch_position";

// export async function getData() {
//   const response = await fetch('http://localhost:3000/api/teams',
//     { cache: "no-cache" },
//     //  {method: "GET"}
//   );
//   return response.json();
// }

const FeedIss = () => {

  const MapWithNoSSR = dynamic(() => import("@components/utilities/map"), {
    ssr: false
  });

  return (
    <>
      <div className="h-[100vh] w-[100vw] p-10 flex ">
        {/* <span className="text-white">Feed Iss</span> */}

        <div className="w-[65%] h-full p-5 flex flex-col items-center justify-center">
          <iframe
            className="w-full aspect-video"
            // width="560"
            // height="315"
            src="https://www.youtube.com/embed/jPTD2gnZFUw?autoplay=1&si=HbMIjeYZOStV5va_"
            title="YouTube video player"
            frameborder="0"
            autoPlay="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
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
    </>
  )
}

export default FeedIss
