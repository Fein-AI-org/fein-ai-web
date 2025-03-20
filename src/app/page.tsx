import React from 'react'
import FlipTimer from '@/components/FlipTimer'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import logo from '@/../public/fein-ai-logo.svg'
import JoinWaitlist from '@/components/JoinWaitlist'

export default function Home() {

  const endDate = new Date('2025-04-01T00:00:00+05:30')
  return (
    <div className='flex flex-col items-center justify-center gap-10 h-screen'>
      <Image className='absolute sm:left-10 top-5 left-5' src={logo} alt="fein-ai" width={150} />
      <h1 className='text-2xl sm:text-4xl font-bold'>Countdown to April 1, 2025</h1>
      <FlipTimer endDate={endDate} />
      <JoinWaitlist />
    </div>
  )
}
