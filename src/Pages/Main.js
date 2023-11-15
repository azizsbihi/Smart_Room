import React, { useEffect, useState } from 'react'
import {MdOutlineNotifications} from "react-icons/md"
import {AiFillCaretDown} from "react-icons/ai"
import { Wheel } from "@uiw/react-color";
import {AiFillLock, AiFillUnlock} from "react-icons/ai"
import {TiWeatherWindyCloudy} from "react-icons/ti"
import { useDispatch, useSelector } from 'react-redux';
import { loadDevices, lockDoor, setColor, turnOffLight, turnOnLight, unlockDoor } from '../controllers/device';
export default function Main() {

    


    const dispatch = useDispatch()


  const devices = useSelector(state => state.devicesReducer)

  const [devicesToUser, setDevicesToUser] = useState(devices);

  const connectedUser = useSelector(state => state.authReducer)

  const [firstRefresh, setFirstRefresh] = useState(true);

    useEffect(() => {
        if(connectedUser) dispatch(loadDevices(connectedUser._id))
    }, [connectedUser]);


    useEffect(()=>{
        console.log(devices)
        let first = 1
        setDevicesToUser(devices.map((dev)=>{
            if(first===1){
                return({...dev,isShown:true});
            }
            return({...dev,isShown:false});
            
        }))
    },[devices])

    const hideOthers = (deviceId) => {
        setDevicesToUser(devices.map((dev)=>{ 
            return({...dev,isShown:dev._id===deviceId});
        }))
    }
    
  return (
    <div className='px-7 py-3'>
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
        <div className='flex gap-9'>{devicesToUser.map((dev)=><p className='cursor-pointer hover:text-opacity-70 duration-150' onClick={()=>hideOthers(dev._id)}>{dev.deviceName}</p>)}</div>
        {devicesToUser.map((device,index)=><Device user={connectedUser} device={device} isShown={device.isShown}/>)}
    </div>
  )
}

const Device = ({isShown,device,user}) => {
    return(
        <>
            {isShown&&<>
                {/* <p>{device?.deviceName}</p> */}
                <div className='flex flex-row gap-6'>
                    <DoorState device={device}/>
                    <ColorState user={user} device={device}/>
                    <LockState device={device}/>
                </div>
                <div className='flex flex-row mt-9 h-full gap-6'>
                    <CurrentWeather/>
                    <CurrentDay/>
                </div>
            </>}
        </>
    )
}

const DoorState = ({device}) => {
    return(
        <div className='w-1/3 h-[450px]'>
                <div className='flex h-full flex-col items-center  bg-white p-4 rounded-xl hover:shadow-xl shadow-lg hover:scale-105 duration-150'>
                    <p className='self-start text-xl mb-7 font-bold'>Door State {device?.sensor?"true":"false"} {device?.deviceName}</p>
                    {device?.sensor&&<svg className='fill-sky-900' version="1.1" id="Capa_1" width={300} viewBox="0 0 492.5 492.5" >
                        <g>
                            <path d="M184.646,0v21.72H99.704v433.358h31.403V53.123h53.539V492.5l208.15-37.422v-61.235V37.5L184.646,0z M222.938,263.129
                                c-6.997,0-12.67-7.381-12.67-16.486c0-9.104,5.673-16.485,12.67-16.485s12.67,7.381,12.67,16.485
                                C235.608,255.748,229.935,263.129,222.938,263.129z"/>
                        </g>
                    </svg>}
                    {!device?.sensor&&<svg className='fill-sky-900' version="1.1" id="Capa_1" width={300} viewBox="0 0 492.5 492.5" >
                        <g>
                        <path d="M71.553,0v478.085l335.561,0.581V0H71.553z M103.109,446.583V31.558h272.445v56.813h-10.781V42.086H113.893v394.468
            h250.881V390.27h10.781v56.785L103.109,446.583z M364.773,137.459h10.781V341.18h-10.781V137.459z M165.787,239.32
            c0,9.148-7.418,16.566-16.568,16.566c-9.15,0-16.568-7.418-16.568-16.566c0-9.15,7.418-16.568,16.568-16.568
            C158.369,222.752,165.787,230.17,165.787,239.32z"/>
                        </g>
                    </svg>}
                </div>
            </div>
    )
}

