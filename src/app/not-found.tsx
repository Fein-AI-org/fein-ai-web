import React from 'react'
import FuzzyText from '@/components/ui/fuzzytext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center gap-10 h-screen w-screen'>
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize={150}
            >
                404
            </FuzzyText>
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
                fontSize={60}
            >
                not found
            </FuzzyText>
            <Link href='/' className=''>
                <Button variant="default" size='lg'>
                    Back to Home
                </Button>
            </Link>
        </div>
    )
}
