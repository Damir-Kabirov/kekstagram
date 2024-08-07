function createRandomNumber(min=0,max){
  let minNumber = Math.ceil(min);
  let maxNumber = Math.floor(max);
  if(minNumber>maxNumber){
    [minNumber,maxNumber]=[maxNumber,minNumber];
  }
  return Math.floor(Math.random()*(maxNumber-minNumber+1)+minNumber);
}

function checkLengthString(str,maxChar){
  return !(str.length-1>maxChar);
}


console.log(createRandomNumber(10,20))

checkLengthString('Fddd',20);
