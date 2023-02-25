// inicio de variables

let tarjetasDestapadas =0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 40;
let tiempoRegresivo = null;
let timerInicial = 40;

let winAudio =new Audio('./audios/win.wav');
let loseAudio =new Audio('./audios/lose.wav');
let wrongAudio =new Audio('./audios/wrong.wav');
let clickAudio =new Audio('./audios/click.wav');
let rightAudio =new Audio('./audios/right.wav');


// apuntando documento html

let mostrarMovimiento = document.getElementById('movimientos')
let mostrarAciertos = document.getElementById('aciertos')
let mostrarTiempo = document.getElementById('tiempo')

// generacion de numeros aleatorios

let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5})
console.log(numeros);


// funciones


function contarTiempo(){
    tiempoRegresivo= setInterval(() => {
      timer--; 
      mostrarTiempo.innerHTML= `Tiempo:${timer} segundos`
      if(timer==0){
        clearInterval(tiempoRegresivo)
        bloquearTarjetas();
        loseAudio.play();
      }
    },1000);
}

function bloquearTarjetas(){
    for(let i =0; i<=15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="imagenes/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
    }
}
//funcion principal

function destapar(id){

    if (temporizador == false){
        contarTiempo();
        temporizador=true;
    }
    tarjetasDestapadas++;

    if (tarjetasDestapadas ==1 ){

        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="imagenes/${primerResultado}.png" alt="">`;
        clickAudio.play();
        //desabilitar el primer boton
        tarjeta1.disabled =true;
    }else if(tarjetasDestapadas==2){
        // mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="imagenes/${segundoResultado}.png" alt="">`;

        // desabilitar el segundo boton
        tarjeta2.disabled =true;

        // incrmentar movimientos
        movimientos++;
        mostrarMovimiento.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado==segundoResultado){
            // encerrar tarjetas
            tarjetasDestapadas = 0;

            // aumenta aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            if(aciertos == 8){
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😃`
                mostrarTiempo.innerHTML = `Felicidades solo demoraste ${timerInicial -timer} segundos`
                mostrarMovimiento = `Movimientos: ${movimientos} 😎`
                winAudio.play();
            }
        }else{
            // mostrar valores y volver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML =' ';
                tarjeta2.innerHTML =' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
                wrongAudio.play();
            },800)
        }
    }

}