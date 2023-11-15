import React, { useEffect, useState } from 'react'
import {AiOutlineEdit, AiFillLock} from "react-icons/ai"
import {BsLightbulb} from "react-icons/bs"
import {MdColorLens} from "react-icons/md"
import {MdOutlineNotifications} from "react-icons/md"
import {AiFillCaretDown} from "react-icons/ai"
import {VscSaveAs} from "react-icons/vsc"
import {RiCloseFill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux'
import { addDevice, loadDevices } from '../controllers/device'
export default function Devices() {

  const dispatch = useDispatch()


  const devices = useSelector(state => state.devicesReducer)

  const connectedUser = useSelector(state => state.authReducer)

    useEffect(() => {
        if(connectedUser) dispatch(loadDevices(connectedUser._id))
    }, [connectedUser]);


    useEffect(()=>{
        console.log(devices)
    },[devices])
    
  return (
    <div className='px-7 py-4 flex flex-col'>
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
      <div className='w-full flex items-center justify-end'>
        <AddDevice userId={connectedUser?._id}/>
      </div>
      <div className='grid gap-6 grid-cols-3'>
        {devices.map((device)=><Device device={device}/>)}
      </div>
    </div>
  )
}

const AddDevice = ({userId}) => {
  const [showModal, setShowModal] = React.useState(false);
  const [deviceId, setDeviceId] = useState("");
  useEffect(()=>{
    if(showModal){
      document.getElementById("devId").focus()
    }
  },[showModal])

  const dispatch = useDispatch()



  return(
    <>
    <button onClick={()=>setShowModal(true)} className='mb-6 bg-sky-900 text-white px-5 py-2 rounded-full text-xl hover:scale-105 duration-150 hover:bg-sky-700'>Add new device</button>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Congrats for the new device ! 😁😁😁
                </h3>
                <button
                  className="p-1 ml-auto  border-0 text-black float-right text-3xl leading-none font-semibold"
                  onClick={() => setShowModal(false)}
                >
                    <RiCloseFill size={30} className="fill-sky-900"/>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Please enter the ID provided on your device
                </p>
                <form>
                  <input id='devId' className='w-full' placeholder='Device ID' value={deviceId} onChange={(e)=>setDeviceId(e.target.value)}/>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-error background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-sky-900 text-white active:bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => {dispatch(addDevice(userId,deviceId));setShowModal(false)}}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </>
  )
}

const Device = ({device}) => {
  const [isEditing, setisEditing] = useState(false);
  const [deviceName, setDeviceName] = useState(device?.deviceName);
  useEffect(() => {
    if(isEditing){
      document.getElementById("toEdit").focus()
    }
  }, [isEditing]);
  return(
    <div className='relative overflow-y-visible rounded-lg p-4  bg-white h-96 shadow-lg hover:shadow-xl hover:scale-105 duration-150'>
          {device?.isConnected&&<div className='absolute bg-green-500 w-11 h-11 rounded-full -right-5 -top-5 shadow-2xl shadow-green-900'></div>}
          <div className='flex justify-between'>
            {!isEditing?<p className='mb-6 font-bold text-xl w-full'>{deviceName}</p>:<input id='toEdit' className='w-full mb-6 font-bold text-xl' placeholder='device name' value={deviceName} onChange={(e)=>setDeviceName(e.target.value)}/>}
            {!isEditing?<AiOutlineEdit onClick={()=>setisEditing(true)}  size={30} className="fill-sky-900 hover:fill-sky-700 hover:scale-105 duration-150 cursor-pointer"/>:<VscSaveAs onClick={()=>setisEditing(false)} size={30} className="fill-sky-900 hover:fill-sky-700 hover:scale-105 duration-150 cursor-pointer"/>}
          </div>
          <div className='gap-6 grid grid-cols-3'>
            <div className='h-40 rounded-lg bg-gray-300 flex justify-center items-center'>
              <BsLightbulb size={100} className='fill-sky-900'/>
            </div>
            <div className='h-40 rounded-lg bg-gray-300 flex justify-center items-center'>
              <AiFillLock size={100} className='fill-sky-900'/>
            </div>
            <div className='h-40 rounded-lg bg-gray-300 flex justify-center items-center'>
              <MdColorLens size={100} className='fill-sky-900'/>
            </div>
          </div>
        </div>
  )
}
