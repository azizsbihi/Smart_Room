import React from 'react'
import mockupImage from "../assets/mockup.png"
export default function LandingSection() {
  return (
    <section className='py-4 px-12 flex h-full'>
      <div className='grow flex flex-col mt-32'>
        <h1 className='text-7xl text-primary font-bold'>Smart room</h1>
        <p className='mt-9 leading-relaxed max-w-3xl text-xl tracking-wider'>
        Welcome to our smart home control application! With our app, you can easily control and automate your home from anywhere, at any time. Whether you want to adjust your thermostat, turn off the lights, or check on your security system, our app makes it easy to manage all of your smart home devices from a single, convenient interface. Plus, our intuitive design and user-friendly interface make it easy to get started, even if you're new to smart home technology. Try it out today and see how our app can make your life easier and more convenient.
        </p>
      </div>
      <div className='flex justify-center grow'>
        {<img alt='' src={mockupImage} className="scale-75 duration-200 shadow-2xl  rounded-3xl hover:scale-[80%] cursor-pointer  -skew-x-6 -skew-y-12 rotate-12"/>}
      </div>
    </section>
  )
}
