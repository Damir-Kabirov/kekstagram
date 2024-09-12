import {createPost} from './creat-post.js'
import {showBigPicture} from './big-picture.js'

const pictureTemplat = document.querySelector('#picture').content
const pictureContent = pictureTemplat.querySelector('.picture')
const pictureFragment = document.createDocumentFragment()
const pictureContainer = document.querySelector('.pictures')

createPost(25).forEach(({url,likes,comments})=>{
  const picture = pictureContent.cloneNode(true)
  picture.querySelector('img').src=url
  picture.querySelector('.picture__comments').textContent = comments.length
  picture.querySelector('.picture__likes').textContent = likes
  pictureFragment.append(picture)
})
pictureContainer.append(pictureFragment)

pictureContainer.addEventListener('click',(evt)=>{
  evt.preventDefault()
  if(evt.target.parentElement.classList.contains("picture")){
    showBigPicture(evt.target.parentElement)
  }
})
