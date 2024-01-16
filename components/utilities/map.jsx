import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";

import { useState, useEffect } from 'react'


export default function Map() {
  // const position = await fetch_position()
  // console.log("position", position)

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setInterval(() => {
      fetch('/api/')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
    }, 5000)
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No data</p>


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
        url="
        https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png
        "
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
