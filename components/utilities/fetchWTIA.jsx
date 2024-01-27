// import { useState, useEffect } from 'react'


// export default async function fetchWTIA() {

//   // const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
//   // const data = await response.json()
//   // // const headersList = await response.headers("X-Rate-Limit")
//   // const responseCoordinates = await fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
//   // const dataCoordinates = await responseCoordinates.json()
//   // // convert seconds to milliseconds, then to UTC format
//   // const timestamp = new Date(data.timestamp * 1000).toUTCString();
//   // // console.log(data)
//   // // console.log(timestamp)
//   // console.log("res", response.headers.get('x-rate-limit-remaining'))
//   // console.log("resCoordinates", responseCoordinates.headers.get('x-rate-limit-remaining'))

//   const [data, setData] = useState(null)
//   const [isLoading, setLoading] = useState(true)

//   const [dataCoordinates, setDataCoordinates] = useState(null)
//   const [isLoadingCoordinates, setLoadingCoordinates] = useState(true)

//   useEffect(() => {
//     // setInterval(() => {
//       fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//         console.log("data", data)
//       })

//       fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
//       .then((res) => res.json())
//       .then((dataCoordinates) => {
//         setDataCoordinates(dataCoordinates)
//         setLoadingCoordinates(false)
//         console.log("data", dataCoordinates)

//       })

//       return timestamp = new Date(data.timestamp * 1000).toUTCString();
//     // }, 5000)
//   }, [])

//   if (isLoading) return <p>Loading...</p>
//   if (isLoadingCoordinates) return <p>Loading...</p>
//   // if (!data) return <p>No data</p>

//   return (data, dataCoordinates, timestamp)
// }




import { NextResponse } from 'next/server';

 export default async function fetchWTIA() {


  // fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 10 } })
  // .then((res) => {
  //   if (res.ok) {
  //     console.log("resTotal", res.headers)
  //     console.log("x-rate-limit", res.headers.get('X-Rate-Limit'))
  //     return res.json()
  //   }
  //   console.log('Map fetch Iss error status:', res.status)
  //   return Promise.reject(res)
  // })
  // .then((data) => {
  //   fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 10 } })
  //   .then((resCoordinates) => {
  //     if (resCoordinates.ok) {
  //       // console.log("resCoordinates", resCoordinates.headers)
  //       return resCoordinates.json()
  //     }
  //     console.log('Map fetch Coordinates error status:', resCoordinates.status)
  //     return Promise.reject(res)
  //   })
  //   .then ((dataCoordinates) => {
  //     console.log("dataCoordinates", dataCoordinates)
  //     return dataCoordinates
  //   })
  //   .catch((err) => {
  //     console.log('Map fetch coordinates error:', err.message)
  //   })

  //   console.log("dataIss", data)
  //   return data

  // })
  // .catch((err) => {
  //   console.log('Map fetch Iss error:', err.message)
  // })

  // return Promise.all(data, dataCoordinates)

  // return [data, dataCoordinates, timestamp]


  try {

    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 10 } })
    const data = await response.json()

    await Promise.all([response, data])

    const responseCoordonate = await fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 10 } })
    const dataCoordinates = await responseCoordonate.json()

    // convert seconds to milliseconds, then to UTC format
    const timestamp = new Date(data.timestamp * 1000).toUTCString();

    // Check the rate limit
    // console.log("headers", response.headers)
    // console.log("x-rate-limit", response.headers.get('x-rate-limit-remaining'))
    // console.log("x-rate-limit-Coordinates", responseCoordonate.headers.get('x-rate-limit-remaining'))


    return new NextResponse(JSON.stringify([data, dataCoordinates, timestamp]), { status: 200 });
  } catch (error) {
    return new NextResponse.json('Fetch error', { status: 500 });
  }

 }
