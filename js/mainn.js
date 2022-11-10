//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer =30;
let timerInicial = 30;
let tiempoRegresivoID = null;

//Apuntando a documento HYML

let mostrarMovimientos = document.getElementById('Movimientos');
let mostrarAciertos = document.getElementById('Aciertos');
let mostrarTiempo = document.getElementById('t-restante');

/*********************SONIDOS DEL JUEGO*************************************/
let voltearCartaAudio= new Audio('./sounds/voltearCarta.wav');
let GMAudio= new Audio('./sounds/GM.wav');
let victoriaAudio= new Audio('./soundS/victoria.wav');

//Generador de numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
    tiempoRegresivoID=setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML =`Tiempo: ${timer} segundos`;
        if(timer ==0){ 
         clearInterval(tiempoRegresivoID);
         bloquearTarjetas(numeros);
         GMAudio.play();
        }
    },1000, timer);
}   

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
       let tarjetaBloqueada =document.getElementById(i);
       tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
       tarjetaBloqueada.disabled = true;
     }
}


//La Funcion principal
function destapar(id){

    if(temporizador == false){
      contarTiempo();
      temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //Aqui se muestra el primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id]
        tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">`;
        voltearCartaAudio.play();


        //Deshabilitar el primer boton
        tarjeta1.disabled = true;
    }else if (tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML =`<img src="./imagenes/${segundoResultado}.png" alt="">`;

        //Deshabilitar el segundo boton
        tarjeta2.disabled = true; 
        //Incrementar movimineto 
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;   

        if(primerResultado == segundoResultado){
         //Encerrar contador de tarjetas destapadas
         tarjetasDestapadas = 0;

         //aumentar puntaje
         aciertos++; 
         mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos ==8){
                victoriaAudio.play();
                clearInterval(tiempoRegresivoID);
                mostrarAciertos.innerHTML =`Aciertos: ${aciertos}`;
                mostrarTiempo.innerHTML = `Fantastico solo te demoraste ${timerInicial - timer} segundos🥳 `
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 😎`
            }     
          
        }else{
           //Mostrar momentaneamente los valores y volver a tapar
           setTimeout(()=>{
               tarjeta1.innerHTML = ' ';
               tarjeta2.innerHTML = ' ';
               tarjeta1.disabled = false;
               tarjeta2.disabled = false;
               tarjetasDestapadas = 0;
           },800)//Tiempo que muestra la tarjeta
        }
    }

}



