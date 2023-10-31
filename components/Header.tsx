import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='flex justify-between sticky top-0 bg-white
    z-50 shadow-md'>
        {/* Left Side */}
        <div className='flex space-x-2 items-center'>
            <Image src="/open-ai-logo.png" alt="logo"
            height={30}
            width={30}
            />

            <div>
                <h1 className='font-bold'>RapidGuard <span className='text-violet-500'>AI 
                Generator</span></h1>
                <h2 className='text-xs'>
                    Powered by DALL-E 2, ChatGPT & Microsoft Azure
                </h2>
            </div>
        </div>

        {/* Right Side */}
        <div className='flex text-xs md:text-base divide-x items-center text-gray-500'>
          <Link href="" className='px-2 font-light text-right'>
            Join to create your own image
          </Link>
          <Link href="" className='px-2 font-light text-right'>
            Github Repo
          </Link>
        </div>
    </header>
  )
}

export default Header