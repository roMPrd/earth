"use client"
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

export default function Apod() {

  const [dataApod, setDataApod] = useState(null)
  const [isLoadingApod, setLoadingApod] = useState(true)

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=Ij3IqdUbofbbkuJUtaXzJAr7pSActeFVIWSTaWwu', { next: { revalidate: 3600 } })
    .then((res) => res.json())
    .then((dataApod) => {
      // console.log("dataApod", dataApod)
      setDataApod(dataApod)
      setLoadingApod(false)
    })
  }, [])

  if (isLoadingApod) return <SwiperSlide>Apod Loading...</SwiperSlide>
  if (!dataApod) return <SwiperSlide>No Apod data</SwiperSlide>

  return (
      <SwiperSlide className="group relative min-h-0 h-auto">
        <div className="group-hover:visible invisible absolute top-0 p-4 w-full text-center">
          <p className="mb-0">Astronomy Picture of the Day:</p>
          <p>{dataApod.title}</p>
        </div>
        <img src={dataApod.hdurl} alt={dataApod.title} className="object-cover h-full w-full"/>
        <div className="group-hover:visible invisible absolute bottom-0 p-4 w-full text-center">
          <p className="mb-2">{dataApod.explanation}</p>
          <p>{dataApod.date} / © {dataApod.copyright}</p>
        </div>
      </SwiperSlide>
  )
}
