import { NextResponse } from 'next/server';

export const GET = async () => {

  try {

    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
    const data = await response.json()

    const responseCoordonate = await fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
    const dataCoordinates = await responseCoordonate.json()

    // convert seconds to milliseconds, then to UTC format
    const timestamp = new Date(data.timestamp * 1000).toUTCString();

    // Check the rate limit
    // console.log("headers", response.headers)
    console.log("x-rate-limit", response.headers.get('x-rate-limit-remaining'))
    console.log("x-rate-limit-Coordinates", responseCoordonate.headers.get('x-rate-limit-remaining'))


    return new NextResponse(JSON.stringify([data, dataCoordinates, timestamp]), { status: 200 });
  } catch (error) {
    return new NextResponse.json('Fetch error', { status: 500 });
  }

}
