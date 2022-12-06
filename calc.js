var darkmode=0;
function changeMode(){
    if(darkmode==0){
        document.getElementById("stylesheet").href="./dark.css";
        darkmode=1;
    }else{
        document.getElementById("stylesheet").href="./light.css";
        darkmode=0;
    }
}


var state=0;
var resultvalue=0;
var operand1=0;
var operand2=0;
var operator='';

function stateController(type,value){
    if(type=='d'){
        if(state==0 || state==1){
            S1(value);
        }
        else if(state==2 || state==3){
            S3(value);
        }
    }
    else if(type=='o'){
            S2(value);
    }
    else if(type=='e'){
            if(state==3){
                S0('e');
            }
            else if(state==2){
                S3(resultvalue);
                S0('e');
            }
            else if(state==0){
                S0('e')
            }
    }
    else if(type=='c'){ 
        S0('c');

    }
}

function S0(op){  
    const expression = document.getElementById("expression");
    const result = document.getElementById("result");
    if(state==3 && op!='c'){
        if(operator=='+') resultvalue = operand1 + operand2;
        else if(operator =='-') resultvalue = operand1 - operand2;
        else if(operator =='*') resultvalue = operand1 * operand2;
        else if(operator =='/') resultvalue = operand1 / operand2;
        resultvalue=Number(resultvalue.toFixed(2));
        result.textContent=resultvalue;
        expression.textContent=operand1+operator+operand2+'=';
    }
    else if(state==0 && op!='c' && operator!=''){
        operand1=resultvalue;
        expression.textContent=operand1+operator+operand2+'=';
        if(operator=='+') resultvalue=operand1+ operand2;
        else if(operator =='-') resultvalue=operand1-operand2;
        else if(operator =='*') resultvalue=operand1*operand2;
        else if(operator =='/') resultvalue=operand1/operand2;
        resultvalue=Number(resultvalue.toFixed(2));
        result.textContent=resultvalue;
    }
    else if(op=='c'){
        resultvalue=0;
        operand1=0;
        operand2=0;
        operator='';
        expression.textContent='';
        result.textContent=resultvalue;
    }
    else{
        result.textContent=resultvalue;
    }
    state=0;
}

function S1(number){
    if(state==0){
        resultvalue=number;
        expression.textContent='';
    }
    else{
        resultvalue=resultvalue*10 + number;
    }
    expression.textContent=resultvalue;
    result.textContent=resultvalue;
    operand1=resultvalue;
    state=1;
}

function S2(op){
    if(state==1){
        operator=op;
        expression.textContent=operand1+op;
    }
    else if(state==2){
        expression.textContent = expression.textContent.slice(0, -1) + op;
        operator=op;
    }
    else if(state==3){
        if(operator=='+') operand1+=operand2;
        else if(operator =='-') operand1-=operand2;
        else if(operator =='*') operand1*=operand2;
        else if(operator =='/') operand1/=operand2;
        operand1=Number(operand1.toFixed(2));
        resultvalue=operand1;
        expression.textContent = operand1 + op;
        operator=op;
        result.textContent=resultvalue;
    }
    else if(state==0){
        expression.textContent=resultvalue+op;
        operand1=resultvalue;
        operator=op;
    }
    state=2;
}

function S3(number){
    if(state==2){
        operand1=resultvalue;
        operand2=number;
    }
    else{
        operand2=operand2*10 + number;
    }
    expression.textContent=operand1 + operator + operand2; 
    result.textContent=operand2;
    state=3;
}
