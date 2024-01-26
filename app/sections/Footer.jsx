import AnimationLR from "@components/animations/animationLR"

export default function Footer() {

  const links = [
    { name: 'Mail', href: 'mailto:rom.delimal@gmail.com' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/romain-delimal/' },
    { name: 'Github', href: 'https://github.com/roMPrd' },
  ]
  return (
      <section className="h-fit w-full py-4 border-t border-[--color-secondary] z-50 bg-gradient-to-b from-[transparent] via-[--color-dark-transparent] to-[--color-dark] relative flex flex-col justify-center items-center">
        <div className='flex p-4'>
          {links.map((link, index) => (
            <AnimationLR
              xStart={0}
              xEnd={0}
              yStart={10}
              yEnd={0}
              duration={0.5}
              delay={ index * 0.3 }
              key={index}
              className="h-fit w-fit"
              children={
                <>
                {/* <div className="hover:scale-[1.2] backdrop-filter backdrop-blur-xl h-[200px] w-[200px] border border-[--var] rounded-full overflow-hidden flex justify-center items-center z-50 ">
                  {image}
                </div> */}
                {/* {index === links.lenght ? <p> | </p> } */}
                {links.length === index + 1 ?
                  <a href={link.href} target="_blank" className="cursorLarge hover:outline outline-1 outline-[--color-secondary] p-4 mx-4">{link.name}</a>
                  :
                  <>
                  <a href={link.href} target="_blank" className="cursorLarge hover:outline outline-1 outline-[--color-secondary] p-4 mx-4">{link.name}</a>
                  <span className="p4 mx-4"> | </span>
                  </>
                }
                </>
              }
            />
          ))}
        </div>

        <div className="w-fit h-fit p-4">
          <p>© 2024, Romain DELIMAL</p>
        </div>
      </section>

  )
}
