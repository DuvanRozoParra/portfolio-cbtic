"use client"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
  Point,
  ChartData,
} from "chart.js";
import { ForwardedRef, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
);

var LasX: number[] = []; //los valores del eje x
var LasY: number[] = []; //funcion evaluada
var LasDY: number[] = []; //recta tangente

var max = 10;
var punto = 3;
var paso = 1 / 16;
var total = max / paso;
var puntoindice = punto / paso;
var losNeg = max / 2 / paso;

function hayvariable(cadena: string) {
  let i: number;
  let perohayono: number = 0;
  for (i = 0; i < cadena.length; i++) {
    if (cadena.split("")[i] == "x" || cadena.split("")[i] == "X") {
      perohayono = 1;
      break;
    } else {
      perohayono = 0;
    }
  }
  return perohayono;
} //mira si hay x o X
function polinomio(cadena: string) {
  let i: number = 0;
  let j: number;
  let dondequedo: number = 0;
  let pasante = cadena.split("");
  let polinomio = [];
  let concatenador: string = "";
  for (i = 0; i < cadena.length; i++) {
    switch (pasante[i]) {
      case "+":
        polinomio[i] = " +";
        break;
      case "-":
        polinomio[i] = " -";
        break;
      default:
        polinomio[i] = pasante[i];
    }
  }
  for (i = 0; i < cadena.length; i++) {
    if (polinomio[i] == " -" && polinomio[i - 1] == "^") {
      polinomio[i] = "-";
    }
    if (polinomio[i] == " +" && polinomio[i - 1] == "^") {
      polinomio[i] = "+";
    }
  }
  for (i = 0; i < polinomio.length; i++) {
    concatenador = concatenador + polinomio[i];
  }

  return concatenador;
} //separa en monomios
function mirar(cadena: string, wanted: any) {
  let signo: number = 1;
  let pot: number = 0;
  let doctora: number = 0;
  let mon: string[];
  mon = cadena.split("");

  for (let i = 0; i < mon.length; i++) {
    if (mon[i] == wanted) {
      for (let j = i + 1; j < mon.length; j++) {
        switch (mon[j]) {
          case "+":
            break;
          case "-":
            signo = -1;
            break;
          case "1":
            pot = pot * 10 + 1;
            doctora = 1;
            break;
          case "2":
            pot = pot * 10 + 2;
            doctora = 1;
            break;
          case "3":
            pot = pot * 10 + 3;
            doctora = 1;
            break;
          case "4":
            pot = pot * 10 + 4;
            doctora = 1;
            break;
          case "5":
            pot = pot * 10 + 5;
            doctora = 1;
            break;
          case "6":
            pot = pot * 10 + 6;
            doctora = 1;
            break;
          case "7":
            pot = pot * 10 + 7;
            doctora = 1;
            break;
          case "8":
            pot = pot * 10 + 8;
            doctora = 1;
            break;
          case "9":
            pot = pot * 10 + 9;
            doctora = 1;
            break;

          case "0":
            pot = pot * 10 + 0;
            doctora = 1;
            break;
        }
      }
    }
  }

  if (doctora != 0) {
    return pot * signo;
  } else return 1;
} //cuenta el exponente de la ecuacion
function contar(cadena: string) {
  let signo: number = 1;
  let pot: number = 0;
  let doctora: number = 0;
  let letras: number = 0;
  let mon: string[];
  mon = cadena.split("");

  for (let i = 0; i < mon.length; i++) {
    if (letras == 0) {
      switch (mon[i]) {
        case "+":
          break;
        case "-":
          signo = -1;
          break;
        case "1":
          pot = pot * 10 + 1;
          doctora = 1;
          break;
        case "2":
          pot = pot * 10 + 2;
          doctora = 1;
          break;
        case "3":
          pot = pot * 10 + 3;
          doctora = 1;
          break;
        case "4":
          pot = pot * 10 + 4;
          doctora = 1;
          break;
        case "5":
          pot = pot * 10 + 5;
          doctora = 1;
          break;
        case "6":
          pot = pot * 10 + 6;
          doctora = 1;
          break;
        case "7":
          pot = pot * 10 + 7;
          doctora = 1;
          break;
        case "8":
          pot = pot * 10 + 8;
          doctora = 1;
          break;
        case "9":
          pot = pot * 10 + 9;
          doctora = 1;
          break;

        case "0":
          pot = pot * 10 + 0;
          doctora = 1;
          break;
        default:
          letras = 1;
          break;
      }
    } else break;
  }

  if (doctora != 0) {
    return pot * signo;
  } else return 1;
} //cuenta el cohefisiente de la ecuacion
function x(cadena: string, index: number) {
  let total: number = 0;

  if (hayvariable(cadena) == 1) {
    total = contar(cadena) * Math.pow(index, mirar(cadena, "^"));
  } else total = contar(cadena) * Math.pow(1, mirar(cadena, "^"));

  return total;
} //evalua la ecuacion en un numero contreto
function dx(cadena: string, index: number) {
  let total: number = 0;
  if (hayvariable(cadena) == 1) {
    total =
      contar(cadena) *
      mirar(cadena, "^") *
      Math.pow(index, mirar(cadena, "^") - 1);
  } else total = 0;
  // console.log(contar(cadena));
  return total;
} //saca la derivada en un numero contreto
function cargar(ecuasion: string) {
  let arrayprueba = [];
  let transportador: number = 0;

  let poli = polinomio(ecuasion).split(" ");
  //hace el array mensajero
  for (let i = 0; i <= total; i++) {
    arrayprueba[i] = 0;
  }

  //carga las y en el array mensajero y de ahi a lasY
  for (let i = 0; i <= total; i++) {
    for (transportador = 0; transportador < poli.length; transportador++) {
      arrayprueba[i] =
        arrayprueba[i] + x(poli[transportador], i * paso - losNeg * paso);
    }
  }
  for (let i = 0; i <= total; i = i + paso) {
    LasY[i] = arrayprueba[i];
  }

  //reset arrray mensajero
  for (let i = 0; i <= total; i++) {
    arrayprueba[i] = 0;
  }

  for (let i = 0; i <= total; i++) {
    for (transportador = 0; transportador < poli.length; transportador++) {
      arrayprueba[i] =
        arrayprueba[i] +
        dx(poli[transportador], punto) * (i * paso - punto - losNeg * paso) +
        x(poli[transportador], punto);
    }
  }
  for (let i = 0; i <= total; i = i + paso) {
    LasDY[i] = arrayprueba[i];
  }

  for (let i = 0; i <= total; i = i + paso) {
    LasX[i] = i * paso - losNeg * paso;
    //peligro===>>> no hubo peligro

    //esto ya no se usa hay que borrar
    //LasDY[i]=(dx(ecuasion,punto)*(i*paso-punto-losNeg*paso)+x(ecuasion,punto))
    //LasY[i]=x(ecuasion,i*paso-losNeg*paso)
    //LasY[i]=arrayprueba[i]
  }

  //console.log(arrayprueba)
} //carga
function elorden(cadena: string) {
  //el resultado
  let comodijeerafacilpe: number = 0;

  //string inicial y el string reducido
  let proceso = cadena.split("");
  let mon = proceso;
  let laprimeraparte = [];
  let resultado: string;
  let loquequedo = [];
  let ante: string = "";
  let durante: string = "";
  let despue: string = "";

  let i: number;
  let j: number;
  //los terminos
  let elunoh: number = 0;
  let eldoh: number = 0;

  //mirar donde estan los simbolos
  let hay: number = 0;
  let sumacion: number = 0;

  //cantidad de ciclos
  let ciclosmulti: number = 0;
  let ciclossuma: number = 0;

  //rangos
  let limite1: number = 0;
  let limite2: number = 0;
  let lacancelacion1: number = 0;
  let lacancelacion2: number = 0;

  //si
  let tem = [];
  let pasante: string = "";
  let lamonda: number = 0;
  let lamondabajo: number = 0;

  //                                                    console.log(mon)
  //contar ciclos
  for (i = 0; i < mon.length; i++) {
    if (mon[i] == "*" || mon[i] == "/" || mon[i] == "+" || mon[i] == "-") {
      ciclosmulti++;
    }
  }
  for (i = 0; i < mon.length; i++) {
    if (mon[i] == "+" || mon[i] == "-") {
      ciclossuma++;
    }
  }

  for (j = 0; j < ciclosmulti; j++) {
    //buscar si hay multi
    for (i = 0; i < mon.length; i++) {
      if (mon[i] == "*" || mon[i] == "/") {
        hay = i;
        break;
      }
    }

    if (hay != 0) {
      //saber los limites
      for (i = hay; i >= 0; i--) {
        if (mon[i] == "+" || mon[i] == "-" || mon[i] == "*" || mon[i] == "/") {
          limite1 = i;
          lamondabajo++;
        }
        if (lamondabajo == 2) {
          lamondabajo = 0;
          break;
        }
      }
      if (hay != 0) {
        for (i = hay; i < mon.length; i++) {
          if (
            mon[i] == "+" ||
            mon[i] == "-" ||
            mon[i] == "*" ||
            mon[i] == "/"
          ) {
            limite2 = i;

            lamonda++;
          }
          if (lamonda == 2) {
            lamonda = 0;
            break;
          }
        }
      }

      //sacar los numeros si no hay limite
      if (limite1 == hay) {
        pasante = "";
        for (i = 0; i < hay; i++) {
          tem[i] = mon[i];
          pasante = pasante + tem[i];
        }
        elunoh = contar(pasante);
        lacancelacion1 = 1;
      }

      if (limite2 == hay) {
        pasante = "";
        for (i = hay + 1; i < mon.length; i++) {
          tem[i] = mon[i];
          pasante = pasante + tem[i];
        }
        eldoh = contar(pasante);
        lacancelacion2 = 1;
      }
      //sacar los numeros cuando hay limite
      if (limite1 != hay) {
        pasante = "";
        for (i = limite1 + 1; i <= hay; i++) {
          tem[i] = mon[i];
          pasante = pasante + tem[i];
        }
        elunoh = contar(pasante);
      }

      if (limite2 != hay) {
        pasante = "";
        for (i = hay + 1; i <= limite2; i++) {
          tem[i] = mon[i];
          pasante = pasante + tem[i];
        }
        eldoh = contar(pasante);
      }
      //hacer la operacion
      if (mon[hay] == "*") {
        comodijeerafacilpe = elunoh * eldoh;
      }
      if (mon[hay] == "/") {
        comodijeerafacilpe = elunoh / eldoh;
      }
      hay = 0;
    } else {
      for (i = 0; i < mon.length; i++) {
        if (mon[i] == "+" || mon[i] == "-") {
          sumacion = i;
          break;
        }
      }

      if (sumacion != 0) {
        //saber los limites
        for (i = sumacion; i >= 0; i--) {
          if (
            mon[i] == "+" ||
            mon[i] == "-" ||
            mon[i] == "*" ||
            mon[i] == "/"
          ) {
            limite1 = i;
            lamondabajo++;
          }
          if (lamondabajo == 2) {
            lamondabajo = 0;
            break;
          }
        }
        if (sumacion != 0) {
          for (i = sumacion; i < mon.length; i++) {
            if (
              mon[i] == "+" ||
              mon[i] == "-" ||
              mon[i] == "*" ||
              mon[i] == "/"
            ) {
              limite2 = i;
              lamonda++;
            }
            if (lamonda == 2) {
              lamonda = 0;
              break;
            }
          }
        }

        //sacar los numeros si no hay limite
        if (limite1 == sumacion) {
          pasante = "";
          for (i = 0; i < sumacion; i++) {
            tem[i] = mon[i];
            pasante = pasante + tem[i];
          }
          elunoh = contar(pasante);
          lacancelacion1 = 1;
        }

        if (limite2 == sumacion) {
          pasante = "";
          for (i = sumacion + 1; i < mon.length; i++) {
            tem[i] = mon[i];
            pasante = pasante + tem[i];
          }
          eldoh = contar(pasante);
          lacancelacion2 = 1;
        }
        //sacar los numeros cuando hay limite
        if (limite1 != sumacion) {
          pasante = "";
          for (i = limite1 + 1; i <= sumacion; i++) {
            tem[i] = mon[i];
            pasante = pasante + tem[i];
          }
          elunoh = contar(pasante);
        }

        if (limite2 != sumacion) {
          pasante = "";
          for (i = sumacion + 1; i <= limite2; i++) {
            tem[i] = mon[i];
            pasante = pasante + tem[i];
          }
          eldoh = contar(pasante);
        }
        //hacer la operacion
        if (mon[sumacion] == "+") {
          comodijeerafacilpe = elunoh + eldoh;
        }
        if (mon[sumacion] == "-") {
          comodijeerafacilpe = elunoh - eldoh;
        }
      }
      sumacion = 0;
    }

    // cuidado con esto, esto es lo que lo no esta dejando usar
    //if(limite1==hay || limite1==sumacion){
    for (i = 0; i <= limite1; i++) {
      laprimeraparte[i] = mon[i];
    }
    //}

    //if(limite2==hay || limite2==sumacion){
    for (i = limite2; i < mon.length; i++) {
      loquequedo[i - limite2] = mon[i];
    }
    //}

    ante = "";
    despue = "";

    durante = comodijeerafacilpe.toString();
    for (i = 0; i < laprimeraparte.length; i++) {
      ante = ante + laprimeraparte[i];
    }
    for (i = 0; i < loquequedo.length; i++) {
      despue = despue + loquequedo[i];
    }

    if (lacancelacion1 != 0) {
      ante = "";
      lacancelacion1 = 0;
    }
    if (lacancelacion2 != 0) {
      despue = "";
      lacancelacion2 = 0;
    }

    resultado = ante + durante + despue;
    //resultado=mon.join("").replace(ante,durante) //duvan esto esta mal no funciona pa esto es lo que lo daña ya mire

    //resultado=resultado.split(",").join("") //no funciono xd
    mon = resultado.split("");
    console.log(resultado);
  }
  // casos resueltos: infinitas sumas, infinitas multi, infinitas sumas y una multi

  //falta: que el malparido string se haga bien, si se hace eso se arregla

  return durante;
}

