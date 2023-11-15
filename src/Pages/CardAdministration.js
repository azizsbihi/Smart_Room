import React, { useState, useEffect } from 'react'
import {MdOutlineNotifications} from "react-icons/md"
import {AiFillCaretDown} from "react-icons/ai"
import {RiCloseFill} from "react-icons/ri"
import { useDispatch, useSelector } from 'react-redux';
import { changeUUIDMode, getDataToCopyMode, readDataMode, startBackToNormal, startNewCard, wipeCardDataMode, writeCopiedDataMode, writeDataIntoCardMode } from '../controllers/device';
import { addNewCard, deleteCards, loadCards } from '../controllers/card';
export default function CardAdministration() {
  const [inserted, setInserted] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [newCard, setnewCard] = useState({cardId:"",cardName:"",isValid:false});

  const dispatch = useDispatch()
  const connectedUser = useSelector(state => state.authReducer)
  const newCardData = useSelector(state => state.adminCardDataReducer)
  

  const [nameOnCard, setNameOnCard] = useState("");
  const [newUUID, setnewUUID] = useState("");


  useEffect(() => {
    if(connectedUser) dispatch(loadCards(connectedUser?._id))
  }, [connectedUser]);
  useEffect(() => {
    console.log(newCardData)
  }, [newCardData]);

  useEffect(() => {
    if(!connectedUser) return
    if(isSelecting){
      //dispatch(startNewCard(connectedUser?._id))
    }else{
      dispatch(startBackToNormal(connectedUser?._id))
    }
  }, [isSelecting,connectedUser]);

  useEffect(()=>{
    if(newCardData){
      setInserted(true)
      console.log("here")
      return
    }
    setInserted(false)
  },[newCardData])

  const startAddingNewCard = () => {
    console.log(newCard)
    dispatch(addNewCard(connectedUser?._id,newCard))
  }

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
      <div className='flex flex-row'>
        <div className='grow-[3] flex flex-col gap-8'>
            <button onClick={()=>{setIsSelecting(true);dispatch(readDataMode(connectedUser?._id))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Read data from card</button>
            <div><button onClick={()=>{setIsSelecting(true);dispatch(changeUUIDMode(connectedUser?._id,newUUID))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Change UUID of card</button><input value={newUUID} placeholder="New UUID of card" onChange={(e)=>setnewUUID(e.target.value)} className='rounded-full bg-transparent p-2'/></div>
            <div><button onClick={()=>{setIsSelecting(true);dispatch(writeDataIntoCardMode(connectedUser?._id, nameOnCard))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Write data into card</button><input value={nameOnCard} placeholder="New name on card" onChange={(e)=>setNameOnCard(e.target.value)} className='rounded-full bg-transparent p-2'/></div>
            <button onClick={()=>{setIsSelecting(true);dispatch(getDataToCopyMode(connectedUser?._id))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Get data to copy</button>
            <button onClick={()=>{setIsSelecting(true);dispatch(writeCopiedDataMode(connectedUser?._id))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">Write copied data</button>
            <button onClick={()=>{setIsSelecting(true);dispatch(wipeCardDataMode(connectedUser?._id))}} className="bg-blue-500 w-1/2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg">wipe card data</button>
        </div>
        <div className='grow h-full' style={{transition:"max-width 1s ease-in-out , max-height 1s ease-in-out", overflow:"hidden", maxWidth:!isSelecting?0:500, maxHeight:!isSelecting?0:800}}>
          <p className='text-xl font-bold' style={{transition:"opacity 1s ease-in-out",opacity:!isSelecting?0:1}}>Please insert your card</p>
          <div className='w-full p-20'>
            <div style={{backgroundColor:!inserted?"#0c4a6e":"white", animation:!inserted?"pulse 2s ease-in-out infinite":"pulse 2s ease-in-out"}} className='flex items-center justify-center rounded-2xl h-[600px] shadow-lg hover:shadow-xl hover:scale-105 duration-1000'>
              {inserted&&<div className='flex flex-col gap-4'>
                <p className='font-bold'>Device id : <span className='font-normal'>{newCardData?.deviceId}</span></p>
                <p className='font-bold'>UUID : <span className='font-normal'>{newCardData?.uuid}</span></p>
                <p className='font-bold'>Name written on card : <span className='font-normal'>{newCardData?.readData}</span></p>
                <p className='font-bold'>Card type : <span className='font-normal'>{newCardData?.cardType}</span></p>
              </div>}
              
              {/* <form className='w-full'>
                <p className='w-full text-center mb-3'>{newCard?.cardId}</p>
                <input className='w-full p-2' placeholder='card name' name='cardName' value={newCard?.cardName} onChange={(e)=>setnewCard({...newCard,[e.target.name]:e.target.value})}/>
                <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-sky-900 transition duration-150 ease-in-out"
                  name={"isValid"}
                  checked={newCard?.isValid}
                  onChange={(e)=>{console.log("salem");setnewCard({...newCard,isValid:!newCard?.isValid})}}
                />
                <label
                  className="ml-2 text-sm leading-5 text-gray-900 font-medium"
                >
                  Is valid
                </label>
              </div>
              </form> */}
            </div>
            <div className='mt-4 w-full flex flex-row justify-end items-center'>
              {isSelecting&&<button onClick={()=>setIsSelecting(false)} className='text-error background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Cancel</button>}
              {isSelecting&&<button onClick={()=>{setIsSelecting(false);startAddingNewCard()}} className='text-sky-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Save</button>}
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Card = ({card}) => {
  return(
    <tr>
      <td></td>
      <td>{card?.cardId}</td>
      <td>{card?.cardName}</td>
      <td><button onClick={()=>console.log(card?._id)} className='text-sky-900 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Edit</button></td>
      <td><ConfirmDelete card={card}/></td>
    </tr>
  )
}

const ConfirmDelete = ({card}) => {
  const [showModal, setShowModal] = React.useState(false);

  const dispatch = useDispatch()
  return(
    <>
    <button onClick={()=>setShowModal(true)} className='text-error background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Delete</button>

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
                  Delete this card! ({card?.cardName})
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
                <p>You will lose all of your data by deleting your account. This action cannot be undone.</p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-error background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-sky-900 text-white active:bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() =>{dispatch(deleteCards(card._id));setShowModal(false)}}
                >
                  Delete
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