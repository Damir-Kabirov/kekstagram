import {renderPost} from './picture.js'
import {getRandomElements} from './utils.js'
import {debounce} from './utils.js'
const filterBox = document.querySelector('.img-filters')
const filterForm = filterBox.querySelector('.img-filters__form')
const RERENDER_DELAY = 500;
const debouncedRenderPictures = debounce(renderPost)

function showFilter(data){
  filterBox.classList.remove('img-filters--inactive')
  filterForm.addEventListener('click',filterHandler(data))
}

function filterHandler (date){
  debounce(()=>renderPost (randomPictures),RERENDER_DELAY)
    return function (evt){
       if(evt.target.id==='filter-default'){
        debouncedRenderPictures(date)
       }
       else if(evt.target.id==='filter-random'){
        const randomPictures = getRandomElements(date,10)
        debouncedRenderPictures (randomPictures)
       }
       else if (evt.target.id==='filter-discussed'){
          const cloneDate = date.slice(0)
          cloneDate.sort((a,b)=>b.comments.length-a.comments.length)
          debouncedRenderPictures(cloneDate)
       }

       addActiveFilter(evt.target)
    }
}

function addActiveFilter (el){
  for (let child of filterForm.children){
    child.classList.remove('img-filters__button--active')
  }
  el.classList.add('img-filters__button--active')
}

export {showFilter}
