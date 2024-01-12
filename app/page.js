import Image from 'next/image'
import HomePage from './sections/HomePage'
import FeedIss from './sections/FeedIss'
import Apod from './sections/Apod'

export default function Home() {
  return (
    <>
      <HomePage />
      <FeedIss />
      <Apod />
    </>
  )
}
