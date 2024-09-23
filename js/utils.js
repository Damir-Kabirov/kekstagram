const errorMessage = document.querySelector(".error-modal")
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
function clearChildren(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function showErrorMessage (errorText){
    errorMessage.querySelector('p').textContent=errorText
    errorMessage.classList.remove('hidden')
    setTimeout(()=>{
      errorMessage.classList.add('hidden')
    },5000)
}

export {createRandomNumber,clearChildren,showErrorMessage}
