import React from 'react'
import {NavLink} from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import {TbSmartHome} from "react-icons/tb"
import {BiDevices} from "react-icons/bi"
import {TiWeatherSunny} from "react-icons/ti"
import {AiOutlineCreditCard} from "react-icons/ai"
import {RiDashboardLine} from "react-icons/ri"
import {GrUserAdmin} from "react-icons/gr"
import { useDispatch } from 'react-redux'
import { logout } from '../controllers/auth'
export default function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const startlogout = () => {
        console.log("log out")
        dispatch(logout())
    }
  return (
    <div className='h-screen overflow-hidden'>
        <aside className="w-64 h-full" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3  rounded dark:bg-gray-800 h-full flex flex-col">
                <div className='flex flex-row gap-2  items-center mb-11'>
                    <TbSmartHome size={40} color="white" className='p-2 bg-sky-900 rounded-full'/>
                    <p className='text-xl'>Smart home</p>
                </div>
                <ul className="space-y-2">
                    <li>
                        <NavLink to="/Dashboard" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <RiDashboardLine size={30} color="gray" />
                        <span className="ml-3">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/devices" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <BiDevices size={30} color="gray" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Devices</span>
                        {/* <span className="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span> */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/weather" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <TiWeatherSunny size={30} color="gray" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Weather</span>
                        {/* <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">3</span> */}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/Dashboard/cards" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <AiOutlineCreditCard size={30} color="gray" />
                        <span className="flex-1 ml-3 whitespace-nowrap">Cards</span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <NavLink to="/Dashboard/admin" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                        <GrUserAdmin size={30} color="gray"/>
                        <span className="ml-4">Admin</span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700 flex-grow items-end flex w-full">
                    <li className='w-full'>
                        <button onClick={startlogout} to="/Dashboard/Products" className="w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group">
                        <svg className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd"></path></svg>
                        <span className="ml-3">Log out</span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className='overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-[100%] flex flex-col'>

            </div>
        </aside>
    </div>
  )
}
