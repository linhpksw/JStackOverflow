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

const questionElement = document.getElementById('question-element');

const getQuestion = async () => {
    try {
        const questionTitleElement = document.getElementById('question-title');
        const postTimeElement = document.getElementById('post-time');

        // const questionContent = quill.getContents();

        const URL = `https://jstackoverflow.jsclub.me/api/questions_manager/questions/${questionId}`;

        const opt = {
            method: 'GET',
        };

        const response = await fetch(URL, opt);
        const jsonResponse = await response.json();

        const {
            content: questionContent,
            asker_id: askerId,
            tag: questionTag,
            title: questionTitle,
            datetime_posted: postTime,
        } = jsonResponse;

        const html = ` <!-- nội dung -->
        <div id="just-question">
            <h1 id="question-title">${questionTitle}</h1>
            <ul class="note-list mb-4 flex text-sm text-white">
                <li class="mr-4 font-semibold">
                    Asked<span id="post-time" class="note-item ml-2">${postTime}</span>
                </li>
            </ul>
            <hr width="100%" />
            <div class="flex p-5">
                <div class="float-left mr-3 px-1">
                    <button id="increment-count" class="material-icons text-xl text-white">
                        arrow_drop_up
                    </button>
                    <div id="total-count" class="text-center align-middle text-white"></div>
                    <button id="decrement-count" class="material-icons text-4xl text-white">
                        arrow_drop_down
                    </button>
                </div>
            </div>

            <!-- Tags -->
            <div id="tags" class="">
                <ul class="text-xs">
                    <li class="inline-block rounded-sm">TRS601</li>
                    <li class="inline-block rounded-sm">MAE101</li>
                    <li class="inline-block rounded-sm">TRS501</li>
                </ul>
            </div>
        </div>

        <!-- biểu tượng cmt, share, save -->
        <div id="cmt-btn" onclick="myFunction()" class="m-5 ml-4 mr-3 flex py-5 text-sm text-white">
            <div
                class="mr-3 flex cursor-pointer items-center py-2 align-middle hover:rounded-sm hover:bg-gray-400">
                <i class="material-icons mr-3 text-white">forum </i>
                <div class="mr-4">comment</div>
            </div>
            <div class="flex cursor-pointer items-center align-middle hover:bg-gray-400">
                <i class="material-icons mr-2 text-white">share </i>
                <div class="mr-4">share</div>
            </div>
            <div class="flex cursor-pointer items-center align-middle hover:bg-gray-400">
                <i class="material-icons mr-2 text-white">bookmark </i>
                <div class="mr-4">save</div>
            </div>
            <div class="flex cursor-pointer items-center align-middle hover:bg-gray-400">
                <i class="material-icons mr-2 text-white">edit </i>
                <div class="mr-4">edit</div>
            </div>
        </div>

        <!-- đại diện user -->
        <div
            class="h-15 float-right flex w-52 items-center justify-center rounded-sm bg-orange-200 py-2 px-4">
            <img
                src="/src/img/ad0d063e1f57b808fd9e31ffe7d1f3a4.jpg"
                alt="Avatar"
                class="mr-4 h-16 w-16 rounded-full" />
            <div>
                <p class="font-semibold text-gray-800">Tran Bao Ngoc</p>
                <p class="text-sm text-gray-600">Software Engineering</p>
            </div>
        </div>
        <div class="h-24"></div>
        <hr class="border border-gray-400 border-opacity-50" />`;

        questionElement.innerHTML = html;
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

window.addEventListener('DOMContentLoaded', getQuestion);
