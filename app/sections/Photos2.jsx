"use client"
import Apod from '@components/utilities/apod'
import PhotosNasa from '@components/utilities/photosNasa'

import { useRef, useState } from 'react';

// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from 'swiper/modules';
// import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/react';
import 'swiper/css';
// import "swiper/swiper.min.css";
import 'swiper/css/scrollbar';
// import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import styles from './slider.module.scss'
import '../globals.css'



export default function Photos() {

  return (

    <div className="relative h-full">
      <Swiper
        navigation={true}
        pagination={{type: 'fraction'}}
        scrollbar={{hide: true, draggable: true}}
        modules={[Scrollbar, Navigation, Pagination]}
        className="mySwiper"
        // h-[100dvh] w-full p-20
        // flex flex-col items-center
      >
        {/* <div className="swiper-wrapper"> */}
        {/* <SwiperSlide className="h-full w-full">Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide> */}
        <SwiperSlide>
          <Apod />
        </SwiperSlide>
        
        <SwiperSlide>
          <PhotosNasa />
        </SwiperSlide>
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
