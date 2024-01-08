

const HomePage = () => {
  return (
    <>
      <div className="h-[100vh] w-[100vw]">
        <video
          src="assets/earth_video.mp4"
          className="h-full w-full object-cover"
          autoPlay="autoplay"
          loop="loop"
          muted="muted"
          preload="auto"
        >
        </video>
      </div>
    </>
  )
}

export default HomePage
