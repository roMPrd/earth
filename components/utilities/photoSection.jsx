"use client"
import Apod from '@components/utilities/apod'
// import PhotosNasa from '@components/utilities/photosNasa'
import AnimationLR from '@components/animations/animationLR';
import AnimationSectionTitles from '@components/animations/animationSectionTitles';
import AnimatedTitle from '@components/animations/animatedTitle';

// import { motion } from "framer-motion";

import { useRef, useState, useEffect } from 'react'
// import { spaceGrotesk } from "@app/fonts/spaceGrotesk";
import { spaceGrotesk } from "../../public/fonts/spaceGrotesk";


// <---------- import icons ---------->
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineInfo } from "react-icons/md";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";

// <---------- core version + navigation, pagination modules ---------->
import { Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Navigation, Scrollbar, Pagination, Autoplay } from 'swiper/modules';

// <---------- import Swiper and modules styles ---------->
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';



export async function fetchHrefHd() {
  const res = await fetch('https://images-api.nasa.gov/search?q=earth&description=International%Space%Station&media_type=image')
  // console.log("x-rate-limit", res.headers)
  // console.log("x-rate-limit", res.headers.get('x-rate-limit-remaining'))
  const data = await res.json()
  const photoShuffled = data.collection.items.sort(() => Math.random() - 0.5).slice(0, 5)

  await Promise.all([res, data, photoShuffled])

  const dataPhoto = await photoShuffled.map(async (i) => {
    const resHref = await fetch(`${i.href}`)
    await Promise.all([resHref])
    const dataHref = await resHref.json()
    i['hrefHd'] = dataHref[2]
    return i
  })
  return Promise.all(dataPhoto)
}


