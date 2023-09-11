//Tomo la pantalla
const display=document.querySelector('.calculator_display');

//Tomar y Mostrar el valor de cada numero y punto para decimales
const num=document.querySelectorAll('button.btn-num')
num.forEach(number=>{
    number.addEventListener("click",_=>{
        display.textContent=display.textContent+number.value;
    })
})
//Tomar y mostrar las operacines
const operators=document.querySelectorAll('button.btn-ops')
operators.forEach(ops=>{
    ops.addEventListener("click",_=>{
        display.textContent=display.textContent+' '+ops.value+' ';
    })
})

// funciones Clear y DEL
const clear=document.querySelector('#clear');
const del=document.querySelector('#del');

clear.onclick=function(){
    display.textContent="";
}

del.onclick=function(){
    let strD=display.textContent;
    strD= strD.slice(0,-1);
    display.textContent="";
    display.textContent=display.textContent+strD;
}

//Crear valores para las operaciones 


//Dar resultado

const result=document.querySelector('#result')
result.onclick=function(){
    let strD=display.textContent;
    console.log(strD)
    let arr=strD.split(' ')
    let operacion=0;
    for (let i = 0; i < arr.length; i++) {
       switch(arr[i]){//La operacion se resuleve unicamente para el primer operador que encuentra
        case '+':
            operacion=parseFloat(arr[i-1])+parseFloat(arr[i+1]);
            break;
       }
    }
    console.log(operacion)
}
