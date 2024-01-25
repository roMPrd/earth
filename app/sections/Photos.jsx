"use client"

import AnimationSectionTitles from '@components/animations/animationSectionTitles';
import PhotoSection from '@components/utilities/photoSection';

import { spaceGrotesk } from "../fonts/spaceGrotesk";


export default function Photos() {

  return (

    <section className="relative w-full flex flex-col items-center gap-8 py-40 my-40 border border-[--color-secondary] rounded-xl min-h-[100vh]">

      <div className='absolute w-full mx-auto top-0 -translate-y-2/4 left-0 z-[51] text-center'>
        <AnimationSectionTitles
          duration={0.7}
          staggerChildren={0.2}
          divClassName="w-fit mx-auto backdrop-filter backdrop-blur-xl"
          spanClassName={`${spaceGrotesk.className} font-bold text-center leading-none tracking-tighter text-[30px] sm:text-[40px] md:text-[50px] lg:text-[65px]`}
          text={["Gallery"]}
        />
      </div>

      <PhotoSection />

    </section>
  )
}
