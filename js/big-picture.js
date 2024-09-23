import {clearChildren} from "./utils.js"

const body = document.querySelector('body')
const bigPicture = document.querySelector(".big-picture")
const bigPictureImg = bigPicture.querySelector(".big-picture__img>img")
const bigPictureLike = bigPicture.querySelector(".likes-count")
const commentsCount = bigPicture.querySelector(".comments-count")
const comments = bigPicture.querySelector(".social__comments")
const descriptionPicture = bigPicture.querySelector('.social__caption')
const btnClose = bigPicture.querySelector(".big-picture__cancel")
const commentsCountActive = bigPicture.querySelector('.comments-count_active')
const btnComentsLoader = bigPicture.querySelector('.social__comments-loader')
let lastComents = []

function showBigPicture (el){
  bigPicture.classList.remove("hidden")
  body.classList.add("modal-open")
  renderBigPicture(el)
  btnClose.addEventListener('click',closeBigPicture)
  document.addEventListener('keydown',closeBigPictureKeyboard)
  btnComentsLoader.addEventListener("click",commentsLoader)
}


function renderBigPicture(data){
  console.log(data)
  bigPictureImg.src = data.url
  bigPictureLike.textContent=data.likes
  clearChildren(comments)
  commentsCountActive.textContent=0
  commentsCount.textContent=data.comments.length
  const commentHtml =  createCommentHtml(data.comments)
  comments.insertAdjacentHTML('beforeend',commentHtml)
  descriptionPicture.textContent = data.description
  if(lastComents.length>0){
    btnComentsLoader.style.display="block"
  }
  else{
    btnComentsLoader.style.display="none"
  }
}

function createCommentHtml(commentArray){
  lastComents=[]
  let newComments = ''
  commentArray.forEach((comment,i) => {
    const commentHtml = `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
    <p class="social__text">${comment.message}</p>
    </li>`
    if(i<5){
      newComments+=commentHtml
      commentsCountActive.textContent=+commentsCountActive.textContent+1
    }
    else{
      lastComents.push(comment)
    }

  });
  console.log(lastComents)
  return newComments
}

function closeBigPicture(){
  bigPicture.classList.add("hidden")
  btnClose.removeEventListener('click',closeBigPicture)
  document.removeEventListener('keydown',closeBigPictureKeyboard)
  body.classList.remove("modal-open")
}

function closeBigPictureKeyboard(evt){
  if(evt.target.key="Еscape"){
    closeBigPicture()
  }
}
function commentsLoader(){
  const commentHtml =  createCommentHtml(lastComents)
  comments.insertAdjacentHTML('beforeend',commentHtml)
  if(lastComents.length===0){
    btnComentsLoader.style.display="none"
  }
}

export {showBigPicture}
