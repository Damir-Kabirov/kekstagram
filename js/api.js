function getPicture (collbackResult,errorHandler,collbackOther){
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
  .then((res)=>{
    if(res.ok){
      return res.json()
    }
    console.log(1)
    throw new Error ('Ошибка получения данных,перезагрузите страницу')
    }
  )
  .then(data=>collbackResult(data,collbackOther))
  .catch(err=>{
    errorHandler(err)
  })
}

function sendingPost (callbacks,body){
  const {createSuccessModal,createErrorModal,closeFormUpload} = callbacks
  fetch('https://25.javascript.htmlacademy.pro/kekstagram',
      {
          method:'POST',
          body
      }).then(res=>{
          if(res.ok){
            createSuccessModal('Данные успешно отправлены на сервер')
              return res
          }
          else{
            createErrorModal('Ошибка отправки данных')
          }
      }).then(()=>closeFormUpload())
}



export {getPicture,sendingPost}
