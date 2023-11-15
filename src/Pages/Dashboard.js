import React, { useEffect } from 'react'
import { Outlet, useNavigate} from "react-router-dom";
import Sidebar from '../Components/Sidebar';
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { setNewAdminCardData, setNewCardData } from '../controllers/card';
import { updateDevice } from '../controllers/device';
import { showError } from '../controllers/error';


export default function Dashboard() {

  let socket 
  const connectedUser = useSelector(state => state.authReducer)
  const navigate = useNavigate()


  const dispatch = useDispatch()


  useEffect(() => {

    if(!connectedUser ) navigate("/auth")
    if(connectedUser && !socket?.connected) {
      socket = io('http://localhost:5000');
      socket.on("connect",()=>{
        console.log("Connected")
        socket.emit("NEW_USER_CONNECTED",connectedUser._id)
      })
      socket.on("GET_NEW_CARD_DATA",(newCardData)=>{
        dispatch(setNewCardData(newCardData.uuid,newCardData.deviceId))
      })
      socket.on("DOOR_CLOSED",(userId)=>{
        dispatch(updateDevice(userId))
      })
      
      socket.on("DOOR_OPENED",(userId)=>{
        dispatch(updateDevice(userId))
      })

      socket.on("SEND_READ_DATA",({deviceId,readData,uuid,cardType})=>{
        console.log(deviceId,readData,uuid,cardType)
        dispatch(setNewAdminCardData(deviceId,readData,uuid,cardType))
      })

      socket.on("ERROR",error=>{
        console.log(error)
        dispatch(showError(error))
      })
    }
  }, [connectedUser]);




  return (
    <div className='flex'>
        <Sidebar/>
          <div className='flex-grow bg-gray-100'>
          <Outlet/>
        </div>
    </div>
  )
}
