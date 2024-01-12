
import Apod from '@components/utilities/apod'
import PhotosNasa from '@components/utilities/photosNasa'

export default function Photos() {

  return (
      <div className="h-[100dvh] w-full p-20 flex flex-col items-center">
        <Apod />
        <PhotosNasa />
      </div>
  )
}
