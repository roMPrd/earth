// "use client"
// import { useState, useEffect } from 'react'

export default async function Apod() {

  // const [data, setData] = useState(null)
  // const [isLoading, setLoading] = useState(true)

  // useEffect(() => {
  //   // setInterval(() => {
  //     fetch('https://api.nasa.gov/planetary/apod?api_key=Ij3IqdUbofbbkuJUtaXzJAr7pSActeFVIWSTaWwu&count=5', { next: { revalidate: 3600 } })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data)
  //       setLoading(false)
  //     })
  //   // }, 5000)
  // }, [])

  // if (isLoading) return <p className="h-[100vh] w-full">Loading...</p>
  // if (!data) return <p className="h-[100vh] w-full">No data</p>

  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=Ij3IqdUbofbbkuJUtaXzJAr7pSActeFVIWSTaWwu', { next: { revalidate: 3600 } })
  const data = await response.json()

  console.log("x-rate-limit-photo", response.headers.get('X-RateLimit-Remaining'))
  console.log("dataphoto", data)

  return (


    <>
      <div className="h-[100dvh] w-full p-20 flex flex-col items-center">
        {/* {data.map((image) => (
          <div key={image.key} >
            <img src={image.url} alt={image.title} />
            <p>{image.title}</p>
          </div>
        ))} */}
        {/* <div className="p-20 h-full w-full"> */}

          <div className="group relative min-h-0 h-auto">
            <p className="group-hover:visible invisible absolute top-0 p-5 w-full text-center">{data.title}</p>
            <img src={data.hdurl} alt={data.title} className="object-cover h-full w-auto"/>
            <div className="group-hover:visible invisible absolute bottom-0 p-5 w-full text-center">
              <p className="mb-3">{data.explanation}</p>
              <p>{data.date} / {data.copyright}</p>
            </div>
          </div>
        {/* </div> */}
      </div>
    </>
  )
}
