import Image from 'next/image'
import HomePage from './sections/HomePage'
import FeedIss from './sections/FeedIss'

export default function Home() {
  return (
    <>
      <HomePage />
      <FeedIss />
    </>
  )
}
