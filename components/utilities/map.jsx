import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import { useState, useEffect } from 'react'
// import fetchWTIA from './fetchWTIA';
import fetchWTIA from '@components/utilities/fetchWTIA'

export default function Map() {
  // const position = await fetch_position()
  // console.log("position", position)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  // const apiKey = `${process.env.STADIA_MAP_API_KEY}`

  useEffect(() => {
    setInterval(() => {
      // fetch('/api/')
      // fetch('https://earth-livid.vercel.app/api/')
      fetchWTIA()
      .then((res) => res.json())
      .then((data) => {
        if (!data[0].ok) {
          // console.log("ERROR 429 FROM MAP", data[0].status)
          throw Error(data.statusText);
        }
        else {
          // console.log("data from map", data)
          setData(data)
          setLoading(false)
        }
      })
      .catch((err) => console.log('Map fetch error from map:', err.message))
    }, 10000)
  }, [])

  if (isLoading) return (
    <div id="" className="w-full h-full aspect-video text-center flex justify-center items-center">
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
  if (!data) return (
    <div className='w-full h-full aspect-video text-center flex flex-col justify-center items-center'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      <p>No data</p>
    </div>
  )


  return (
    <MapContainer
      center={[data[0].latitude, data[0].longitude]}
      zoom={2}
      scrollWheelZoom={false}
      style={{height: "100%", width: "100%"}}
      className='cursorLarge rounded-xl'
    >
      <TileLayer
        className='cursorLarge'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url=
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
        
        // https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
      />
      <Marker
        className='cursorLarge'
        position={[data[0].latitude, data[0].longitude]}
        draggable={false}
        animate={true}
      >

        <Popup className='cursorLarge'>
          ISS is here!
        </Popup>

      </Marker>
    </MapContainer>
  )
}


// export default Map
