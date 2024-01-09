import { useState, useEffect } from 'react'


export default function satelliteInfo() {

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

  console.log("data", data)

  function roundNumber(n) {
    return Math.round(n * 100) / 100
  }

  return (
    <div>
      <p className="text-white">Name: {data[0].name}</p>
      <p className="text-white">Altitude: {roundNumber(data[0].altitude)} km</p>
      <p className="text-white">Velocity: {roundNumber(data[0].velocity)} km/h</p>
      <p className="text-white">Visibility: {data[0].visibility}</p>
      <p className="text-white">Latitude: {roundNumber(data[0].latitude)}</p>
      <p className="text-white">Longitude: {roundNumber(data[0].longitude)}</p>
      <p className="text-white">Country code: {data[1].country_code}</p>
      <p className="text-white">Timezone: {data[1].timezone_id}</p>
      <p className="text-white">Offset: {data[1].offset}</p>
    </div>
  )
}
