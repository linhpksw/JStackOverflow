const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");

const totalCount = document.getElementById("total-count");
const h1 = document.getElementsByTagName("h1")[0];

const id = h1.textContent;
console.log(id);

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

// get question

{
  /* <div id="just-question">

<h1 id="title-ques" class="title-question ">Làm gì khi có quá nhiều thứ để học ?</h1>
<ul class="note-list text-white flex mb-4 text-sm">
    <li class="mr-4 font-semibold">Askedd<span class="note-item ml-2">today</span></li>
    <li class="mr-4 font-semibold">Modified<span class="note-item ml-2">today</span></li>
    <li class="mr-4 font-semibold">Viewd<span class="note-item ml-2">24 times</span></li>
</ul>
<hr width="100%">
<div class="flex p-5">

    <div  class="float-left px-1 mr-3 ">
        <button id="increment-count" class="material-icons  text-white text-xl"  >arrow_drop_up</button>
        <div id="total-count"   class="text-white text-center align-middle"></div> 
        <button id="decrement-count" class="material-icons  text-white text-4xl">arrow_drop_down</button>
    </div> 
    <p id="content-ques" class="content-question md-48 text-white float-right text-justify">Chả là năm nay e định học thêm nhiều kĩ năng mềm để có ích cho bản thân sau này và đã lên hẳn 1 list các kỹ năng cần học,kết quả là quá nhiều nên e không biết phải sắp xếp học các kỹ năng sao cho hợp lý,mong các bác cho e xin vài lời khuyên.</p>
</div>

<div id="tags" class="">
    <ul class=" text-xs  ">
        <li class="inline-block rounded-sm ">TRS601</li>
        <li class="inline-block rounded-sm">MAE101</li>
        <li class="inline-block rounded-sm">TRS501</li>
    </ul>

</div>
</div> */
}

const question = document.getElementById("just-question");

getQuestionFromAPI();

try {
  async function getQuestionFromAPI() {
    const responseAPT = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await responseAPT.json();
    const divItem = document.createElement("div");
    divItem.innerHTML = `
  <div id="just-question">

<h1 id="title-ques" class="title-question "> ${data.title} </h1>
<ul class="note-list text-white flex mb-4 text-sm">
    <li class="mr-4 font-semibold">Askedd<span class="note-item ml-2">today</span></li>
    <li class="mr-4 font-semibold">Modified<span class="note-item ml-2">today</span></li>
    <li class="mr-4 font-semibold">Viewd<span class="note-item ml-2">24 times</span></li>
</ul>
<hr width="100%">
<div class="flex p-5">

    <div  class="float-left px-1 mr-3 ">
        <button id="increment-count" class="material-icons  text-white text-xl"  >arrow_drop_up</button>
        <div id="total-count"   class="text-white text-center align-middle"></div> 
        <button id="decrement-count" class="material-icons  text-white text-4xl">arrow_drop_down</button>
    </div> 
    <p id="content-ques" class="content-question md-48 text-white float-right text-justify"> ${data.body} </p>
</div>

<div id="tags" class="">
    <ul class=" text-xs  ">
        <li class="inline-block rounded-sm ">TRS601</li>
        <li class="inline-block rounded-sm">MAE101</li>
        <li class="inline-block rounded-sm">TRS501</li>
    </ul>

</div>
</div>
  `;
  }
  list.appendChild(divItem);
} catch (err) {
  console.error(err);
}

//js answer

const list = document.getElementById("list");

getAnswerFromAPI();

async function getAnswerFromAPI() {
  const responseAPI = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  const data = await responseAPI.json();
  data.forEach((data) => {
    const divItem = document.createElement("div");
    divItem.innerHTML = `
    <div class="flex p-4 items-start space-x-4">
      <img class="w-10 h-10 rounded-full" src="/src/img/meo.jpg" alt="Avatar">
      <div id="answer1" class="m-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-medium text-orange-300"> ${data.name} </h2>
          <p class="text-sm text-gray-400">3h ago</p>
        </div>
        <p class="mt-2 text-white">${data.body} </p>
          <div id="icon-comment" class="flex  text-gray-400 mt-3">
          <button id="count-like" class="material-icons  text-gray-400 mr-3 hover:text-orange-600 ">thumb_up </button>
          <div id="total-like" class="align-middle text-center mr-2">4</div>
          <button id="count-dislike" class="material-icons  text-gray-400 mr-3 hover:text-orange-600 ">thumb_down </button>
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
}

//add question

function myFunction() {
  const element = document.getElementById("fill-answer");
  element.scrollIntoView();
}
