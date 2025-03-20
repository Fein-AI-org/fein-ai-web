import React from 'react'
import Image from 'next/image'
import logo from '../public/fein-ai-logo.svg'

export default function page() {
  return (
    <>
      <Image src={logo} alt='fein-ai-logo' height={200} width={400} />
    </>
  )
}
