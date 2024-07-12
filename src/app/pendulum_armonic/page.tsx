'use client'

import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PendulumSimulator = () => {

   // Estados para el péndulo y la simulación
  const [amplitude, setAmplitude] = useState(0.1); // Amplitud en grados
  const [length, setLength] = useState(1.5); // Longitud en metros
  const [gravity, setGravity] = useState(9.86); // Aceleración debido a la gravedad en m/s^2
  const [selectedGravity, setSelectedGravity] = useState(null);
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false); // variable que determina si se esta ejecutando el pendulo
  const [dragging, setDragging] = useState(false);  // Estado que determina cuando hay un arrastre
  const [dragStartX, setDragStartX] = useState(0); // Posición X al inicio del arrastre
  const animationRef = useRef<number | null>(null);
  const [initialTime, setInitialTime] = useState(0); // Guarda el tiempo inicial
  const [pausedTime, setPausedTime] = useState(0); // Guarda el tiempo cuando se pausa
  const [periodText, setPeriodText] = useState(""); // Variable para almacenar el texto del periodo
  const [omegaText, setOmegaText] = useState(""); // Variable para almacenar el texto de omega
  const positionChartRef = useRef<Chart | null>(null);
  const velocityChartRef=  useRef<Chart | null>(null);
  const accelerationChartRef=  useRef<Chart | null>(null);
  const [positionData, setPositionData] = useState<{ time: number; position: number; }[]>([]);
  const [velocityData, setVelocityData] = useState<{ time: number; velocity: number; }[]>([]);
  const [accelerationData, setAccelerationData] = useState <{ time: number; acceleration: number; }[]>([]);  // Almacena los datos de posición
  const [lastUpdateTime, setLastUpdateTime] = useState(0); // Estado para almacenar el último tiempo de actualización
  const [isSlidersLocked, setIsSlidersLocked] = useState(false); //Estado que bloquea los slider cuando la simulacion esta en ejecucion

  
  useEffect(() => {
    if (!isRunning) return;

    const pendulum = document.getElementById("pendulum");
    const ball = document.getElementById("ball");
    const shadow = document.getElementById("shadow");

    if (!pendulum || !ball || !shadow) return;

    const thetaMax = (amplitude * Math.PI) / 180; // Convierte amplitud a radianes
    const frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length); // Frecuencia angular

    // Función para actualizar la posición del péndulo

    const updatePosition = () => {
      const currentTime = performance.now() / 1000 - initialTime; // Tiempo actual en segundos
      const angularPosition = thetaMax * Math.cos(2 * Math.PI * frequency * currentTime);
      const x = length * Math.sin(angularPosition);
      const h = length - length * Math.cos(thetaMax);
      const y = length * Math.cos(angularPosition) - h * Math.cos(angularPosition);

       // Calcula la velocidad y la aceleración
      const omega = 2 * Math.PI * frequency;
      const velocity = -amplitude * omega * Math.sin(omega * currentTime);
      const acceleration = -amplitude * omega ** 2 * Math.cos(omega * currentTime);

      if(amplitude=== 0.1){
        setAmplitude(0)
      }
      
      // Verifica si ha transcurrido al menos 0.1 segundos para agregar un punto en el gráfico
    if (currentTime - lastUpdateTime >= 0.05) {
      const newPositionData = [...positionData, { time: currentTime, position: x }];
      setPositionData(newPositionData);
      updatePositionChart(newPositionData);
      setLastUpdateTime(currentTime); // Actualiza el último tiempo de actualización

      const newVelocityData = [...velocityData, { time: currentTime, velocity: velocity }];
      setVelocityData(newVelocityData);
      updateVelocityChart(newVelocityData);

      const newAccelerationData = [...accelerationData, { time: currentTime, acceleration: acceleration }];
      setAccelerationData(newAccelerationData);
      updateAccelerationChart(newAccelerationData);
    }

      ball.setAttribute("cx", `${50 + x * 50}%`);
      ball.setAttribute("cy", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);
      shadow.setAttribute("cx", `${50 + x * 50}%`);
      shadow.setAttribute("cy", "94%");
      pendulum.setAttribute("x1", "50.02%");
      pendulum.setAttribute("y1", `${0}`);
      pendulum.setAttribute("x2", `${50 + x * 50}%`);
      pendulum.setAttribute("y2", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);

      setTime(currentTime);

      if (isRunning) {
        // Actualiza la posición de los elementos del péndulo en la pantalla
        animationRef.current = requestAnimationFrame(updatePosition);
      }

    };
    // Continúa actualizando la posición llamando a esta función de nuevo
    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [amplitude, length, gravity, initialTime, isRunning,positionData,lastUpdateTime ,velocityData,accelerationData]); 

  
  // Funciones para controlar la simulación

  const startSimulation = () => {
    if (!isRunning) {
      // Inicia la simulación
      setIsRunning(true);
  
      if (pausedTime) {
        const currentTime = performance.now() / 1000;
        setInitialTime(currentTime - pausedTime);
        setPausedTime(0);
      } else if (!initialTime) {
        const currentTime = performance.now() / 1000;
        setInitialTime(currentTime - time);
      }

      // Bloquea los sliders cuando el péndulo está en movimiento
      setIsSlidersLocked(true);
      setLastUpdateTime(0);
    }
  };
  
  const pauseSimulation = () => {
    // Pausa la simulación
    setIsRunning(false);
    const currentTime = performance.now() / 1000;
    setPausedTime(currentTime - initialTime);
  
    // Desbloquea los sliders cuando se pausa el péndulo
    setIsSlidersLocked(false);
  };
  
  const resetSimulation = () => {
    // Reinicia la simulación
    setIsRunning(false);
    setAmplitude(0.1);
    setInitialTime(0);
    setPausedTime(0);
    setIsSlidersLocked(false);
    setTime(0);
    setVelocityData([]);
    setPositionData([]);
    setAccelerationData([]); // Borra los datos de posición

  // Elimina la gráfica de posición existente
    if (positionChartRef.current) {
      positionChartRef.current.destroy();
    }
    if (velocityChartRef.current) {
      velocityChartRef.current.destroy();
    }
    if (accelerationChartRef.current) {
      accelerationChartRef.current.destroy();
    }

    // Crea una nueva gráfica de posición
    initializePositionChart();
    initializeVelocityChart();
    initializeAccelerationChart();
    setOmegaText("");
    setPeriodText("");
  };
  
  const handleLengthChange = (e:any) => {
    // Maneja el cambio en la longitud del péndulo
    const newLength = parseFloat(e.target.value);
    setLength(newLength);
  };

  const handleMouseDown = (e:any) => {
    // Comienza el arrastre cuando se hace clic en la bola
    setDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e:any) => {
    if (dragging) {
      // Calcula el cambio en la posición X del ratón
      const deltaX = e.clientX - dragStartX;

      // Calcula el cambio de amplitud proporcional a la velocidad
      const speedFactor = 0.2; 
      const deltaAmplitude = deltaX * speedFactor;

      // Calcula la nueva amplitud
      const newAmplitude = amplitude + deltaAmplitude;

      // Limita la nueva amplitud dentro del rango [-4, 4]
      const minAmplitude = -4;
      const maxAmplitude = 4;
      const clampedAmplitude = Math.min(Math.max(newAmplitude, minAmplitude), maxAmplitude);

      // Actualiza la amplitud
      setAmplitude(clampedAmplitude);

      // Actualiza la posición de inicio del arrastre
      setDragStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    // Detiene el arrastre cuando se suelta el clic
    setDragging(false);
  };

  useEffect(() => {
    // Agrega los event listeners para el arrastre de la bola
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      // Limpia los event listeners al desmontar el componente
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);


  // Calcula la posición inicial del péndulo cuando se carga el componente
  useEffect(() => {
    const pendulum = document.getElementById("pendulum");
    const ball = document.getElementById("ball");
    const shadow = document.getElementById("shadow");

    if (!pendulum || !ball || !shadow) return;

    const thetaMax = (amplitude * Math.PI) / 180; // Convierte amplitud a radianes
    const angularPosition = thetaMax;

    const x = length * Math.sin(angularPosition);
    const h = length - length * Math.cos(thetaMax);
    const y = length * Math.cos(angularPosition) - h * Math.sin(angularPosition);

    ball.setAttribute("cx", `${50 + x * 50}%`);
    ball.setAttribute("cy", `${0 + y * 50 + h * Math.cos(angularPosition)}%`);
    shadow.setAttribute("cx", `${50 + x * 50}%`);
    shadow.setAttribute("cy", "94%");
    pendulum.setAttribute("x1", "50%");
    pendulum.setAttribute("y1", `${0}%`);
    pendulum.setAttribute("x2", `${50 + x * 50}%`);
    pendulum.setAttribute("y2", `${0 + y * 50 - h * Math.cos(angularPosition)}%`);
  }, [amplitude, length]);


  // Función para manejar cambios en el slider de gravedad
  const handleGravityChange = (newGravity:any) => {
    // Si se selecciona una opción de gravedad, actualiza el estado del slider
    if (newGravity !== gravity) {
      setGravity(newGravity);
      setSelectedGravity(newGravity); // Selecciona la opción de gravedad
    } else {
      // Si se cambia el valor del slider, deselecciona cualquier opción de gravedad seleccionada
      setSelectedGravity(null);
    }
  };
  const handleSliderChange = (e:any) => {
    const newGravity = parseFloat(e.target.value);
    setGravity(newGravity);
    setSelectedGravity(null); // Deselecciona cualquier opción de gravedad seleccionada
  };

  const calculatePeriod = () => {
    if(amplitude>0.1){
      // Calcula el periodo utilizando la fórmula T = 2π√(L/g)
      const period = 2 * Math.PI * Math.sqrt(length / gravity);

      // Muestra el resultado en un texto
      setPeriodText(`T es ≈  ${period.toFixed(2)} s`);
    }
    else{
      setPeriodText("");
    }
  };
  const calculateOmega =()=>{
    if(amplitude>0.1){
      const frequency = 1 / (2 * Math.PI) * Math.sqrt(gravity / length);
      const omega = 2 * Math.PI * frequency;
      setOmegaText(` W es ≈ ${omega.toFixed(2)} rads/s`)
    }
    else{
      setOmegaText("");
    }
  }
  
  const [showPositionChart, setShowPositionChart] = useState(false);

  const initializePositionChart = () => {
    const positionCanvas = document.getElementById("position-chart") as HTMLCanvasElement;

    if (positionCanvas) {
      positionChartRef.current = new Chart(positionCanvas, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Posición (m)",
              data: [],
              borderColor: "red",
              backgroundColor: "red",
              borderWidth: 1.2,
              pointRadius: 1.5,
              tension: 0.5,
              fill: false,
              showLine: true,
              spanGaps: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Tiempo (s)",
              },
              min: 0, // Valor mínimo en el eje x
              max: 15, // Valor máximo en el eje x
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Posición (m)",
              },
            },
          },
        },
      });
    }
  }
  
  const [isAnyChartVisible, setIsAnyChartVisible] = useState(false);

  const updatePositionChart = (data: any) => {
    if (positionChartRef.current) {
      const timeData = data.map((point: any) => point.time.toFixed(5));
      const positionData = data.map((point: any) => point.position);

      positionChartRef.current.data.labels = timeData;
      positionChartRef.current.data.datasets[0].data = positionData;
      positionChartRef.current.update();
    }
  };

  useEffect(() => {
    if (showPositionChart) {
      initializePositionChart();
    }
  }, [showPositionChart]);

  const handleShowPositionChart = () => {
    setShowPositionChart(!showPositionChart);
    setIsAnyChartVisible(!showPositionChart || showVelocityChart || showAccelerationChart);

  };
  
  const [showVelocityChart, setShowVelocityChart] = useState(false);

  const initializeVelocityChart = () => {
    const velocityCanvas = document.getElementById("velocity-chart") as HTMLCanvasElement;

    if (velocityCanvas) {
      velocityChartRef.current = new Chart(velocityCanvas, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Velocidad (m/s)",
              data: [],
              borderColor: "blue",
              backgroundColor: "blue",
              borderWidth: 1.2,
              pointRadius: 1.5,
              tension: 0.5,
              fill: false,
              showLine: true,
              spanGaps: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Tiempo (s)",
              },
              min: 0, // Valor mínimo en el eje x
              max: 15, // Valor máximo en el eje x
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Velocidad (m/s)",
              },
            },
          },
        },
      });
    }
  };

  const updateVelocityChart = (data: any) => {
    if (velocityChartRef.current) {
      const timeData = data.map((point: any) => point.time.toFixed(5));
      const velocityData = data.map((point: any) => point.velocity);

      velocityChartRef.current.data.labels = timeData;
      velocityChartRef.current.data.datasets[0].data = velocityData;
      velocityChartRef.current.update();
    }
  };

  useEffect(() => {
    if (showVelocityChart) {
      initializeVelocityChart();
    }
  }, [showVelocityChart]);

  const handleShowvelocityChart = () => {
    setShowVelocityChart(!showVelocityChart);
    setIsAnyChartVisible(showPositionChart || !showVelocityChart || showAccelerationChart);

  };

  const [showAccelerationChart, setShowAccelerationChart] = useState(false);

  const initializeAccelerationChart = () => {
    const accelerationCanvas = document.getElementById("acceleration-chart") as HTMLCanvasElement;

    if (accelerationCanvas) {
      accelerationChartRef.current = new Chart(accelerationCanvas, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Aceleracion (m/s^2)",
              data: [],
              borderColor: "green",
              backgroundColor: "green",
              borderWidth: 1.2,
              pointRadius: 1.5,
              tension: 0.5,
              fill: false,
              showLine: true,
              spanGaps: true,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              title: {
                display: true,
                text: "Tiempo (s)",
              },
              min: 0, // Valor mínimo en el eje x
              max: 15, // Valor máximo en el eje x
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Aceleracion (m/s^2)",
              },
            },
          },
        },
      });
    }
  };

  const updateAccelerationChart = (data: any) => {
    if (accelerationChartRef.current) {
      const timeData = data.map((point: any) => point.time.toFixed(5));
      const accelerationData = data.map((point: any) => point.acceleration);

      accelerationChartRef.current.data.labels = timeData;
      accelerationChartRef.current.data.datasets[0].data = accelerationData;
      accelerationChartRef.current.update();
    }
  };

  useEffect(() => {
    if (showAccelerationChart) {
      initializeAccelerationChart();
    }
  }, [showAccelerationChart]);

  const handleAccelerationChart = () => {
    setShowAccelerationChart(!showAccelerationChart);
    setIsAnyChartVisible(showPositionChart || showVelocityChart || !showAccelerationChart);
  };
  
  return (
    <div className=" w-full h- h-full p-4 text-center bg-white">
      <h1 className="text-2xl font-bold mb-4">Péndulo Simple</h1>
      <div className="absolute bg-gray-100 rounded-lg w-80 h-72 md:inset-x-20  ">
           <h1 className="absolute bg-red-500 top-4 font-bold text-2xl left-12 w-2/3 text-white">Condiciones</h1>
           <p className="absolute top-16 text-black text-base font-bold w-22 p-2"> 1. Oscilaciones pequeñas : Entre 0° y 5° - A= 0,06 M </p>
           <p className="absolute top-32 text-black text-base font-bold w-22 p-2 ml-3"> 2. Sin Friccion :   ΣF= mg </p>
           <p className="absolute top-44 text-black text-base font-bold w-22 p-2 ml-3"> 3. Hilo inextensible. </p>
           <p className="absolute top-56 text-black text-base font-bold w-22 p-2 ml-3"> 4. Masa Puntual. </p>
      </div>
        <div className="relative h-96 w-1/2 -right-1/4">
          {/* Espacio donde se muestra el tiempo del pendulo*/}
          <div className="absolute bg-gray-200 rounded-lg w-36 h-1/6 md:inset-x-24">
              <p className=" mt-4 text-lg font-semibold text-black"> {time.toFixed(2)} seg</p>
          </div>
           {/* se dibuja el pendulo, y el soporte*/}
          <svg width="160%" height="100%" className="px-18 -ml-32">
            <defs>
              {/* Cuerda del pendulo*/}
              <linearGradient id="yellowGradient" x1="0%" y1="10%" x2="0%" y2="110%">
                <stop offset="0%" style={{ stopColor: "orange", stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: "dark", stopOpacity: 1 }} />
              </linearGradient>
              {/* Soporte del pendulo */}
              <linearGradient id="supportGradient" x1="0%" y1="-30%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: "gray", stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: "gray", stopOpacity: 1 }} />
              </linearGradient>
            </defs>

            <line
              x1="50%"
              y1="10%"
              x2="50%"
              y2="50%"
              stroke="url(#yellowGradient)"
              strokeWidth="3"
              id="pendulum"
            />
            <rect
              x="38%"
              y="0%"
              width="0.5%"
              height="90%" 
              fill="url(#supportGradient)" 
              id="support2"
            />
            <rect
              x="35%"
              y="90%"
              width="10%"
              height="2%"
              fill="gray"
              id="labSupport"
            />
            <rect
              x="38%"
              y="0%"
              width="12%"
              height="1.5%"
              fill="gray"
              id="labSupport"
            />
          <defs>
            {/* masa del pendulo */}
            <radialGradient id="redGradient" cx="50%" cy="30%" r="50%">
              <stop offset="0%" style={{ stopColor: "red", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "darkred", stopOpacity: 1 }} />
            </radialGradient>
          </defs>
          <circle
            cx="50%"
            cy="60%"
            r="12"
            fill="url(#redGradient)"
            id="ball"
            onMouseDown={handleMouseDown} 
            style={{ cursor: "grab" }}
          />
          <circle
            cx="50%"
            cy="100%"
            r="12"
            fill="rgba(0, 0, 0, 0.4)"
            id="shadow"
            filter="blur(8px)" 
          />
        </svg>
      </div>
      <div className=" absolute flex items-center justify-center space-x-4 right-16 top-32">
          {/* Botones del pendulo */}
          <div>
            <button
              onClick={startSimulation}
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 mr-2 text-sm"
            >
              Start
            </button>
            <button
              onClick={pauseSimulation}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 mr-2 text-sm"
            >
              Pause
            </button>
            <button
              onClick={resetSimulation}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 mr-2 text-sm"
            >
              Reset
            </button>
            {isRunning && (
              <button
                onClick={calculatePeriod}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-bold mr-2"
              >
                Periodo
              </button>
            )}
            {isRunning && (
              <button
                onClick={calculateOmega}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm font-bold "
              >
                Omega
              </button>
            )}

            {isSlidersLocked && (
              <p className="text-red-500 font-semibold -mr-12 mt-2 top-10 w-42 text-sm flex items-center justify-center ">No se pueden modificar los sliders mientras el péndulo está en movimiento.</p>
            )}
          </div>
        </div>
      {/* sliders del pendulo */}
      <div className=" absolute flex justify-center bg-gray-100 w-1/3 right-16 -mr-10 top-1/3 text-black">
        <div>
            <div className="my-4 text-sm">
              <label>Longitud (m): {length.toFixed(2)}</label>
              <input
                type="range"
                min="0.70"
                max="1.5"
                step="0.01"
                value={length}
                onChange={handleLengthChange}
                disabled={isSlidersLocked} 
              />
            </div>
            <div className="my-4 text-sm">
              <label>Gravedad (m/s²): {gravity.toFixed(2)}</label>
              <input
                type="range"
                min="1"
                max="9.86"
                step="0.01"
                value={gravity}
                onChange={handleSliderChange}
                disabled={isSlidersLocked} 
              />

              <div className=" mt-4 space-x-2">
                <input
                  type="radio"
                  id="earth"
                  name="gravity"
                  value="9.86"
                  checked={selectedGravity === 9.86}
                  onChange={() => handleGravityChange(9.86)}
                  disabled={isSlidersLocked}
                />
                <label htmlFor="earth">Tierra</label>
                <input
                  type="radio"
                  id="mars"
                  name="gravity"
                  value="3.71"
                  checked={selectedGravity === 3.71}
                  onChange={() => handleGravityChange(3.71)}
                  disabled={isSlidersLocked}
                />
                <label htmlFor="mars">Marte</label>

                <input
                  type="radio"
                  id="moon"
                  name="gravity"
                  value="1.62"
                  checked={selectedGravity === 1.62}
                  onChange={() => handleGravityChange(1.62)}
                  disabled={isSlidersLocked}
                />
                <label htmlFor="moon">Luna</label>

                <input
                  type="radio"
                  id="venus"
                  name="gravity"
                  value="24.79"
                  checked={selectedGravity === 8.87}
                  onChange={() => handleGravityChange(8.87)}
                  disabled={isSlidersLocked}
                />
                <label htmlFor="Venus">
                   Venus
                </label>
              </div>
            </div>
            {periodText && (
              <p className=" font-semibold mt-2 text-sm">{periodText}</p>
            )}
            {omegaText && (
              <p className=" font-semibold mt-2 text-sm">{omegaText}</p>
            )}
        </div>     
      </div>
      <div
          className={`absolute flex flex-row bg-red-500 space-x-2 rounded-lg w-auto h-72 top-[80%] left-96 ${isAnyChartVisible ? "bottom-6" : "-bottom-96"} transition-transform ease-in-out duration-500`}
          style={{ padding: "5px", opacity: isAnyChartVisible ? 1 : 0 }} // Aplica el margen y la opacidad según la visibilidad de las gráficas
        >
          {showPositionChart && (
            <div className="mb-2 bg-white">
              <canvas id="position-chart" width="280" height="280"></canvas>
            </div>
          )}
          {showVelocityChart && (
            <div className="mb-2 bg-white">
              <canvas id="velocity-chart" width="280" height="280"></canvas>
            </div>
          )}
          {showAccelerationChart && (
            <div className="mb-2 bg-white">
              <canvas id="acceleration-chart" width="280" height="280"></canvas>
            </div>
          )}
       </div>
      <div className="my-4">
        <div className=" relative flex flex-col -top-28 mt-24 w-1/3 justify-center -right-14" >
                <button
                  onClick={handleShowPositionChart}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 w-2/3 text-lg font-bold"
                >
                  {showPositionChart ?  "Ocultar Posición" : "Mostrar Posición"}
                </button>
                <button
                  onClick={handleShowvelocityChart}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 w-2/3 text-lg font-bold"
                >
                  {showVelocityChart ? "Ocultar velocidad" : "Mostrar velocidad"}
                </button>
                <button onClick={handleAccelerationChart } className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 w-2/3 text-lg font-bold">
                    {showAccelerationChart ? "Ocultar Aceleracion" : "Mostrar Aceleracion"}
                </button>
        </div>
      </div>
    </div>
  );
};

export default PendulumSimulator;