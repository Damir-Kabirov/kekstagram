function getPicture (collbackResult,errorHandler){
  fetch('https://25.javascript.htmlacademy.pro/kekstagram/data')
  .then((res)=>{
    if(res.ok){
      return res.json()
    }
    throw new Error ('Ошибка получения данных,перезагрузите страницу')
    }
  )
  .then(data=>collbackResult(data))
  .catch(err=>{
    errorHandler(err)
  })
}

export {getPicture}
