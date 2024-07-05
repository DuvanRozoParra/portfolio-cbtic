"use client"
import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import { Button } from '../../components/ui/button';

const notify = () => toast(
   <div>
     <span className='  flex justify-center items-center flex-col '>
       <img src="/images/rectilineo.gif" alt="rectilineo" className='relative w-2/3 h-1/3'></img>
       <p className='relative font-semibold bottom-5'>¿Qué es la trayectoria rectilínea?</p>
        <p>Es cuando el objeto sigue una línea recta durante su movimiento, los cuerpos que tienen este tipo de movimiento se dice que tienen un movimiento rectilíneo, por ejemplo: La caída de un objeto.</p>
     </span>
   </div>,
   {
    duration: 2000,
  
    // Styling
    style: {},
    className: '',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  }
);
const notify2 = () => toast(
  <div>
    <span className='  flex justify-center items-center flex-col '>
      <img src="/images/teorema_acotacion.jpg" alt="rectilineo" className='relative w-2/3 h-1/3'></img>
      <p className='relative font-semibold bottom-2'>¿Qué es Acotado?</p>
       <p>Con topes o límites por alguno de sus lados o todos ellos, de manera que no se puede salir de ese espacio resultante.</p>
    </span>
  </div>,
  {
   duration: 2000,
 
   // Styling
   style: {},
   className: '',
 
   // Change colors of success/error/loading icon
   iconTheme: {
     primary: '#000',
     secondary: '#fff',
   },
 
   // Aria
   ariaProps: {
     role: 'status',
     'aria-live': 'polite',
   },
 }
);

const notify3 = () => toast(
  <div>
    <span className='  flex justify-center items-center flex-col '>
      <img src="/images/periodico.gif" alt="rectilineo" className='relative w-2/3 h-1/3'></img>
      <p className='relative font-semibold bottom-1'>¿Qué es Movimiento periodico?</p>
       <p>Se denomina movimiento periódico a todo aquél que se repite a intervalos regulares de tiempo. Ej. Péndulo, rotación de la tierra en torno al Sol, movimiento de las manecillas de un reloj, etc.</p>
    </span>
  </div>,
  {
   duration: 2000,
 
   // Styling
   style: {},
   className: '',
 
   // Change colors of success/error/loading icon
   iconTheme: {
     primary: '#000',
     secondary: '#fff',
   },
 
   // Aria
   ariaProps: {
     role: 'status',
     'aria-live': 'polite',
   },
 }
);
const notify4 = () => toast(
  <div>
    <span className='  flex justify-center items-center flex-col '>
      <img src="/images/Mov_Variable.gif" alt="rectilineo" className='relative w-2/3 h-1/3'></img>
      <p className='relative font-semibold bottom-5'>¿Qué es Variable?</p>
       <p>se refiere al acto de cambiar de posición o ubicación, y sus variables incluyen distancia, desplazamiento, velocidad, velocidad y aceleración. </p>
    </span>
  </div>,
  {
   duration: 2000,
 
   // Styling
   style: {},
   className: '',
 
   // Change colors of success/error/loading icon
   iconTheme: {
     primary: '#000',
     secondary: '#fff',
   },
 
   // Aria
   ariaProps: {
     role: 'status',
     'aria-live': 'polite',
   },
 }
);


export default function page_pendulum() {
  return (
    <main className='flex flex-col p-8 gap-5 bg-[#f8f8f8]'> 
      <div className='w-full h-screen flex justify-center items-center flex-col gap-4 bg-[#f8f8f8]'>
        <div className= 'w-[40%] h-3/4 relative bg-[#D9D9D9] bottom-20 rounded-3xl -left-36 flex justify-center items-center flex-col'>
              <p className='relative bottom-[20%] text-3xl font-bold'>Oscilaciones mecánicas</p>
              <p className='relative px-14 left-4 bottom-[18%] text-base'>
                Se llama movimiento oscilatorio mecánico a todo cambio de posición que posee una
                <span 
                  className='underline cursor-pointer ml-1' 
                  onClick={notify}
                >
                   trayectoria rectilínea
                </span>
                <span 
                  className='underline cursor-pointer ml-2' 
                  onClick={notify2}
                >
                   ,es acotado
                </span>
                <span 
                  className='underline cursor-pointer ml-2' 
                  onClick={notify3}
                >
                   ,periódico
                </span>
                <span 
                  className='underline cursor-pointer ml-2' 
                  onClick={notify4}
                >
                   y variable.
                </span>
              </p>
              <p className='relative bottom-[16%] text-xl font-bold text-red-600'>Interacciones</p>
              <Button className='relative rounded-xl bg-red-600 h-16 w-[70%] bottom-16 hover:bg-red-500 transform active:scale-95 transition-transform duration-150 ease-in-out focus:outline-none focus:ring focus:ring-violet-300'>
                <Link href="/pendulum_armonic">
                 <div className="flex items-center justify-center h-full w-full">
                   <p className='relative pr-10 font-bold  text-lg text-white'>1- Oscilaciones en el péndulo</p>
                   <img
                      className="relative w-10 h-10"
                      src="/images/flecha.png"
                     alt="flecha"
                   />
                  </div>
                </Link>
              </Button>
              <button className='relative rounded-xl bg-red-600 h-16 w-[70%] bottom-7 hover:bg-red-500 transform active:scale-95 transition-transform duration-150 ease-in-out focus:outline-none focus:ring focus:ring-violet-300 '>
                <p className='relative pr-1 font-bold top-2 text-base w-[90%] text-white'> 2. Oscilaciones en el sistema masa resorte </p>
                <img className="relative w-10 h-10 left-[85%] bottom-10 hover:"
                      src={"/images/flecha.png"}
                      alt="flecha"
                >
                </img>
              </button>
              
        </div>
      </div>
    </main>

  )
}
 