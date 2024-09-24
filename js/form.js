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
const effectLevel = formUploadImg.querySelector(".effect-level")
const effectList = {
  "none":"effects__preview--none",
  "chrome":"effects__preview--chrome",
  "sepia":"effects__preview--sepia",
  "marvin":"effects__preview--marvin",
  "phobos":"effects__preview--phobos",
  "heat":"effects__preview--heat"
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
  formImgDownload.reset()

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
  if(scaleValue>=0){
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
  imgPreview.style.transform =`scale (${percent*0.01})`
}

function changeEfectImg (evt){
  for(key in effectList){
    imgPreview.classList.remove(effectList[key])
  }
  let effectName = evt.target.id.split("-")[1]
  let className = effectList[effectName]
  imgPreview.classList.add(className)
  effectName==="none"?effectLevel.style.display = "none":effectLevel.style.display = "block"
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
