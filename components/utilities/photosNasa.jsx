"use client"
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

export async function fetchHrefHd() {
  const res = await fetch('https://images-api.nasa.gov/search?q=earth&description=International%Space%Station&media_type=image')
  console.log("x-rate-limit", res.headers)
  console.log("x-rate-limit", res.headers.get('x-rate-limit-remaining'))
  const data = await res.json()
  const photoShuffled = data.collection.items.sort(() => Math.random() - 0.5).slice(0, 5)
  const dataPhoto = await photoShuffled.map(async (i) => {
    const resHref = await fetch(`${i.href}`)
    const dataHref = await resHref.json()
    i['hrefHd'] = dataHref[2]
    return i
    // .then((res) => res.json())
    // .then((data) => {
    //   // console.log("data", data)
    //   i['hrefHd'] = data[2]
    //   // console.log("i", i)
  })
  return Promise.all(dataPhoto)
  // console.log("dataPhoto1", dataPhoto)
  // return {
  //   dataPhoto
  //   // props: {
  //   //   dataPhoto,
  //   // }
  // }
}

export default function PhotosNasa() {

  const [dataPhoto, setDataPhoto] = useState(null)
  const [isLoadingPhoto, setLoadingPhoto] = useState(true)

  useEffect(() => {
    fetchHrefHd()
    .then((dataPhoto) => {
      // console.log("dataPhoto2", dataPhoto)
      setDataPhoto(dataPhoto)
      setLoadingPhoto(false)
    })
  }, [])

  // useEffect(() => {
  //   fetch('https://images-api.nasa.gov/search?q=earth&media_type=image&year_start=2023', { next: { revalidate: 3600 } })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     const photoShuffled = data.collection.items.sort(() => Math.random() - 0.5).slice(0, 5)
  //     Promise.all(photoShuffled.map(async (i) => {
  //       await fetch(`${i.href}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // console.log("data", data)
  //         i['hrefHd'] = data[2]
  //         // console.log("i", i)
  //         return i
  //       })
  //       // const dataPhoto = await fetchPhotoHd(i)
  //       // console.log("iPhotoCollection", result)
  //     }))
  //     console.log("photoShuffled", photoShuffled)
  //     setDataPhoto(photoShuffled)
  //     setLoadingPhoto(false)

  //     // console.log("endResult", endResult)
  //     // setDataPhoto(endResult)
  //     // setLoadingPhoto(false)

  //     // return Promise.all(endResult)
  //     // return endResult
  //   })
  //   // .then((photoShuffled) => {

  //   //   console.log("photoShuffled", photoShuffled)
  //   //   setDataPhoto(photoShuffled)
  //   //   setLoadingPhoto(false)

  //   //   // console.log("endResult", endResult)
  //   //   // setDataPhoto(endResult)
  //   //   // setLoadingPhoto(false)
  //   // })
  // }, [])

  if (isLoadingPhoto) return <SwiperSlide>Photo Loading...</SwiperSlide>
  if (!dataPhoto) return <SwiperSlide>No Photo data</SwiperSlide>

  console.log("dataPhoto", dataPhoto)

  return (
    <>
      {dataPhoto.map((i) => (
        <SwiperSlide className="group relative min-h-0 h-auto" key={i.data[0].nasa_id}>
          <div className="group-hover:visible invisible absolute top-0 p-4 w-full text-center">
            <p>{i.hrefHd}</p>
            <p>{i.href}</p>
          </div>
          <img src={i.hrefHd} alt={i.hrefHd} className="object-cover h-full w-auto"/>
          <div className="group-hover:visible invisible absolute bottom-0 p-4 w-full text-center">
            <p className="mb-2">{}</p>
          </div>
        </SwiperSlide>
      ))}
    </>
  )
}
