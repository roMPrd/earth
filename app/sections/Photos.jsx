"use client"
import Apod from '@components/utilities/apod'
import { useRef, useState, useEffect } from 'react'


// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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
  })
  return Promise.all(dataPhoto)
}

export default function Photos() {

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

  if (isLoadingPhoto) return <SwiperSlide>Photo Loading...</SwiperSlide>
  if (!dataPhoto) return <SwiperSlide>No Photo data</SwiperSlide>

  console.log("dataPhoto", dataPhoto)

  return (

    <div className="relative h-[100dvh] w-full">
      <Swiper
        navigation={true}
        pagination={{type: 'fraction'}}
        scrollbar={{hide: false, draggable: true}}
        modules={[Scrollbar, Navigation, Pagination]}
        className="mySwiper h-full w-full"
        // h-[100dvh] w-full p-20
        // flex flex-col items-center
      >

        <SwiperSlide className="group min-h-0 h-auto">
          <Apod />
        </SwiperSlide>

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

          {/* <PhotosNasa /> */}
        {/* </div> */}

        {/* <!-- If we need scrollbar --> */}
        {/* <div className="swiper-scrollbar"></div> */}
        {/* <div class="swiper-pagination"></div> */}

        {/* <!-- If we need navigation buttons --> */}
        {/* <div class="swiper-button-prev"></div> */}
        {/* <div class="swiper-button-next"></div> */}
      </Swiper>
    </div>
  )
}
