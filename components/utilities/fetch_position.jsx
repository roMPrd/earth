import React from 'react'

export default async function fetch_position() {

  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544', { next: { revalidate: 5 } })
    const data = await response.json()
    // console.log(data)
    return data
  }
  catch (error) {
    console.log(error.message)
  }
}
