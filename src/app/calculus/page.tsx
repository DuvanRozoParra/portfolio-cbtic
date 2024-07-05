"use client"
import Todo from "./Todo"

function Presentaciondemo1(){

return (
    <div className=" w-full h-screen  flex justify-center items-center flex-col bg-white">
      <h1 className=" font-semibold text-3xl mt-56 mb-10">Derivada de una función </h1>
      <h2 className="w-1/2 pl-[10%] mb-5">La derivada es el operador matemático que se define como:</h2>
      <h4 className="w-1/2 pl-[10%] align-middle">La derivada se interpreta geométricamente como la pendiente de la recta tangente en cada punto de la curva que se deriva.
      </h4>
      <div>
          <img src="https://4.bp.blogspot.com/-98krAw0r0fg/WC7WQ_pV2DI/AAAAAAAAvAQ/zCbdPM8jf0QKkusoIC3KrzhHwhh-qAvlgCPcB/s1600/funcion%2Bderivada%2Bpor%2Bla%2Bdefinicion.png " alt="fotito de la deficion de la derivada" />
      </div>
        <div className="relative w-full  flex justify-center items-center flex-col">
            <Todo/>
        </div>

    </div>
)}

export default Presentaciondemo1