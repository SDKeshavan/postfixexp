const postFixExpCont = document.querySelector(".postfixexp-cont").children;
var postFixExp=[];
var operandArr=[];
var operator=['+', '-', '/', '*'];
var te=0;



function convert(){
    var oriExp = document.forms["inputForm"]["expression"].value;    
    var temp="";

    for(i=0;i<oriExp.length;i++){
        if(oriExp[i]!=" "){
            temp+=oriExp[i];
        }else{
            postFixExp.push(temp);
            temp="";
        }
    }

    if(temp!=""){
        postFixExp.push(temp);
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
            
            var num2=parseInt(operandArr.pop());

            setTimeout((te)=>{
                postFixExpeval[te].innerHTML="";
            },700,te);
            
            te-=1;
            var num1=parseInt(operandArr.pop());
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
