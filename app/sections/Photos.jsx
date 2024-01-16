"use client"
import Apod from '@components/utilities/apod'
// import PhotosNasa from '@components/utilities/photosNasa'
import AnimationLR from '@components/animations/animationLR';
import AnimationSectionTitles from '@components/animations/animationSectionTitles';
import AnimatedTitle from '@components/animations/animatedTitle';

import { motion } from "framer-motion";

import { useRef, useState, useEffect } from 'react'
import { spaceGrotesk } from "../fonts/spaceGrotesk";

// <---------- import icons ---------->
import { SlSizeFullscreen } from "react-icons/sl";
import { MdOutlineInfo } from "react-icons/md";

// <---------- core version + navigation, pagination modules ---------->
import { Swiper, SwiperSlide } from "swiper/react";
import {FreeMode, Navigation, Scrollbar, Pagination, Thumbs } from 'swiper/modules';

// <---------- import Swiper and modules styles ---------->
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';



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


  const dataApod = Apod()
  // const dataPhoto = PhotosNasa()

  const [dataPhoto, setDataPhoto] = useState(null)
  const [isLoadingPhoto, setLoadingPhoto] = useState(true)

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [swiper, setSwiper] = useState(0);
  const [paginationCustom, setPaginationCustom] = useState(0);

  useEffect(() => {
    fetchHrefHd()
    .then((dataPhoto) => {
      // console.log("dataPhoto2", dataPhoto)
      setDataPhoto(dataPhoto)
      setLoadingPhoto(false)
    })
  }, [])

  // useEffect(() => {
  //   // console.log("swiper", swiper.activeIndex)
  //   setPaginationCustom(swiper.activeIndex)
  //   // const pagin

  // }, [swiper])



  if (isLoadingPhoto) return <SwiperSlide>Photo Loading...</SwiperSlide>
  if (!dataPhoto) return <SwiperSlide>No Photo data</SwiperSlide>

  console.log("dataPhoto", dataPhoto)

  // console.log('useState', swiper)


  return (

    <section className="relative w-full flex flex-col items-center gap-8 py-40 my-40 border border-[--color-secondary] rounded-xl">

      <div className='absolute w-full mx-auto top-0 -translate-y-2/4 left-0 z-[51] text-center'>
        <AnimationSectionTitles
          duration={0.7}
          staggerChildren={0.2}
          divClassName="w-fit mx-auto backdrop-filter backdrop-blur-xl"
          spanClassName={`${spaceGrotesk.className} font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
          text={["Gallery"]}
        />
        {/* <div className='w-fit mx-auto'>
          <h1
            className={`${spaceGrotesk.className} backdrop-filter backdrop-blur-xl font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
            >
            Gallery
          </h1>
        </div> */}
      </div>


      {/* <div className="mySwiper2 w-[110%] h-[80vh] left-[-5%] border border-[--color-secondary] rounded-xl backdrop-filter backdrop-blur-xl"> */}

      <AnimatedTitle
          className="mySwiper2 w-[110%] h-[60vh] left-[-5%] border border-[--color-secondary] rounded-xl overflow-hidden"
          duration={1}
          scaleStart={1}
          scaleEnd={1}
          // borderRadiusStart={'50%'}
          // borderRadiusEnd={[ '50%', '50%','25%', '0.75rem']}
          // widthStart={'50%'}
          // widthEnd={[ '50%', '50%', '75%', '110%']}
          heightStart={'0vh'}
          // heightEnd={['20vh', '40vh', '60vh', '80vh']}
          heightEnd={'60vh'}
          children={
            <>
              <AnimationLR
                className="z-50 absolute top-[0] right-0 flex items-end"
                xStart={180}
                xEnd={0}
                yStart={0}
                yEnd={0}
                duration={1}
                delay={1}
                children={
                  <>
                  {/* <div className='z-50 absolute top-[0] right-0 flex items-end'> */}
                    <span className={`${spaceGrotesk.className} leading-none font-bold text-[] text-[40px] sm:text-[45px] md:text-[60px] lg:text-[240px]`}>
                      {paginationCustom + 1}
                    </span>
                    <span className={`${spaceGrotesk.className} leading-none font-bold text-[] text-[40px] sm:text-[45px] md:text-[60px] lg:text-[60px]`}>
                      /6
                    </span>
                    {/* </div> */}
                  </>
                }
              />

        {/* <AnimatedTitle
          className="w-full h-full rounded-xl mx-auto"
          duration={1}
          scaleStart={1}
          scaleEnd={1}
          // borderRadiusStart={'50%'}
          // borderRadiusEnd={[ '50%', '50%','25%', '0.75rem']}
          // widthStart={'50%'}
          // widthEnd={[ '50%', '50%', '75%', '110%']}
          heightStart={'0%'}
          // heightEnd={['20vh', '40vh', '60vh', '80vh']}
          heightEnd={'100%'}
          transformStart={'translateY(50%)'}
          transformEnd={'translateY(0%)'}
          // marginTopStart={'50%'}
          // marginTopEnd={'0%'}
          // marginBottomStart={'-50%'}
          // marginBottomEnd={'0%'}
          topStart={'50%'}
          topEnd={'0%'}
          opacityStart={1}
          opacityEnd={1}
          children={ */}
            <Swiper
              // thumbs={{ swiper:
              //   thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
              // }}
              onSwiper={setSwiper}
              onSlideChange={() => {setPaginationCustom(swiper.activeIndex), console.log("swiper", swiper.activeIndex)}}
              // loop={true}
              navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev'
                }}
              // pagination={{
              //   renderCustom: function (swiper, current, total) {
              //     // className = '{`${spaceGrotesk.className} absolute top-0 right-0 lg:w-[240px] font-bold text-[] text-[40px] sm:text-[45px] md:text-[60px] lg:text-[240px]`}'
              //     return current;
              //     return '<span class="' + className + '">' + current + '</span>';
              //   },
              //   el: '.swiper-pagination-custom',
              //   type: 'custom'
              // }}
              scrollbar={{
                el:'.swiper-scrollbar',
                hide: false,
                draggable: true}}
              modules={[Scrollbar, FreeMode, Navigation, Pagination]}
              className="mySwiper2 w-full h-full rounded-xl"
              // h-[100dvh] w-full p-20
              // flex flex-col items-center
            >

              {/* <SwiperSlide className="group min-h-0 h-auto"> */}
                <SwiperSlide key={0} className="group relative min-h-0 h-auto">
                  <SlSizeFullscreen  className='absolute top-0 left-0 text-[40px] m-4 '/>
                  <MdOutlineInfo className='absolute bottom-0 right-0 text-[40px] m-4 '/>

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
                {/* <Apod /> */}
              {/* </SwiperSlide> */}

              {dataPhoto.map((i, index) => (
                  <SwiperSlide className="group relative" key={index+1}>
                    <div className="group-hover:visible invisible absolute top-0 p-4 w-full text-center">
                      <p>{i.hrefHd}</p>
                      <p>{i.href}</p>
                    </div>
                    <img src={i.hrefHd} alt={i.hrefHd} className="object-cover h-full w-full"/>
                    <div className="group-hover:visible invisible absolute bottom-0 p-4 w-full text-center">
                      <p className="mb-2">{}</p>
                    </div>
                  </SwiperSlide>
              ))}

            </Swiper>
             </>
          }
        />
      {/* </div> */}


      <AnimationLR
        className="flex items-center px-8 gap-8 h-20 w-[110%] left-[-5%] backdrop-filter backdrop-blur-xl border border-[--color-secondary] rounded-xl"
        xStart={0}
        xEnd={0}
        yStart={-100}
        yEnd={0}
        duration={1}
        delay={1}
        children={
          <>
            {/* <div className='flex items-center px-8 gap-8 h-20 w-[110%] left-[-5%] backdrop-filter backdrop-blur-xl border border-[--color-secondary] rounded-xl'> */}
              <div className='thumbnails flex gap-1 '>
                {/* <Swiper
                  onSwiper={setThumbsSwiper}
                  // navigation={false}
                  spaceBetween={10}
                  slidesPerView={6}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper"
                >

                  <SwiperSlide key={0}>
                    <div className='h-[50px] w-[50px]'>
                      <img src={dataApod.hdurl} alt={dataApod.title} className="object-cover h-full w-full"/>
                    </div>
                  </SwiperSlide>

                  {dataPhoto.map((i, index) => (
                    <SwiperSlide className="group relative" key={index + 1}>
                      <div className='h-[50px] w-[50px]'>
                        <img src={i.links[0].href} alt={i.hrefHd} className="object-cover h-full w-full"/>
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper> */}

                <div className='h-[50px] w-[50px]' onClick={() => swiper.slideTo(0)}>
                  <img src={dataApod.hdurl} alt={dataApod.title} key={0} className={"object-cover h-full w-full border " + (paginationCustom === 0 ? '' : 'opacity-25 border-none')}/>
                </div>

                {dataPhoto.map((i, index) => (
                    // <div className="group relative" key={index + 1} onClick={() => swiper.slideTo(index + 1)}>
                      <div className='h-[50px] w-[50px]'  key={index + 1} onClick={() => swiper.slideTo(index + 1)}>
                        <img src={i.links[0].href} alt={i.hrefHd} className={"object-cover h-full w-full border " + (paginationCustom === index +1 ? '' : 'opacity-25 border-none')}/>
                      </div>
                    // </div>
                  ))}

              </div>

              <div className='swiper-scrollbar'>

              </div>
              <div className='navigation flex gap-4'>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </div>

              {/* <p>{swiper.activeIndex === null ? '' : swiper.activeIndex}</p> */}
            {/* </div> */}
          </>
        }
      />


    </section>
  )
}
