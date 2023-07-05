const postFixExpCont = document.querySelector(".postfixexp-cont").children;
var postFixExp=[];
var operandArr=[];
var operator=['-', '+', '/', '*'];
var te=0;



function convert(){
    var oriExp = document.forms["inputForm"]["expression"].value;    
    var oriExpArr=[]
    var temp="";
    for(var i=0;i<oriExp.length;i++){
        if(!operator.includes(oriExp[i])){
            temp+=oriExp[i];
        }else{
            oriExpArr.push(temp);
            oriExpArr.push(oriExp[i]);
            temp="";
        }
    }

    if(temp!=""){
        oriExpArr.push(temp);
    }

    var operatorStack=[];
    var top=-1;

    for(var j=0;j<oriExpArr.length;j++){
        if(operator.includes(oriExpArr[j])){
            if(top==-1){
                operatorStack.push(oriExpArr[j]);
                top+=1;
            }else{
                if(operator.indexOf(operatorStack[top])<=operator.indexOf(oriExpArr[j])){
                    operatorStack.push(oriExpArr[j]);
                    top+=1;
                }else{
                    while(operator.indexOf(operatorStack[top])>operator.indexOf(oriExpArr[j])){
                        postFixExp.push(operatorStack.pop());
                        top-=1;
                    }
                    operatorStack.push(oriExpArr[j]);
                    top+=1;
                }
            }
        }else{
            postFixExp.push(parseFloat(oriExpArr[j]));
        }
    }


    if(top>=0){
        while(top>=0){
            postFixExp.push(operatorStack.pop());
            top-=1;
        }
    }

    for(var m=0;m<postFixExp.length;m++){
        setTimeout(
            function addelepost(m){
                postFixExpCont[m].innerHTML=postFixExp[m];
                postFixExpCont[m].style.backgroundColor="blue"
            }
            ,500*m,m);
    }

}


var k=0;

function eval(){
    console.log(k);

    const postFixExpeval = document.querySelector(".postfixeval-cont").children;

    if(k!=postFixExp.length){
        if(!operator.includes(postFixExp[k])){
            operandArr.push(postFixExp[k]);
            setTimeout(function(k){
                postFixExpCont[k].style.border="3px solid red";
                postFixExpeval[te].innerHTML=postFixExp[k];
                te+=1;
                setTimeout((k)=>{
                    postFixExpCont[k].style.border="1px solid #000";
                },500,k);
            },500,k);
        }else{
            postFixExpCont[k].style.border="3px solid red";
            setTimeout((k)=>{
                document.querySelector(".oper").innerHTML= postFixExp[k];
                setTimeout((k)=>{
                    postFixExpCont[k].style.border="1px solid #000";
                },700,k);
            },700,k);
            te-=1;
            
            postFixExpeval[te].style.border="3px solid red";
            postFixExpeval[te-1].style.border="3px solid red";

            setTimeout((te)=>{
                postFixExpeval[te].style.border="1px solid #000";
                postFixExpeval[te-1].style.border="1px solid #000";
            },700,te);
            
            var num2=operandArr.pop();

            setTimeout((te)=>{
                postFixExpeval[te].innerHTML="";
            },700,te);
            
            te-=1;
            var num1=operandArr.pop();
            setTimeout((te)=>{
                postFixExpeval[te].innerHTML="";
            },700,te);
            te-=1;

            document.querySelector(".num1").innerHTML=num1;
            document.querySelector(".num2").innerHTML=num2;

            te+=1;


            setTimeout((te,k,num1,num2)=>{
                if(postFixExp[k]=="+"){
                    operandArr.push(num1+num2);
                    document.querySelector(".ans").innerHTML=num1+num2;
                    postFixExpeval[te].innerHTML=num1+num2;
                }else if(postFixExp[k]=="-"){
                    operandArr.push(num1-num2);
                    document.querySelector(".ans").innerHTML=num1-num2;
                    postFixExpeval[te].innerHTML=num1-num2;
                }else if(postFixExp[k]=="*"){
                    operandArr.push(num1*num2);
                    document.querySelector(".ans").innerHTML=num1*num2;
                    postFixExpeval[te].innerHTML=num1*num2;
                }else{
                    operandArr.push(num1/num2);
                    document.querySelector(".ans").innerHTML=num1/num2;
                    postFixExpeval[te].innerHTML=num1/num2;
                }
            },700,te,k,num1,num2);
        
            te+=1;

        }
        k+=1;
    }else{
        result = operandArr[0];
        console.log(result);
        document.querySelector(".result").innerHTML=result;
    }
}


function ref(){
    location.reload();
}
