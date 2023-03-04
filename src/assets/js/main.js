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

let allAnswers = [];
let allQuestions = [];

try {
  getDataFakeAPI();
  async function getDataFakeAPI() {
    const responseAPI = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const data = await responseAPI.json();
    list.innerHTML = "Loading...";
    setTimeout(() => {
      list.innerHTML = "";

      data.forEach((e) => {
        // const answersItem = document.createElement("div");
        // const questionsItem = document.createElement("div");

        const divItem = document.createElement("div");
        divItem.innerHTML = `
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
                                </div>`;
        list.appendChild(divItem);

        // const questionItem = `;

        //     answersItem.innerHTML = `
        // <div class="mb-2 answers-list">
        //                             <div class="pe-3 ps-3 pt-3 d-flex">
        //                                 <div class="me-3">
        //                                     <span>31</span>
        //                                     <span>votes</span>
        //                                 </div>
        //                                 <div class="post-summary-stats">
        //                                     <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
        //                                         height="14" viewBox="0 0 14 14">
        //                                         <path d=="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
        //                                     </svg>
        //                                     Accept
        //                                 </div>
        //                             </div>
        //                             <div>
        //                                 <div class="pe-3 ps-3 pb-3">
        //                                     <h5 class="title-ans">${data.title}</h5>
        //                                     <div class="d-flex">
        //                                         <div class="post-summary-tags d-flex">
        //                                             <ul class = "ps-0">
        //                                                 <li class = "pe-1 ps-1 me-1 ms-1">#MAE101</li>
        //                                                 <li class = "pe-1 ps-1 me-1 ms-1">#PRF192</li>
        //                                             </ul>
        //                                         </div>
        //                                         <div class="d-flex align-items-center justify-content-end flex-grow-1">
        //                                             <div>
        //                                                 answer at 00:02
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>`;

        //     questionsItem.innerHTML = `
        //     <div class="my-2 answers-list">
        //                                 <div class="pe-3 ps-3 pt-3 d-flex">
        //                                     <div class="me-3">
        //                                         <span>31</span>
        //                                         <span>votes</span>
        //                                     </div>
        //                                     <div class="post-summary-stats">
        //                                         <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
        //                                             height="14" viewBox="0 0 14 14">
        //                                             <path d="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
        //                                         </svg>
        //                                         "Accept"
        //                                     </div>
        //                                     <div class="ms-3">
        //                                         <span>1k</span>
        //                                         <span>views</span>
        //                                     </div>
        //                                 </div>
        //                                 <div>
        //                                     <div class="pe-3 ps-3 pb-3">
        //                                         <h5 class="title-ans">HELLO</h5>
        //                                         <div class="d-flex">
        //                                             <div class="post-summary-tags d-flex">
        //                                                 <ul class="ps-0">
        //                                                     <li>#MAE101</li>
        //                                                     <li>#PRF192</li>
        //                                                 </ul>
        //                                             </div>
        //                                             <div class="d-flex align-items-center justify-content-end flex-grow-1">
        //                                                 <div>
        //                                                     answer at 00:02
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //     `;
        // list.appendChild(answersItem);
        // list.appendChild(questionsItem);
      });
    }, 1000);
    // list.innerHTML = allAnswers.join(" ");
  }
} catch (err) {
  console.log(err);
}

// const selected = document.querySelectorAll(".update-list");
// selected.addEventListener("click", function(){
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];
//     for(let i = 0; i < selected.length; i++){
//         selected[i].style.backgroundColor = randomColor;
//     }
// });
