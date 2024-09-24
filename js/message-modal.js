const body = document.querySelector('body')


function createEventClsoe(el){
  const button = el.querySelector('button');
  function closeKeyMassage (evt){
    if(evt.key==='Escape'){
      el.remove()
      document.removeEventListener('keydown',closeKeyMassage)
    }
  }
  button.addEventListener('click',()=>{
    el.remove()
    document.removeEventListener('keydown',closeKeyMassage)
  })
  document.addEventListener('keydown',closeKeyMassage)

}


function createSuccessModal(textMessage='Изображение успешно загружено'){
  const success = document.createElement('section')
  success.classList.add("success")
  success.insertAdjacentHTML('afterbegin',
    `<div class="success__inner">
        <h2 class="success__title">${textMessage}</h2>
        <button type="button" class="success__button">Круто!</button>
      </div>`
  )
    body.insertAdjacentElement(
    'beforeend',
    success
  )

  createEventClsoe(success)

}

function createErrorModal(textMessage='Ошибка при отправки данных') {
  const error = document.createElement('section')
  error.classList.add("error")
  error.insertAdjacentHTML('afterbegin',
  `  <div class="error__inner">
        <h2 class="error__title">Ошибка загрузки файла</h2>
        <button type="button" class="error__button">Загрузить другой файл</button>
      </div>`
  )
    body.insertAdjacentElement(
    'beforeend',
    error
  )
  createEventClsoe(error)
}


export {createSuccessModal,createErrorModal}
