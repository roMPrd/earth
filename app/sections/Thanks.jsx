import AnimationSectionTitles from '@components/animations/animationSectionTitles';
import AnimationLR from '@components/animations/animationLR';
import { spaceGrotesk } from "../fonts/spaceGrotesk";

export default function Thanks() {

  const images = [
    <img src="assets/nasa.png" alt="nasa-logo" />,
    <img src="assets/wtia.png" alt="wtia-logo" />,
    <img src="assets/leaflet.png" alt="leaflet-logo" />,
    <img src="assets/osm.png" alt="osm-logo" />,
  ]
  return (

    <section className="relative w-full flex flex-col items-center gap-8 py-[7.5rem] my-40 border border-[--color-secondary] rounded-xl">

      <div className='absolute w-full mx-auto top-0 -translate-y-2/4 left-0 z-[51] text-center'>
        <AnimationSectionTitles
          duration={0.7}
          staggerChildren={0.2}
          divClassName="w-fit mx-auto backdrop-filter backdrop-blur-xl"
          spanClassName={`${spaceGrotesk.className} font-bold text-center leading-none tracking-tighter text-[40px] sm:text-[45px] md:text-[60px] lg:text-[80px]`}
          text={["Special Thanks"]}
        />
      </div>

      <div className="absolute bottom-0 translate-y-1/2 w-full flex justify-around items-center gap-4 p-4">
        {images.map((image, index) => (
          <AnimationLR
            xStart={0}
            xEnd={0}
            yStart={100}
            yEnd={0}
            duration={0.5}
            delay={ index * 0.3 }
            key={index}
            className="h-full"
            children={
              <div className="[bg-[--color-dark]] hover:scale-[1.2] backdrop-filter backdrop-blur-xl max-h-[200px] aspect-square ease-linear hover:border border-[--color-secondary] rounded-full overflow-hidden flex justify-center items-center z-50 ">
                {image}
              </div>
            }
          />
        ))}
      </div>

    </section>
  )
}
