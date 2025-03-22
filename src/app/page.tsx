import logo from '@/../public/fein-ai-logo.svg'
import FlipTimer from '@/components/FlipTimer'
import JoinWaitlist from '@/components/JoinWaitlist'
import Image from 'next/image'

export default function Home() {

  const endDate = new Date('2025-06-03T00:00:00+05:30')
  return (
    <div className='flex flex-col items-center justify-center gap-10 h-screen'>
      <Image className='absolute sm:left-10 top-5 left-5' src={logo} alt="fein-ai" width={150} />
      <h1 className='text-2xl text-[#d7f48d] sm:text-4xl font-bold'>Countdown to June 3, 2025</h1>
      <FlipTimer endDate={endDate} />
      <JoinWaitlist />
      <p>Latest change</p>
    </div>
  )
}
