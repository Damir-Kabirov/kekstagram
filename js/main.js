import {createPost} from './picture.js'
import {showErrorMessage} from './utils.js'
import './form.js'
import {getPicture} from './api.js'
import {showFilter} from './filter-post.js'
import { debounce } from './utils.js'

getPicture (createPost,showErrorMessage,showFilter)


