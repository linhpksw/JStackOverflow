

const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");


const totalCount = document.getElementById("total-count");


var count = 0;


totalCount.innerHTML = count;


const handleIncrement = () => {
  count++;
  totalCount.innerHTML = count;
};


const handleDecrement = () => {
  count--;
  totalCount.innerHTML = count;
};
incrementCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);


// countlike




// const countLike = document.getElementById("count-like");
// const countDislike = document.getElementById("count-dislike");


// const totalLike = document.getElementById("total-like");


// var count = 0;


// totalLike.innerHTML = count;


// const handleLike = () => {
//   count++;
//   totalLike.innerHTML = count;
// };


// const handleDislike = () => {
//   count--;
//   totalLike.innerHTML = count;
// };
// countLike.addEventListener("click", handleLike);
// countDislike.addEventListener("click", handleDislike);


//js answer

const list = document.getElementById('list');
const search = document.getElementById('search');

getAnswerFromAPI();
async function getAnswerFromAPI() {
  const responseAPT = await fetch('https://jsonplaceholder.typicode.com/comments');
  const  data  = await responseAPT.json();
  list.inertHTML = ``;
  data.forEach(data => {
    const divItem = document.createElement('div');
    divItem.innerHTML = `
    <div class="flex p-4 items-start space-x-4">
      <img class="w-10 h-10 rounded-full" src="" alt="Avatar">
      <div id="answer1" class="m-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-orange-300"> ${data.name} </h2>
          <p class="text-sm text-gray-400">3h ago</p>
        </div>
        <p class="mt-2 text-white">${data.body} </p>
          <div id="icon-commnet" class="flex  text-gray-400 mt-3">
          <i id="count-like" class="material-icons  text-gray-400 mr-3 hover:text-orange-600 ">thumb_up </i>
          <div id="total-like" class="align-middle text-center mr-2">4</div>
          <i id="count-dislike" class="material-icons  text-gray-400 mr-3 hover:text-orange-600 ">thumb_down </i>
          <div class="hover:bg-orange-600 hover:text-white px-4 font-bold text-gray-400 rounded flex items-center align-middle ">
              <i class="material-icons inline-block ">reply </i>
              <div class="inline-block">reply</div>
          </div>                                
          </div>
      </div>

      </div>
    `;
    list.appendChild(divItem);
  });
  

  //const button = document.getElementById('cmt-btn');

// add a click event listener to the button
  // button.addEventListener('click', () => {
  // find the element to scroll to
//   const elementToScrollTo = document.querySelector('fill-answer');


//   elementToScrollTo.scrollIntoView({ behavior: 'smooth' });

//   elementToScrollTo.classList.add('highlight');
// });

//add question

function myFunction() {
  const element = document.getElementById("fill-answer");
  element.scrollIntoView();
}
