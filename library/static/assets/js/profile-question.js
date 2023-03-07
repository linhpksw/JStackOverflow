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

async function loadQuestions() {
  try {
    let info = document.getElementById("general-questions");
    let htmls = ``;
    const URL = `https://jstackoverflow.jsclub.me/api/user/${id}/questions`;
    const opt = {
      method: "GET",
    };
    const response = await fetch(URL, opt);
    const jsonResponse = await response.json();

    for (let i = jsonResponse.questions.length - 1; i >= 0; i--) {
      htmls += `
        <div class="my-2 answers-list">
        <div class="pe-3 ps-3 pt-3 d-flex">
            <div class="me-3">
                <span>0</span>
                <span>votes</span>
            </div>

            
        </div>
        <div>
            <div class="pe-3 ps-3 pb-3">
                <h5 class="title-ans">${jsonResponse.questions[i].title}</h5>
                <div class="d-flex">
                    <div class="post-summary-tags d-flex">
                        <ul class="ps-0">
                            <li>${jsonResponse.questions[i].tag}</li>
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

async function getDataFakeAPI() {
  //   const responseAPI = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   const data = await responseAPI.json();
  const res = await fetch(
    "https://jstackoverflow.jsclub.me/user/174830/questions"
  );
  const data1 = await res.json();
  console.log(data1);
  let userIds = data.filter(function (id) {
    return id.userId == 1;
  });

  renderQuestions(userIds);
}
function renderQuestions(users) {
  let listQuestions = document.getElementById("list-questions");
  let htmls = users.map(function (e) {
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
  console.log(listQuestions);
  listQuestions.innerHTML = htmls.join("");
}
