import { useState, useEffect } from 'react'
// import fetchWTIA from '@components/utilities/fetchWTIA'


export default function satelliteInfo() {


  // ------------------------------------------------
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
      // convert seconds to milliseconds, then to UTC format
      // const timestamp = new Date(data.timestamp * 1000).toUTCString();
    }, 5000)
  }, [])

    // setInterval(() => {
    //   const data = fetchWTIA()
    //   if (data) {
    //     setData(data)
    //     setLoading(false)
    //   }
    //   console.log("data", data)
    //   // convert seconds to milliseconds, then to UTC format
    //   // const timestamp = new Date(data.timestamp * 1000).toUTCString();
    //   return data
    // }, 5000)


  // if (isLoading) return <p>Loading...</p>
  // if (!data) return <p>No data</p>

  // const data = setInterval(() => {
  //   fetchCoordinates()
  // }, 5000)

  // console.log("data", data)

  //------------------------------------------------

  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)

  // // const [dataCoordinates, setDataCoordinates] = useState(null)
  // // const [isLoadingCoordinates, setLoadingCoordinates] = useState(true)

  // useEffect(() => {
  //   setInterval(() => {
  //     fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
  //       .then((res) =>
  //       // {
  //         res.json()
  //       //   console.log("resTotal", res.headers)
  //       //   console.log("res-X-rate-limit", res.headers.get('x-rate-limit-remaining'))
  //       // }
  //       )
  //       .then((data) => {
  //         setData(data)
  //         setLoading(false)
  //         console.log("data", data)
  //         return data
  //         // fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
  //         // .then((res) => res.json())
  //         // .then((dataCoordinates) => {
  //         //   setDataCoordinates(dataCoordinates)
  //         //   setLoadingCoordinates(false)
  //         //   console.log("dataCoordinates", dataCoordinates)
  //         // })
  //       })

  //     console.log("dataFresh", data)

  //     fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
  //     .then((res) => res.json())
  //     .then((dataCoordinates) => {
  //         setDataCoordinates(dataCoordinates)
  //         setLoadingCoordinates(false)
  //         console.log("dataCoordinates", dataCoordinates)

  //       })

  //       // return timestamp = new Date(data.timestamp * 1000).toUTCString();
  //       // console.log("data", data)
  //   }, 5000)
  // }, [])


  // useEffect(() => {
  //   setInterval(() => {

  //     fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
  //     .then((res) => res.json())
  //     .then((dataCoordinates) => {
  //       setDataCoordinates(dataCoordinates)
  //       setLoadingCoordinates(false)
  //       console.log("data", dataCoordinates)

  //     })

  //   }, 5000)
  // }, [])

  // useEffect(() => {
  //   setInterval(() => {
  //     return timestamp = new Date(data.timestamp * 1000).toUTCString();
  //   }, 5000)
  // }, [])

  if (isLoading) return (
    <div className='ml-8 flex justify-center items-center min-h-[23rem]'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
  if (!data) return (
    <div className='ml-8 flex justify-center items-center min-h-[23rem]'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )

  // if (isLoadingCoordinates) return <p>Loading...</p>
  // if (!dataCoordinates) return <p>No dataCoordinates</p>

  function roundNumber(n) {
    return Math.round(n * 100) / 100
  }

  return (
    <div className='w-full lg:ml-8 text-[1rem] md:text-[1.2rem] xl:text-[1.5rem] min-h-[10rem] lg:min-h-[23rem] flex flex-col justify-center items-center lg:items-start '>
      <div className='w-full flex lg:flex-col justify-between items-center lg:items-start'>
        <div>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Name: </span> {data[0].name}</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Altitude: </span> {roundNumber(data[0].altitude)} km</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Velocity: </span> {roundNumber(data[0].velocity)} km/h</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Visibility: </span> {data[0].visibility}</p>
        </div>
        <div>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Latitude: </span> {roundNumber(data[0].latitude)}</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Longitude: </span> {roundNumber(data[0].longitude)}</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Country code :</span> {data[1].country_code}</p>
          <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Timezone: </span> {data[1].timezone_id}</p>
        </div>
      </div>
      {/* <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Offset: </span> {data[0].offset}</p> */}
      <p className="text-white backdrop-filter backdrop-blur-xl w-fit"> <span className='text-[--color-secondary]'>Time: </span> {data[2]}</p>
    </div>
  )
}