//carga los valores de la tabla
function Todo() {
  let ecuasion: string = "x^-1-10+x^3";
  //cargar(ecuasion);
  //elorden("5+4+2*3+4+4")

  //mouse?

  //la grafica
  const [datasetGuache, editarDatasetGuache] = useState<ChartData<"line", (number | Point | null)[], unknown>>({ datasets: [] });

  var data = {
    labels: LasX,

    datasets: [
      {
        label: "curva",
        data: LasY,
        backgroundColor: "red ",
        borderColor: "red",
        pointRadius: 1,
      },
      {
        label: "recta tangente",
        data: LasDY,
        backgroundColor: "black ",
        borderColor: "black",
        pointRadius: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {},
    },

    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "ejemplo",
      },
    },
  };


  //controladores
  const inputRef = useRef<HTMLInputElement>(null!)
  const refdelpuntito=useRef<HTMLInputElement>(null!)
  const cambiarlaprecicion=useRef<HTMLInputElement>(null!)



  function handleClick() {

   

    punto=+refdelpuntito.current.value
    //aun no esta fino
    /*
    paso=Math.pow(2,-+cambiarlaprecicion.current.value)
    total = max / paso
    losNeg = max / 2 / paso;

    salon de la verguenza

    <div>
          <div>nivel de precicion</div>
          <input type="text" ref={cambiarlaprecicion}id="laprecicion" name="precicion" placeholder="nivel de precicion(a mayor numero mayor tiempo de carga) por defecto:4"/>
        </div>


    */

    cargar(inputRef.current.value);

    data = {
      labels: LasX,

      datasets: [
        {
          label: "curva",
          data: LasY,
          backgroundColor: "red ",
          borderColor: "red",
          pointRadius: 1,
        },
        {
          label: "recta tangente",
          data: LasDY,
          backgroundColor: "black ",
          borderColor: "black",
          pointRadius: 1,
        },
      ],
    };

    editarDatasetGuache(data);

    //console.log(data.datasets[0]);

    // canvasref.current.;
  }


  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      
      <div >
        <div>
          <div>ecuacion</div>
          <input className=" bg-slate-200 rounded-3xl pl-5 text-black" ref={inputRef} type="text" id="message" name="message" placeholder="ecuacion"/ >
        </div>
        <div>
          <div>punto</div>
          <input className=" bg-slate-200 rounded-3xl pl-5 text-black" type="text" ref={refdelpuntito}id="elinputpuntido" name="inputpuntito" placeholder="punto"/>
        </div>
        
        <button className=" bg-red-600 mt-10 justify-center rounded-2xl px-10" onClick={handleClick}>cambiar funcion</button>
      </div>
     
      

      

      <div className="relative w-2/3 h-[90%]flex justify-center items-center flex-col ">
        <Line options={options} data={datasetGuache}/>
      </div>
    </div>
  );
}

export default Todo;
