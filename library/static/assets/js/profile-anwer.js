// const bgcolor = document.querySelector(".img-user");
// const colors = [
//   "#00aefd",
//   "#ffa400",
//   "#07a787",
//   "#ff7870",
//   "black",
//   "pink",
//   "yellow",
//   "#e74c3c",
//   "#2979ff",
// ];
// bgcolor.addEventListener("click", function () {
//   const randomColor = colors[Math.floor(Math.random() * colors.length)];
//   document.querySelector(".img-user").style.backgroundColor = randomColor;
// });
const h1 = document.getElementsByTagName("h1")[0];

const id = h1.textContent;
console.log(id);
h1.remove();
let list = document.getElementById("list");
const search = document.getElementById("search-text");
loadStats();
loadAnswers();
loadInfos();
loadActivity();

async function loadStats() {
  let info = document.getElementById("stats");
  let info1 = document.getElementById("total-answers");
  const URL1 = `https://jstackoverflow.jsclub.me/api/user/${id}/answers`;
  const URL2 = `https://jstackoverflow.jsclub.me/api/user/${id}/questions`;
  const opt = {
    method: "GET",
  };
  const response1 = await fetch(URL1, opt);
  const response2 = await fetch(URL2, opt);
  const jsonResponse1 = await response1.json();
  const jsonResponse2 = await response2.json();
  let htmls = `
      <div class="d-flex">
                                          <div class="m-2 p-2">
                                              <div>${jsonResponse1.answers.length}</div>
                                              Answers
                                          </div>
                                          <div class="m-2 p-2">
                                              <div>${jsonResponse2.questions.length}</div>
                                              Questions
                                          </div>
                                      </div>
    `;
  info.innerHTML = htmls;
  let html1 = `
    <div>
                                        <h4>${jsonResponse1.answers.length} Answer</h4>
                                    </div>
    `;
  info1.innerHTML = html1;
}
async function loadActivity() {
  let info = document.getElementById("activity");
  let htmls = `
    <li class="m-2 p-1" >
                                            <a class="m-2" href="https://jstackoverflow.jsclub.me/user/${id}">Summary</a>
                                        </li>
                                        <li class="m-2 p-1" >
                                            <a class="m-2" href="https://jstackoverflow.jsclub.me/user/${id}/answers">Answers</a>
                                        </li>
                                        <li class="m-2 p-1" >
                                            <a class="m-2" href="https://jstackoverflow.jsclub.me/user/${id}/questions">Questions</a>
                                        </li>
    `;
  info.innerHTML = htmls;
}
async function loadInfos() {
  try {
    const URL = `https://jstackoverflow.jsclub.me/api/user/${id}`;
    const opt = {
      method: "GET",
    };
    const response = await fetch(URL, opt);
    const jsonResponse = await response.json();
    let info = document.getElementById("general-info");
    let htmls = `<div class="d-flex position-relative">
                    <a class="img-user"><img style="height: 175px;" class = "rounded-circle" src="${jsonResponse.avatar}"/></a>
                    <div class="d-flex">
                        <div class="d-flex align-items-center infor">
                            <div class="me-3">
                                <div class="d-flex ms-3">
                                    <div class="me-3">
                                        <h3>${jsonResponse.name}</h3>
                                    </div>
                                    <!-- <div class="d-flex address">
                                        <div class="me-2">
                                            <i class="fa-solid fa-location-dot fa-lg mt-3"></i>
                                        </div>
                                        <div>
                                            <p class="mt-2"></p>
                                        </div>
                                    </div> -->
                                </div>

                                <div class="">
                                    <ul class="list-reset ms-3">
                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-venus-mars me-2"></i>
                                                </div>
                                                <div>Gender : ${jsonResponse.gender}</div>
                                            </div>
                                        </li>

                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-cake-candles me-2"></i>
                                                </div>
                                                <div>DoB: </div>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex position-absolute end-0 top-0">
                        <a class="btn-custom-var d-flex me-1 ms-1 btn" type="" href="" type="button"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <i class="fa-solid fa-pen me-1 mt-1"></i>
                            Edit profile
                        </a>
                    </div>
                </div>
            </div>
            <div class="fade modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
                    tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                                    Edit your profile
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="d-flex align-items-start flex-column">
                                    <div class="my-2 mx-auto">
                                        <div class="d-flex align-items-start flex-column">
                                            <div class="form-floating mb-3">
                                                <input type="email" class="input-change form-control" id="floatingName"
                                                    placeholder="Name" value="User_name" />
                                                <label for="floatingInput">Display name</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="my-2 mx-auto">
                                        <div class="d-flex align-items-start flex-column">
                                            <div class="form-floating mb-3">
                                                <input type="email" class="input-change form-control" id="floatingName"
                                                    placeholder="Name" value="HA NOI CITY" />
                                                <label for="floatingInput">Location</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="my-2 mx-auto">
                                        <div class="d-flex align-items-start flex-column">
                                            <div class="form-floating mb-3">
                                                <textarea id="floatingTextarea" value=""
                                                    class="input-change form-control"
                                                    placeholder="Write something fun about you..." style="
                                                        height: 150px;
                                                    "></textarea>
                                                <label for="floatingTextarea">About me</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn-secondary btn" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" class="btn-primary btn">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    info.innerHTML = htmls;
  } catch (err) {
    console.log(err);
  }
}
async function loadStats() {
  let info = document.getElementById("stats");
  let info1 = document.getElementById("total-answers");
  const URL1 = `https://jstackoverflow.jsclub.me/api/user/${id}/answers`;
  const URL2 = `https://jstackoverflow.jsclub.me/api/user/${id}/questions`;
  const opt = {
    method: "GET",
  };
  const response1 = await fetch(URL1, opt);
  const response2 = await fetch(URL2, opt);
  const jsonResponse1 = await response1.json();
  const jsonResponse2 = await response2.json();
  let htmls = `
    <div class="d-flex">
                                        <div class="m-2 p-2">
                                            <div>${jsonResponse1.answers.length}</div>
                                            Answers
                                        </div>
                                        <div class="m-2 p-2">
                                            <div>${jsonResponse2.questions.length}</div>
                                            Questions
                                        </div>
                                    </div>
  `;
  info.innerHTML = htmls;
  let htmls1 = `
  <div>
                                        <h4>${jsonResponse1.questions.length} Questions</h4>
                                    </div>
  `;
  info1.innerHTML = htmls1;
}
async function loadAnswers() {
  try {
    let info = document.getElementById("general-answers");
    let htmls = ``;
    const URL = `https://jstackoverflow.jsclub.me/api/user/${id}/answers`;
    const opt = {
      method: "GET",
    };
    const response = await fetch(URL, opt);
    const jsonResponse = await response.json();
    for (let i = jsonResponse.answers.length - 1; i >= 0; i--) {
      htmls += `
        <div class="my-2 answers-list">
        <div>
            <div class="pe-3 ps-3 pb-3">
                <h5 class="title-ans">${jsonResponse.answers[i].title}</h5>
                <div class="d-flex">
                    <div class="post-summary-tags d-flex">
                        <ul class="ps-0">
                            <li class = "p-1">${jsonResponse.answers[i].tag}</li>
                        </ul>
                    </div>
                    <div class="d-flex align-items-center justify-content-end flex-grow-1">
                        <div>
                            answer at 00:02
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
    info.innerHTML = htmls;
  } catch (err) {
    console.log(err);
  }
}
getDataFakeAPI();
async function getDataFakeAPI() {
  const responseAPI = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await responseAPI.json();
}

function renderAnswers(users) {
  const listAnswers = document.getElementById("list-answers");
  let htmls1 = users.map(function (e) {
    return `
      <div class="mb-2 answers-list">
         <div class="pe-3 ps-3 pt-3 d-flex">
             <div class="me-3">
                 <span>31</span>
                 <span>votes</span>
             </div>
             <div class="post-summary-stats">
                 <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
                     height="14" viewBox="0 0 14 14">
                     <path d=="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
                 </svg>
                 Accept
             </div>
         </div>
         <div>
             <div class="pe-3 ps-3 pb-3">
                 <h5 class="title-ans">${e.title}</h5>
                 <div class="d-flex">
                     <div class="post-summary-tags d-flex">
                         <ul class = "ps-0">
                             <li class = "pe-1 ps-1 me-1 ms-1">#MAE101</li>
                             <li class = "pe-1 ps-1 me-1 ms-1">#PRF192</li>
                         </ul>
                     </div>
                     <div class="d-flex align-items-center justify-content-end flex-grow-1">
                         <div>
                             answer at 00:02
                         </div>
                     </div>
                 </div>
             </div>
         </div>
       </div>
      `;
  });
  listAnswers.innerHTML = htmls1.join("");
}
