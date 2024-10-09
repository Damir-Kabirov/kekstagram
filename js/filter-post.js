import {renderPost} from './picture.js'
import {getRandomElements} from './utils.js'
const filterBox = document.querySelector('.img-filters')
const filterForm = filterBox.querySelector('.img-filters__form')
function showFilter(data){
  filterBox.classList.remove('img-filters--inactive')
  filterForm.addEventListener('click',filterHandler(data))
}

function filterHandler (date){
    return function (evt){
       if(evt.target.id==='filter-default'){
        renderPost(date)

       }
       else if(evt.target.id==='filter-random'){
        renderPost (getRandomElements(date,10))
       }
       else if (evt.target.id==='filter-discussed'){
          const cloneDate = date.slice(0)
          cloneDate.sort((a,b)=>b.comments.length-a.comments.length)
          renderPost(cloneDate)
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
