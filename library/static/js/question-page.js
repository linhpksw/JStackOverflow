// ==========================================================
const h1 = document.getElementsByTagName('h1')[0];
const questionId = h1.textContent;
// let toolbarOptions = [
//     [{ header: [1, 2, 3] }],
//     // [{ header: 1 }, { header: 2 }],
//     ['bold', 'italic', 'underline'],
//     [{ list: 'ordered' }, { list: 'bullet' }],
//     ['blockquote', 'code-block'],
//     ['link', 'image'],
// ];
// let options = {
//     modules: { toolbar: toolbarOptions, syntax: true },
//     placeholder: 'Compose an epic...',
//     theme: 'snow',
// };

// const quill = new Quill('#editor', options);
// const container = document.querySelector('#delta-container');

const getQuestion = async () => {
    try {
        const questionTitle = document.getElementById('question-title');
        const postTime = document.getElementById('post-time');

        // const questionContent = quill.getContents();

        const URL = `https://jstackoverflow.jsclub.me/api/questions_manager/questions/${questionId}`;

        const opt = {
            method: 'GET',
        };

        const response = await fetch(URL, opt);
        const jsonResponse = await response.json();

        console.log(jsonResponse);
    } catch (err) {
        console.log(err);
    }
};

// ==============================================================

// var count = 0;

// totalCount.innerHTML = count;

// const handleIncrement = () => {
//     count++;
//     totalCount.innerHTML = count;
// };

// const handleDecrement = () => {
//     count--;
//     totalCount.innerHTML = count;
// };
// incrementCount.addEventListener('click', handleIncrement);
// decrementCount.addEventListener('click', handleDecrement);

// const question = document.getElementById('just-question');

// getQuestionFromAPI();

// try {
//     async function renderQuestion() {
//         const responseAPT = await fetch('https://jstackoverflow.jsclub.me/questions_manager/questions/$ { id }');
//         const data = await responseAPT.json();
//         const divItem = document.createElement('div');
//         divItem.innerHTML = `
//   <div id="just-question">

// <h1 id="title-ques" class="title-question "> ${data.title} </h1>
// <ul class="note-list text-white flex mb-4 text-sm">
//     <li class="mr-4 font-semibold">Askedd<span class="note-item ml-2">today</span></li>
//     <li class="mr-4 font-semibold">Modified<span class="note-item ml-2">today</span></li>
//     <li class="mr-4 font-semibold">Viewd<span class="note-item ml-2">24 times</span></li>
// </ul>
// <hr width="100%">
// <div class="flex p-5">

//     <div  class="float-left px-1 mr-3 ">
//         <button id="increment-count" class="material-icons  text-white text-xl"  >arrow_drop_up</button>
//         <div id="total-count"   class="text-white text-center align-middle"></div>
//         <button id="decrement-count" class="material-icons  text-white text-4xl">arrow_drop_down</button>
//     </div>
//     <p id="content-ques" class="content-question md-48 text-white float-right text-justify"> ${data.content} </p>
// </div>

// <div id="tags" class="">
//     <ul class=" text-xs  ">
//         <li class="inline-block rounded-sm ">${data.tag}</li>
//     </ul>

// </div>
// </div>
//   `;
//     }
//     list.appendChild(divItem);
// } catch (err) {
//     console.error(err);
// }

// function myFunction() {
//     const element = document.getElementById('fill-answer');
//     element.scrollIntoView();
// }

// const incrementCount = document.getElementById('increment-count');
// const decrementCount = document.getElementById('decrement-count');

// const totalCount = document.getElementById('total-count');