const ColorState = ({device}) => {
    const [hex, setHex] = useState("#d0021b");
    const dispatch = useDispatch()

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          b: parseInt(result[2], 16),
          g: parseInt(result[3], 16)
        } : null;
      }


    return(
        <div className='w-1/3 h-[450px]'>
                <div className='flex h-full flex-col items-center  bg-white p-4 rounded-xl hover:shadow-xl shadow-lg hover:scale-105 duration-150'>
                    <p className='self-start text-xl mb-7 font-bold'>Color State</p>
                    <Wheel
                        color={hex}
                        onChange={(color) => {
                            setHex(color.hex);
                        }}
                        className="mt-8"
                    />
                     <div className='grow w-full flex flex-row'>
                        <button onClick={()=>dispatch(turnOnLight(device?.deviceId))} style={{backgroundColor:'whitesmoke'}} className='hover:scale-105 py-2 self-end  w-full mx-8  text-black rounded-xl'>Lights on</button>
                        <button onClick={()=>dispatch(turnOffLight(device?.deviceId))} style={{backgroundColor:`black`}} className='hover:scale-105 py-2 self-end  w-full mx-8  text-white rounded-xl'>Lights off</button>
                     </div>
                     <div className='grow w-full flex flex-row'>
                        <button onClick={()=>dispatch(setColor(device.deviceId,hexToRgb(hex)))}  style={{backgroundColor:`${hex}`}} className='hover:scale-105 py-2 self-end  w-full mx-8  text-white rounded-xl'>Set color</button>
                     </div>
                </div>
            </div>
    )
}

const LockState = ({device}) => {

    const dispatch = useDispatch()
    return(
        <div className='w-1/3 h-[450px]'>
                <div className='flex h-full flex-col items-center  bg-white p-4 rounded-xl hover:shadow-xl shadow-lg hover:scale-105 duration-150'>
                    <p className='self-start text-xl mb-7 font-bold'>Lock control</p>
                    <div className='flex flex-col gap-12'>
                        <AiFillUnlock onClick={()=>dispatch(unlockDoor(device.deviceId))} size={150} color="white" className='bg-sky-900 p-4 rounded-lg hover:scale-110 hover:bg-sky-700 duration-150 cursor-pointer'/>
                        <AiFillLock onClick={()=>dispatch(lockDoor(device.deviceId))} size={150} color="white" className='bg-sky-900 p-4 rounded-lg hover:scale-110 hover:bg-sky-700 duration-150 cursor-pointer'/>
                    </div>
                </div>
            </div>
    )
}

const CurrentWeather = () => {
    return(
        <div className='rounded-xl relative grow h-72 gap-5 flex bg-white shadow-lg hover:scale-105 duration-150 hover:shadow-xl items-center justify-center'>
            <p className='absolute top-5 left-5 text-xl'>This is the current temperature in <span className='font-bold'>Tunisia</span></p>
            <div className='mt-12 flex flex-row justify-center items-center'>
                <TiWeatherWindyCloudy size={200} className="fill-sky-900"/>
                <p className='text-8xl text-sky-900'><span>30</span>&deg;</p>
            </div>
        </div>
    )
}

const CurrentDay = () => {
    return(
    <div className='grid grid-cols-3 p-5 rounded-xl relative grow h-72 bg-white shadow-lg hover:scale-105 duration-150 hover:shadow-xl'>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>HIGH</p><p className='text-xl'>31<span>&deg;</span></p></div>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>FL HIGH</p><p className='text-xl'>27<span>&deg;</span></p></div>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>WIND</p><p className='text-xl'>9<span>Km/h</span></p></div>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>LOW</p><p className='text-xl'>19<span>&deg;</span></p></div>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>FL LOW</p><p className='text-xl'>12<span>&deg;</span></p></div>
        <div className='flex flex-col justify-center items-center'><p className='font-bold text-xl'>PRECIP</p><p className='text-xl'>0.1<span>mm</span></p></div>
    </div>
    )
}