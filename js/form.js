
import {createEffectSlider,hiddenSlider} from './noui-slider.js'
import { createErrorModal,createSuccessModal } from "./message-modal.js"
import {sendingPost} from './api.js'
const body = document.querySelector('body')
const uploadFile = body.querySelector("#upload-file")
const formImgDownload = body.querySelector(".img-upload__form")
const formUploadImg = body.querySelector('.img-upload__overlay')
const closeFormBtn = formUploadImg.querySelector("#upload-cancel")
const scaleControlValue = formUploadImg.querySelector(".scale__control--value")
const scaleControlSmaller = formUploadImg.querySelector(".scale__control--smaller")
const scaleControlBigger = formUploadImg.querySelector(".scale__control--bigger")
const imgPreview = formUploadImg.querySelector(".img-upload__preview>img")
const effectsRadio  = formUploadImg.querySelectorAll(".effects__radio")
const FILE_TYPES = ['jpg','gif','png']
const effectList = {
  "none":{"class":"effects__preview--none"},
  "chrome":{"class":"effects__preview--chrome","min":0,"max":1,"step":0.1,"typeStep":"","filter":"grayscale"},
  "sepia":{"class":"effects__preview--sepia","min":0,"max":1,"step":0.1,"typeStep":"","filter":"sepia"},
  "marvin":{"class":"effects__preview--marvin","min":1,"max":100,"step":1,"typeStep":"%","filter":"invert"},
  "phobos":{"class":"effects__preview--phobos","min":0,"max":3,"step":0.1,"typeStep":"px","filter":"blur"},
  "heat":{"class":"effects__preview--heat","min":1,"max":3,"step":0.1,"typeStep":"","filter":"brightness"},
}
const inputHashtags = formImgDownload.querySelector(".text__hashtags")
const btnSubmit = document.querySelector("#upload-submit")
let pristine = new Pristine(formImgDownload,{
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__error',
  errorClass: 'form__img--invalid', // Класс, обозначающий невалидное поле
  successClass: 'form__img--valid', // Класс, обозначающий валидное поле
});
pristine.addValidator(inputHashtags,hashtagValidate,'Не корректный хештег')


function openFormUpload(){
  showImgLoad(uploadFile.files[0])
  formUploadImg.classList.remove('hidden')
  body.classList.add("modal-open")
  closeFormBtn.addEventListener("click",closeFormUpload)
  document.addEventListener("keydown",closeFormIsKeyboard)
  scaleControlSmaller.addEventListener("click",ruduseToScaleImg)
  scaleControlBigger.addEventListener("click",addToScaleImg)
  effectsRadio.forEach(radioBtn => {
  radioBtn.addEventListener("click",changeEfectImg)
  formImgDownload.addEventListener("submit",submitFormUpload)
});
}

function showImgLoad(file){
  const fileName = file.name.toLowerCase()
  const matches = FILE_TYPES.some((tp)=>{
    return fileName.endsWith(tp)
  })
  if(matches){
    imgPreview.src = URL.createObjectURL(file)
  }
}

function closeFormUpload(){
  btnSubmit.disabled = false
  formUploadImg.classList.add('hidden')
  body.classList.remove("modal-open")
  closeFormBtn.removeEventListener("click",closeFormUpload)
  document.removeEventListener("keydown",closeFormIsKeyboard)
  scaleControlSmaller.removeEventListener("click",ruduseToScaleImg)
  scaleControlBigger.removeEventListener("click",addToScaleImg)
  effectsRadio.forEach(radioBtn => {radioBtn.removeEventListener("click",changeEfectImg)});
  formImgDownload.removeEventListener("submit",submitFormUpload)
  resetForm()

}


function resetForm(){
  formImgDownload.reset()
  hiddenSlider()
  changeScaleImg(100)
}


function closeFormIsKeyboard(evt){
  if(!evt.target.classList.contains("text__hashtags") && !evt.target.classList.contains("text__description")){
    if(evt.key==="Escape"){
      closeFormUpload()
    }
  }

}

function ruduseToScaleImg(){
  let scaleValue = +scaleControlValue.value.slice(0,-1)-25
  if(scaleValue>=25){
    scaleControlValue.value = scaleValue + '%'
    changeScaleImg(scaleValue)
  }
}

function addToScaleImg(){
  let scaleValue = +scaleControlValue.value.slice(0,-1)+25
  if(scaleValue<=100){
    scaleControlValue.value = scaleValue + '%'
    changeScaleImg(scaleValue)
  }
}

function changeScaleImg(percent){
  imgPreview.style.transform =`scale(${percent/100})`

}

function changeEfectImg (evt){
  for( let key in effectList){
    imgPreview.classList.remove(effectList[key]['class'])
  }
  let effectName = evt.target.id.split("-")[1]
  let className = effectList[effectName]["class"]
  imgPreview.classList.add(className)
  if(className!=="effects__preview--none"){
    createEffectSlider(
      effectList[effectName],
    )
  }
  else{
    hiddenSlider()
  }
  // effectName==="none"?effectLevel.style.display = "none":effectLevel.style.display = "block"
}

function submitFormUpload(evt){
  evt.preventDefault();
  if(pristine.validate()){
    btnSubmit.disabled = true
    const dataForm =  new FormData(formImgDownload);
    sendingPost({createSuccessModal,createErrorModal,closeFormUpload},dataForm)
  }
}


function hashtagValidate(value){
  const reHeshtag = /^#[A-Za-zА-Яа-яёЁ0-9]{1,20}$/
  const hastagsList = value.split(" ")
  let isValid = true
  if(value===''){
    return true
  }
  if(hastagsList.length>5){
    return false
  }
  hastagsList.forEach(hashtag=>{
    if(!reHeshtag.test(hashtag)){
      isValid = false
    }
  })
  const duplicates = hastagsList.filter((e, index, arr) => arr.indexOf(e) !== index)
  if(duplicates.length>0){
    isValid = false
  }
  return isValid
}

 uploadFile.addEventListener("change",openFormUpload)
