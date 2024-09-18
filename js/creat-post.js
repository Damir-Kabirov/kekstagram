import {createRandomNumber} from './utils.js'
import {messegeText,names} from './post-moks.js'
const sentences = messegeText.split(/[.!?]\s/);
const createId = createRandomId(1,25);
const createUrl = createRandomId(1,25);
const creatIdComments = createRandomId(1,100)

function createPost (count){
  const postsArray = [];
  for (let i=0;i<=count;i++){
    postsArray.push(cretePostDescription(i))
  }
  return postsArray
}



function cretePostDescription() {
  return {
    id:createId(),
    url:`photos/${createUrl()}.jpg`,
    description:'В идеале, данные должны генерироваться случайно',
    likes:createRandomNumber(15,200),
    comments:createComments(createRandomNumber(1,21))
  };
}

function createComments (count){
  const comments = [];
  for ( let i=0;i<count;i++){
    comments.push({
      id:creatIdComments(),
      avatar:`img/avatar-${createRandomNumber(1,6)}.svg`,
      message:createRandomMassage(createRandomNumber(1,2)),
      name:names[createRandomNumber(0,names.length-1)]
    });
  }
  return comments
}

function createRandomMassage (count){
  const messageString = [];
  for (let i=0;i<count;i++){
    messageString.push(sentences[createRandomNumber(0,sentences.length-1)]);
  }
  return messageString.join('.')
}

function createRandomId(min,max){
  const valuesId = []
  if (valuesId.length>max-min){
    return null
  }
  return ()=>{
    let id = createRandomNumber(min,max)
    while(valuesId.includes(id)){
      id = createRandomNumber(min,max)
    }
    return id
  }
}

export {createPost}
