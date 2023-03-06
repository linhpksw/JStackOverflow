const bgcolor = document.querySelector(".img-user");
const colors = [
  "#00aefd",
  "#ffa400",
  "#07a787",
  "#ff7870",
  "black",
  "pink",
  "yellow",
  "#e74c3c",
  "#2979ff",
];
bgcolor.addEventListener("click", function () {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.querySelector(".img-user").style.backgroundColor = randomColor;
});
let list = document.getElementById("list");
const search = document.getElementById("search-text");
const id = 124859;
const searchBar = document.getElementById("search-text");
let data = [];
// const answerTab = document.querySelector(".answer-tab");
// answerTab.addEventListener("click", function () {
//   getDataFakeAPI();
//   async function getDataFakeAPI() {
//     const responseAPI = await fetch(
//       "https://b265-2001-ee0-40e1-2676-7de2-d8ab-6694-6607.ap.ngrok.io/user/496067/questions"
//     );
//     const data = await responseAPI.json();
//     // list.innerHTML = "Loading...";
//     // setTimeout(() => {
//     //   list.innerHTML = "";

//     //   data.forEach((e) => {
//     //     // const answersItem = document.createElement("div");
//     //     // const questionsItem = document.createElement("div");

//     //     const divItem = document.createElement("div");
//     //     divItem.innerHTML = `
//     //     <div class="mb-2 answers-list">
//     //                                 <div class="pe-3 ps-3 pt-3 d-flex">
//     //                                     <div class="me-3">
//     //                                         <span>31</span>
//     //                                         <span>votes</span>
//     //                                     </div>
//     //                                     <div class="post-summary-stats">
//     //                                         <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
//     //                                             height="14" viewBox="0 0 14 14">
//     //                                             <path d=="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
//     //                                         </svg>
//     //                                         Accept
//     //                                     </div>
//     //                                 </div>
//     //                                 <div>
//     //                                     <div class="pe-3 ps-3 pb-3">
//     //                                         <h5 class="title-ans">${e.title}</h5>
//     //                                         <div class="d-flex">
//     //                                             <div class="post-summary-tags d-flex">
//     //                                                 <ul class = "ps-0">
//     //                                                     <li class = "pe-1 ps-1 me-1 ms-1">#MAE101</li>
//     //                                                     <li class = "pe-1 ps-1 me-1 ms-1">#PRF192</li>
//     //                                                 </ul>
//     //                                             </div>
//     //                                             <div class="d-flex align-items-center justify-content-end flex-grow-1">
//     //                                                 <div>
//     //                                                     answer at 00:02
//     //                                                 </div>
//     //                                             </div>
//     //                                         </div>
//     //                                     </div>
//     //                                 </div>
//     //                             </div>`;
//     //     list.appendChild(divItem);

//     // const questionItem = `;

//     //     answersItem.innerHTML = `
//     // <div class="mb-2 answers-list">
//     //                             <div class="pe-3 ps-3 pt-3 d-flex">
//     //                                 <div class="me-3">
//     //                                     <span>31</span>
//     //                                     <span>votes</span>
//     //                                 </div>
//     //                                 <div class="post-summary-stats">
//     //                                     <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
//     //                                         height="14" viewBox="0 0 14 14">
//     //                                         <path d=="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
//     //                                     </svg>
//     //                                     Accept
//     //                                 </div>
//     //                             </div>
//     //                             <div>
//     //                                 <div class="pe-3 ps-3 pb-3">
//     //                                     <h5 class="title-ans">${data.title}</h5>
//     //                                     <div class="d-flex">
//     //                                         <div class="post-summary-tags d-flex">
//     //                                             <ul class = "ps-0">
//     //                                                 <li class = "pe-1 ps-1 me-1 ms-1">#MAE101</li>
//     //                                                 <li class = "pe-1 ps-1 me-1 ms-1">#PRF192</li>
//     //                                             </ul>
//     //                                         </div>
//     //                                         <div class="d-flex align-items-center justify-content-end flex-grow-1">
//     //                                             <div>
//     //                                                 answer at 00:02
//     //                                             </div>
//     //                                         </div>
//     //                                     </div>
//     //                                 </div>
//     //                             </div>
//     //                         </div>`;

//     //     questionsItem.innerHTML = `
//     //     <div class="my-2 answers-list">
//     //                                 <div class="pe-3 ps-3 pt-3 d-flex">
//     //                                     <div class="me-3">
//     //                                         <span>31</span>
//     //                                         <span>votes</span>
//     //                                     </div>
//     //                                     <div class="post-summary-stats">
//     //                                         <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
//     //                                             height="14" viewBox="0 0 14 14">
//     //                                             <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
//     //                                         </svg>
//     //                                         "Accept"
//     //                                     </div>
//     //                                     <div class="ms-3">
//     //                                         <span>1k</span>
//     //                                         <span>views</span>
//     //                                     </div>
//     //                                 </div>
//     //                                 <div>
//     //                                     <div class="pe-3 ps-3 pb-3">
//     //                                         <h5 class="title-ans">HELLO</h5>
//     //                                         <div class="d-flex">
//     //                                             <div class="post-summary-tags d-flex">
//     //                                                 <ul class="ps-0">
//     //                                                     <li>#MAE101</li>
//     //                                                     <li>#PRF192</li>
//     //                                                 </ul>
//     //                                             </div>
//     //                                             <div class="d-flex align-items-center justify-content-end flex-grow-1">
//     //                                                 <div>
//     //                                                     answer at 00:02
//     //                                                 </div>
//     //                                             </div>
//     //                                         </div>
//     //                                     </div>
//     //                                 </div>
//     //                             </div>
//     //     `;
//     // list.appendChild(answersItem);
//     // list.appendChild(questionsItem);
//     // });
//     // }, 1000);
//     // list.innerHTML = allAnswers.join(" ");
//     console.log(data);
//   }
// });
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredCharacters = data.filter((character) => {
    return character.name.toLowerCase().includes(searchString);
  });
  console.log(filteredCharacters);
});

const getDataFakeAPI = async () => {
  try {
    const responseAPI = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    data = await responseAPI.json();
    let userIds = data.filter(function (user) {
      return user.id == 1;
    });
    console.log(data);
    renderGeneralInfo(userIds);
  } catch (err) {
    console.error(err);
  }
};
function renderGeneralInfo(users) {
  let info = document.getElementById("general-info");
  let htmls = users.map(function (e) {
    return `
      <div class="d-flex position-relative">
                    <a class="img-user"><img src="/src/images/man (1).png" /></a>
                    <div class="d-flex">
                        <div class="d-flex align-items-center infor">
                            <div class="me-3">
                                <div class="d-flex ms-3">
                                    <div class="me-3">
                                        <h3>${e.username}</h3>
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
                                                <div>Gender : Male</div>
                                            </div>
                                        </li>

                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-cake-candles me-2"></i>
                                                </div>
                                                <div>Member for 7 days</div>
                                            </div>
                                        </li>
                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-clock me-2"></i>
                                                </div>
                                                <div>Last seen this week</div>
                                            </div>
                                        </li>
                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-calendar-days me-2"></i>
                                                </div>
                                                <div>Visited 7 days</div>
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
      `;
  });
  info.innerHTML = htmls;
}
getDataFakeAPI();
