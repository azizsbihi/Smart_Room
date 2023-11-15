import React, { useEffect } from 'react'
import {MdOutlineNotifications} from "react-icons/md"
import {AiFillCaretDown} from "react-icons/ai"
import {RiMapPinLine} from "react-icons/ri"
import {BsFillSunFill} from "react-icons/bs"
import {IoWaterOutline} from "react-icons/io5"
import {TiWeatherWindy} from "react-icons/ti"
import {CiCompass1} from "react-icons/ci"
import { useSelector } from 'react-redux'
export default function Weather() {

  const connectedUser = useSelector(state => state.authReducer)

    useEffect(() => {
        
    }, [connectedUser]);

  return (
    <div className='px-7 py-4'>
      <div className='flex flex-row items-center mb-9'>
          <p className='grow text-4xl'>Welcome <span className='font-bold'>{connectedUser?.name}</span> !</p>
          <div className='flex flex-row items-center gap-9'>
              <MdOutlineNotifications size={30} color="gray"/>
              <div className='flex flex-row items-center gap-2'>
                  <AiFillCaretDown size={20} color="gray"/>
                  <p>{connectedUser?.name}</p>
                  <div className='w-11 h-11 rounded-full bg-sky-900'></div>
              </div>
          </div>
      </div>
      <div className='flex flex-row gap-6'>
        <div className='grow flex-col'>
          <div className='p-6 flex flex-row gap-6 bg-sky-100 rounded-lg'>
            <div className='flex flex-col grow'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <RiMapPinLine size={20} className="fill-sky-900"/>
                  <p className='text-xl text-sky-900 font-bold'>Bizerte, Tunisia</p>
                </div>
                <p className='text-xl text-sky-900'>31/12/2022</p>
              </div>
              <div className='flex flex-col justify-center items-center text-sky-900'>
                <p className='text-9xl'>14<span>&deg;</span></p>
                <p className='text-xl -translate-x-4 mt-3'>Mostly clear</p>
              </div>
              <div className='flex justify-around mt-6'>
                <div className='flex gap-2 items-center'>
                  <BsFillSunFill size={20} className='fill-sky-900'/>
                  <p className='text-sky-900 text-lg'>LOW</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <IoWaterOutline size={20} className='fill-sky-900'/>
                  <p className='text-sky-900 text-lg'>32%</p>
                </div>
                <div className='flex gap-2 items-center'>
                  <TiWeatherWindy size={20} className='fill-sky-900'/>
                  <p className='text-sky-900 text-lg'>12Km/h</p>
                </div>
              </div>
            </div>
            <div className='grow p-4 bg-sky-50 flex flex-col justify-between rounded-lg'>
              <p className='text-2xl font-bold text-sky-900'>Temperature</p>
              <div className='grid grid-cols-4'>
                <div className='flex flex-col justify-center items-center'><p className='text-lg'>Morning</p><p className='font-bold text-lg'>15&deg;</p></div>
                <div className='flex flex-col justify-center items-center'><p className='text-lg'>Afternoon</p><p className='font-bold text-lg'>14&deg;</p></div>
                <div className='flex flex-col justify-center items-center'><p className='text-lg'>Evening</p><p className='font-bold text-lg'>16&deg;</p></div>
                <div className='flex flex-col justify-center items-center'><p className='text-lg'>Night</p><p className='font-bold text-lg'>12&deg;</p></div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6 py-4'>
            <div className='bg-gray-200 bg-opacity-80 rounded-xl py-6 h-40 flex justify-around items-center'>
              <div>
                <p className='text-lg'>Wind</p>
                <p className='text-lg font-light'>Today wind is heavy</p>
                <p className='text-lg'>12km/h</p>
              </div>
              <div>
                <CiCompass1 size={130} className="p-5 fill-sky-900 border-sky-900 border-2 rounded-full"/>
              </div>
            </div>
            <div className='bg-gray-200 bg-opacity-80 rounded-xl py-6 h-40 flex justify-around items-center'>
              <div>
                <p className='text-lg'>Wind</p>
                <p className='text-lg font-light'>Today wind is heavy</p>
                <p className='text-lg'>12km/h</p>
              </div>
              <div>
                <CiCompass1 size={130} className="p-5 fill-sky-900 border-sky-900 border-2 rounded-full"/>
              </div>
            </div>
            <div className='bg-gray-200 bg-opacity-80 rounded-xl py-6 h-40 flex justify-around items-center'>
              <div>
                <p className='text-lg'>Wind</p>
                <p className='text-lg font-light'>Today wind is heavy</p>
                <p className='text-lg'>12km/h</p>
              </div>
              <div>
                <CiCompass1 size={130} className="p-5 fill-sky-900 border-sky-900 border-2 rounded-full"/>
              </div>
            </div>
            <div className='bg-gray-200 bg-opacity-80 rounded-xl py-6 h-40 flex justify-around items-center'>
              <div>
                <p className='text-lg'>Wind</p>
                <p className='text-lg font-light'>Today wind is heavy</p>
                <p className='text-lg'>12km/h</p>
              </div>
              <div>
                <CiCompass1 size={130} className="p-5 fill-sky-900 border-sky-900 border-2 rounded-full"/>
              </div>
            </div>
          </div>
        </div>
        <div className='w-2/6'>
          <p className='text-lg font-bold'>Today</p>
          <div className='scrollbar-thin gap-5 flex flex-row overflow-x-auto'>
            <div className=' flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className=' flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className=' flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className=' flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
            <div className='flex flex-col justify-center items-center bg-sky-400 px-5 py-3 rounded-xl'>
              <p>Now</p>
              <BsFillSunFill size={30} className="fill-yellow-200"/>
              <p>24&deg;</p>
            </div>
          </div>
          <div className='flex flex-col overflow-y-auto mt-6 gap-6'>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
              <div className='flex flex-col justify-between'>
                <p>Tomorrow</p>
                <p className='font-thin'>12 Apr</p>
              </div>
              <p className='text-xl font-bold'>16&deg;</p>
              <BsFillSunFill size={60} className="fill-yellow-200"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
