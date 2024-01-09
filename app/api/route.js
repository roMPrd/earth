import { NextResponse } from 'next/server';

export const GET = async () => {

  try {

    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
    const data = await response.json()
    const responseCoordonate = await fetch(`https://api.wheretheiss.at/v1/coordinates/${data.latitude},${data.longitude}`, { next: { revalidate: 5 } })
    const dataCoordinates = await responseCoordonate.json()
    // console.log(data)

    return new NextResponse(JSON.stringify([data, dataCoordinates]), { status: 200 });
  } catch (error) {
    return new NextResponse.json('Fetch error', { status: 500 });
  }

}
