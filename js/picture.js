import {showBigPicture} from './big-picture.js'
import {clearChildren} from './utils.js'

const pictureTemplat = document.querySelector('#picture').content
const pictureContent = pictureTemplat.querySelector('.picture')
const pictureFragment = document.createDocumentFragment()
const pictureContainer = document.querySelector('.pictures')

function createPost(posts,cb){
  renderPost(posts)
pictureContainer.addEventListener('click',(evt)=>{
  if(evt.target.parentElement.classList.contains("picture")){
    const dataPicture = posts.find(post=>post.id===+evt.target.parentElement.id)
    console.log(dataPicture)
    showBigPicture(dataPicture)

  }
})
  cb(posts)
}


function renderPost(posts){
  clearChildren(pictureContainer,'picture')
  posts.forEach(({id,url,likes,comments})=>{
    const picture = pictureContent.cloneNode(true)
    picture.id = id
    picture.querySelector('img').src=url
    picture.querySelector('.picture__comments').textContent = comments.length
    picture.querySelector('.picture__likes').textContent = likes
    pictureFragment.append(picture)
  })
  pictureContainer.append(pictureFragment)
}




export {createPost,renderPost}
