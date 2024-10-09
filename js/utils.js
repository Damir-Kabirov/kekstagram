const errorMessage = document.querySelector(".error-modal")
function createRandomNumber(min=0,max){
  let minNumber = Math.ceil(min);
  let maxNumber = Math.floor(max);
  if(minNumber>maxNumber){
    [minNumber,maxNumber]=[maxNumber,minNumber];
  }
  return Math.floor(Math.random()*(maxNumber-minNumber+1)+minNumber);
}


function clearChildren(parent,otherChild=null){
  if(otherChild){
    const childrens = parent.querySelectorAll(`.${otherChild}`)
    for (let child of childrens){
      console.log()
      if(child.classList.contains(otherChild)){
        child.remove()
      }
    }
  }
  else{
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}

function showErrorMessage (errorText){
    errorMessage.querySelector('p').textContent=errorText
    errorMessage.classList.remove('hidden')
    setTimeout(()=>{
      errorMessage.classList.add('hidden')
    },5000)
}

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

function throttle (callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}


function getRandomElements(arr, count) {
  // Создаем копию массива, чтобы не изменять исходный
  const shuffled = arr.slice();

  // Перемешиваем массив
  for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Возвращаем первые `count` элементов
  return shuffled.slice(0, count);
}


export {createRandomNumber,clearChildren,showErrorMessage,getRandomElements}
