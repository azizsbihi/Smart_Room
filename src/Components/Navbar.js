import React from 'react'

export default function Navbar() {
  return (
    <nav className='py-4 px-4 flex flex-row shadow-lg'>
      <div className='text-2xl font-bold grow'>
        <p className='cursor-pointer w-fit'>SMART-ROOM</p>
      </div>
      <ul className='flex flex-row gap-10'>
        <li className='font-bold text-xl hover:scale-125 hover:text-primary duration-300 cursor-pointer'>Home</li>
        <li className='font-bold text-xl hover:scale-125 hover:text-primary duration-300 cursor-pointer'>Features</li>
        <li className='font-bold text-xl hover:scale-125 hover:text-primary duration-300 cursor-pointer'>Demo</li>
        <li className='font-bold text-xl hover:scale-125 hover:text-primary duration-300 cursor-pointer'>Reviews</li>
        <li className='font-bold text-xl hover:scale-125 hover:text-primary duration-300 cursor-pointer'>Contact</li>
      </ul>
    </nav>
  )
}
