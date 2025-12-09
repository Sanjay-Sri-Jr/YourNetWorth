"use client";
import Link from 'next/link'
import { Button } from './ui/button'
import Image from 'next/image';


const HeroSection = () => {
  return <div className='pb-20 px-4'>
    <div className='container mx-auto text-center'>
        <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-8 gradient-title'>Track Your Finances <br /> with Intelligence</h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mt-4 mx-auto '>
            An AI - powered personal finance app that helps you manage your net worth, track expenses, and achieve financial goals effortlessly.
        </p>
        <div className='flex justify-center space-x-4 mb-8'>
            <Link href="/dashboard">
              <Button size="lg" className="px-8 btn-gold">
                Get Started
              </Button>
            </Link>
             <Link href="/demo">
              <Button size="lg" variant="outline" className="px-8 btn-gold-outline hover:text-white">
                Demo
              </Button>
            </Link>           
        </div>
        <div className='max-w-5xl mx-auto'>
            <div > 
                <Image src='/dashboard(1).jpg'
                 alt='Dashboard Image' 
                 width={1280} height={720} 
                 className='rounded-lg mx-auto shadow-2xl border border-gray-200' 
                 priority
                 />
            </div>
        </div>
    </div>
  </div>
  
}

export default HeroSection