export default function Photos() {


  const dataApod = Apod()
  // const dataPhoto = PhotosNasa()

  const [dataPhoto, setDataPhoto] = useState(null)
  const [isLoadingPhoto, setLoadingPhoto] = useState(true)

  // const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [swiper, setSwiper] = useState(0);
  const [paginationCustom, setPaginationCustom] = useState(0);

  const [fullscreen, setFullscreen] = useState(false);
  // console.log("fullscreen", fullscreen)

  const [infoBox, setInfoBox] = useState(false);

  useEffect(() => {
    fetchHrefHd()
    .then((dataPhoto) => {
      // console.log("dataPhoto2", dataPhoto)
      setDataPhoto(dataPhoto)
      setLoadingPhoto(false)
    })
  }, [])

  // if (isLoadingPhoto) return <SwiperSlide>Photo Loading...</SwiperSlide>
  // if (!dataPhoto) return <SwiperSlide>No Photo data</SwiperSlide>

  if (isLoadingPhoto) return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
  if (!dataPhoto) return (
    <div className='flex justify-center items-center min-h-[60vh]'>
      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  )
  // console.log("dataPhoto", dataPhoto)

  // console.log('useState', swiper)


  return (

    <>

      <AnimatedTitle
          className={"cursorLarge mySwiper2 border border-[--color-secondary] rounded-xl overflow-hidden " + (fullscreen ? ' fullscreenMode' : ' normalScreenMode h-[60vh]')}
          duration={1}
          scaleStart={1}
          scaleEnd={1}
          heightStart={'0vh'}
          heightEnd={'60vh'}
          children={
            <>
              <AnimationLR
                className="z-50 absolute top-0 right-0 flex items-end m-4 "
                xStart={100}
                xEnd={0}
                yStart={0}
                yEnd={0}
                duration={1}
                delay={1}
                children={
                  <>
                    <span className={`${spaceGrotesk.className} leading-none font-bold text-[3rem] md:text-[4rem] lg:text-[5rem]`}>
                      {paginationCustom + 1}
                    </span>
                    <span className={`${spaceGrotesk.className} leading-none font-bold text-[1.5rem] md:text-[2rem] lg:text-[2.5rem]`}>
                      /6
                    </span>
                  </>
                }
              />

            <Swiper
              onClick={() => (setInfoBox(infoBox => !infoBox))}
              onSwiper={setSwiper}
              onSlideChange={() => {setPaginationCustom(swiper.activeIndex)}}
              // loop={true}
              navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              scrollbar={{
                el:'.swiper-scrollbar',
                hide: false,
                draggable: true}}
              modules={[Scrollbar, FreeMode, Navigation, Pagination, Autoplay]}
              className="mySwiper2 w-full h-full rounded-xl"
            >

                <SlSizeFullscreen  className='cursorLarge absolute top-0 left-0 text-[40px] m-4 z-[50]' onClick={() => (setFullscreen(fullscreen => !fullscreen))} />
                <MdOutlineInfo className='cursorLarge absolute bottom-0 right-0 text-[40px] m-4 z-[50]' onClick={() => (setInfoBox(infoBox => !infoBox))}/>
                <BiChevronLeft className={"absolute m-4 z-[50] text-[5rem] top-[50%] left-0 " + (fullscreen ? "" : 'hidden') + (paginationCustom === 0 ? ' opacity-25 ' : ' cursorLarge ')} onClick={() => (swiper.slidePrev())} />
                <BiChevronRight className={"absolute m-4 z-[50] text-[5rem] top-[50%] right-0 " + (fullscreen ? "" : 'hidden') + (paginationCustom === 5 ? ' opacity-25 ' : ' cursorLarge ')} onClick={() => (swiper.slideNext())} />

                <SwiperSlide key={0} className="group relative min-h-0 h-auto">
                  {/* <---------- infoBox Title ----------> */}
                  <div className='absolute top-0 w-full'>
                    <AnimationLR
                      className={" mx-auto m-4 p-4 w-fit h-fit text-center bg-[--color-dark-transparent] backdrop-filter backdrop-blur border border-[--color-secondary] rounded-xl " + (infoBox ? '' : ' hideContent ')}
                      xStart={0}
                      xEnd={0}
                      yStart={'-1rem'}
                      yEnd={0}
                      duration={1}
                      delay={0}
                      children={
                        <>
                          <p className={`${spaceGrotesk.className} font-bold text-[1.5rem] lg:text[2rem] `}>
                            Astronomy Picture of the Day:
                          </p>
                          <p className={` font-bold text-[1.5rem] lg:text[2rem] `}>
                            {dataApod.title}
                          </p>
                        </>
                      }
                    />
                  </div>

                  {/* <---------- infoBox Description ----------> */}
                  <div className='absolute bottom-0 w-full px-4'>
                    <AnimationLR
                      className={"mx-auto m-4 p-4 w-fit h-fit bg-[--color-dark-transparent] backdrop-filter backdrop-blur border border-[--color-secondary] rounded-xl " + (infoBox ? '' : ' hideContent ')}
                      xStart={0}
                      xEnd={0}
                      yStart={'1rem'}
                      yEnd={0}
                      duration={1}
                      delay={0}
                      children={
                        <>
                          <p className={` mb-2 text-justify text-[0.7rem] lg:text[1rem]`}>
                            {dataApod.explanation}
                          </p>
                          <p className={`${spaceGrotesk.className} text-center text-[0.7rem] lg:text[1rem]`}>
                            {dataApod.date} / © {dataApod.copyright}
                          </p>
                        </>
                      }
                    />
                  </div>

                  {/* <---------- Image ----------> */}
                  <img src={dataApod.hdurl} alt={dataApod.title} className="object-cover h-full w-full"/>
                </SwiperSlide>

              {dataPhoto.map((i, index) => (
                  <SwiperSlide className="group relative" key={index+1}>
                    {/* <---------- infoBox Title ----------> */}
                    <div className='absolute top-0 w-full'>
                      <AnimationLR
                        className={" mx-auto m-4 p-4 w-fit h-fit text-center bg-[--color-dark-transparent] backdrop-filter backdrop-blur border border-[--color-secondary] rounded-xl " + (infoBox ? '' : ' hideContent ')}
                        xStart={0}
                        xEnd={0}
                        yStart={'-1rem'}
                        yEnd={0}
                        duration={1}
                        delay={0}
                        children={
                          <>
                            <p className={` font-bold text-[1.5rem] lg:text[2rem] `}>
                            {i.data[0].title}
                            </p>
                          </>
                        }
                      />
                    </div>

                    {/* <---------- infoBox Description ----------> */}
                    <div className='absolute bottom-0 w-full px-4'>
                      <AnimationLR
                        className={"mx-auto m-4 p-4 w-fit h-fit bg-[--color-dark-transparent] backdrop-filter backdrop-blur border border-[--color-secondary] rounded-xl " + (infoBox ? '' : ' hideContent ')}
                        xStart={0}
                        xEnd={0}
                        yStart={'1rem'}
                        yEnd={0}
                        duration={1}
                        delay={0}
                        children={
                          <>
                            <p className={` mb-2 text-justify text-[0.7rem] lg:text[1rem]`}>
                              {i.data[0].description}
                            </p>
                            <p className={`${spaceGrotesk.className} text-center text-[0.7rem] lg:text[1rem] `}>
                              {i.data[0].date_created} / © {i.data[0].photographer}
                            </p>
                          </>
                        }
                      />
                    </div>

                    <img src={i.hrefHd} alt={i.hrefHd} className="object-cover h-full w-full"/>
                  </SwiperSlide>
              ))}

            </Swiper>
             </>
          }
        />

      <AnimationLR
        className="flex justify-center items-center px-8 gap-8 h-20 w-[110%] left-[-5%] backdrop-filter backdrop-blur-xl border border-[--color-secondary] rounded-xl"
        xStart={0}
        xEnd={0}
        yStart={-100}
        yEnd={0}
        duration={1}
        delay={1}
        children={
          <>
              <div className='thumbnails flex gap-1 '>

                <div className='h-[50px] w-[50px]' onClick={() => swiper.slideTo(0)}>
                  <img src={dataApod.hdurl} alt={dataApod.title} key={0} className={"cursorLarge object-cover h-full w-full border " + (paginationCustom === 0 ? '' : 'opacity-25 border-none')}/>
                </div>

                {dataPhoto.map((i, index) => (
                    // <div className="group relative" key={index + 1} onClick={() => swiper.slideTo(index + 1)}>
                      <div className='h-[50px] w-[50px]'  key={index + 1} onClick={() => swiper.slideTo(index + 1)}>
                        <img src={i.links[0].href} alt={i.hrefHd} className={"cursorLarge object-cover h-full w-full border " + (paginationCustom === index +1 ? '' : 'opacity-25 border-none')}/>
                      </div>
                    // </div>
                  ))}

              </div>

              <div className='cursorLarge swiper-scrollbar hidden md:block'></div>

              <div className='navigation gap-4 hidden md:flex'>
                <div className={'cursorLarge ' + (fullscreen ? '' : "swiper-button-prev")}></div>
                <div className={'cursorLarge ' + (fullscreen ? '' : "swiper-button-next")}></div>
              </div>
          </>
        }
      />

    </>
  )
}
