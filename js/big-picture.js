import {clearChildren} from "./utils.js"
import {createPost} from "./creat-post.js"

const body = document.querySelector('body')
const bigPicture = document.querySelector(".big-picture")
const bigPictureImg = bigPicture.querySelector(".big-picture__img>img")
const bigPictureLike = bigPicture.querySelector(".likes-count")
const socialCommentCount = bigPicture.querySelector('.social__comment-count')
const commentsCount = bigPicture.querySelector(".comments-count")
const comments = bigPicture.querySelector(".social__comments")
const descriptionPicture = bigPicture.querySelector('.social__caption')
const btnClose = bigPicture.querySelector(".big-picture__cancel")
const commentsCountActive = bigPicture.querySelector('.comments-count_active')
const btnComentsLoader = bigPicture.querySelector('.social__comments-loader')
let lastComents = []

// showBigPicture()
function showBigPicture (el){
  bigPicture.classList.remove("hidden")
  body.classList.add("modal-open")
  const dataRandom = createPost(1)
  renderBigPicture(el,dataRandom)
  // socialCommentCount.classList.add("hidden")
  // comments.classList.add("hidden")
  btnClose.addEventListener('click',closeBigPicture)
  document.addEventListener('keydown',closeBigPictureKeyboard)
  btnComentsLoader.addEventListener("click",commentsLoader)
}


function renderBigPicture(data,dataRandom){
  const dataImg = data.querySelector("img")
  const likeCount = data.querySelector(".picture__likes").textContent
  bigPictureImg.src = dataImg.src
  bigPictureLike.textContent=likeCount
  clearChildren(comments)
  commentsCountActive.textContent=0
  commentsCount.textContent=dataRandom[0].comments.length
  const commentHtml =  createCommentHtml(dataRandom[0].comments)
  comments.insertAdjacentHTML('beforeend',commentHtml)
  descriptionPicture.textContent = dataRandom.description
  if(lastComents.length>0){
    btnComentsLoader.style.display="block"
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
