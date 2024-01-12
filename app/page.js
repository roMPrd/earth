import Image from 'next/image'
import HomePage from './sections/HomePage'
import FeedIss from './sections/FeedIss'
import Photos from './sections/Photos'

export default function Home() {
  return (
    <>
      <HomePage />
      <FeedIss />
      <Photos />
    </>
  )
}
