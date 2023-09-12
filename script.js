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

//Funcion Calcular
function calcular(expresion){
    //reconocer los valors y las operacions
    try{
        expresion=expresion.split(' ');
        let operadores=[];
        let valores=[];
        for (let i = 0; i < expresion.length; i++) {
            let arr=expresion[i];
            //manejamos los operadores
            if(arr === '+'||arr === '-'||arr === 'x'||arr === '/'){
                while(operadores.length>0 && tienePrioridad(arr,operadores[operadores.length-1])){
                    let operador=operadores.pop();
                    let valor2=valores.pop();
                    let valor1=valores.pop();
                    valores.push(realizarOperacion(operador,valor1,valor2));
                }
                //agregamos el operado
                operadores.push(arr);
            }else{
                //agregamos el valor comvierte el str a number
                valores.push(parseFloat(arr));
            }
        }
        //termina de recorrel el string que recibe
        while(operadores.length > 0){
            let operador=operadores.pop() ;
            let valor2=valores.pop();
            let valor1=valores.pop();
            valores.push(realizarOperacion(operador,valor1,valor2));
    }
    //cuando tengo un unico valor, devuelve ese valor como resultado
    if(valores.length===1){
        return valores[0];
    }else{
        throw new Error('Expresion no Valida');
    }
    //captura el error y lo devuevle como mensaje
}catch(error){
    return 'Error'+error.message;
}
}
//Determinamos el orden en que se realizan la operaciones
function tienePrioridad(operador1,operador2){
    let prioridades={'+':1,'-':1,'x':2,'/':2};
    return prioridades[operador1]<=prioridades[operador2];
}
//Tomamos los valores proximos a un operador para realizar le calculo
function realizarOperacion(operador, valor1,valor2){
    switch(operador){
        case '+':
            return valor1+valor2;
        case '-':
            return valor1-valor2;
        case 'x':
            return valor1*valor2;
        case '/':
            if (valor2!==0) {
                return valor1/valor2;     
            } else{
                throw new Error("Division por cero")
            }
        default:
            throw new Erro("Operador no valido")      
    } 
}

//Dar resultado
function resultado(){
    let expresion=display.textContent;
    let resultado=calcular(expresion)
    display.textContent="";
    display.textContent=display.textContent+resultado;
}