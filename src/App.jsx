import React from 'react'
import { useEffect,useRef,useState } from 'react'
import Confetti from 'react-confetti';
import success from '../public/success.mp3';

const App = () => {
     
    const [count, setCount] = useState(0);
    const intervalref=useRef(null);
    const [status, setstatus] = useState('Start Download')
    const [showEffect, setshowEffect] = useState(false)
    const successAudio = new Audio('/success.mp3');



    const downloadHandler=()=>{
      if(intervalref.current)return;
      setstatus('downloading.....');
      intervalref.current=setInterval(() => {
        setCount((prev)=>{
          if(prev>=100){
          clearInterval(intervalref.current);
          intervalref.current = null;
          setstatus('Downloaded');
          setshowEffect(true);
          successAudio.play();
          return 100;
          }
          else{
            return prev+1;
          }
        })
      }, 50);
    }
    useEffect(()=>{
      return()=>{
        clearInterval(intervalref.current);
      }
    },[]);
    const btntext=()=>{
      if(status==='Start Download'){
        return 'Start Download';
      }
      else if(status==='downloading.....'){
        return 'Downloading.....';
      }
      else {
        return 'Downloaded';
      }
    }
    useEffect(()=>{
      if(showEffect){
        const timer=setTimeout(()=>{
          setshowEffect(false);
        },5000);
          return () => clearTimeout(timer);
      }
    },[showEffect]);


  return (
    <div className='w-full h-screen relative bg-gray-900 items-center flex justify-center'>
           {showEffect && <Confetti />}
      <div className='flex flex-col absolute top-30 items-center'>
          <h1 className='text-[160px] bg-linear-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent '>THe SKy</h1>
         <div className='bg-cyan-950 w-120 rounded-2xl pt-5 pb-5 flex gap-4 flex-col px-5'>
        <div className='w-full h-6 flex flex-row gap-2 items-center '>
            <div className='w-full h-6 bg-cyan-800 overflow-hidden rounded-2xl'>
            <div className='h-full bg-cyan-600 rounded-full'
            style={{width:`${count}%`}}
            ></div>
          </div>
          <h1 className='text-white'>{count}%</h1>
        </div>
         <div className='flex items-center justify-between flex-row w-full'>
           <h1 className='text-white'>MP3.mp</h1>
         <button onClick={() => downloadHandler()}
         disabled={status==='downloading.....'|| status==='Downloaded'}
          className='text-white px-2 py-2 bg-cyan-600 rounded-2xl disabled:opacity-50'>{btntext()}</button>
         </div>
         </div>
      </div>
    </div>
  )
}

export default App