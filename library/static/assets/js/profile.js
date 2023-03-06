let list = document.getElementById("list");
const search = document.getElementById("search-text");
const id = 124859;
const searchBar = document.getElementById("search-text");
let data = [];
let questions = [];
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
    const responseQuestions = await fetch(
      "https://jstackoverflow.jsclub.me/user/872805/questions"
    );
    const { questions } = await responseQuestions.json();
    console.log(questions);
    let userIds = data.filter(function (user) {
      return user.id == 1;
    });
    console.log(data);
    renderGeneralInfo(userIds);
    renderGeneralAnswer();
    renderGeneralQuestions();
    renderAbout(userIds);
  } catch (err) {
    console.error(err);
  }
};
function renderAbout(users) {
  let info = document.getElementById("edit-about");
  let htmls = "";
  let tmp = users.filter(function (user) {
    return user.id == 1;
  });
  console.log(tmp);
  if (tmp.length == 0) {
    htmls += `<div id = "edit-about">
        <div class="about-me">
            <div class="empty-box"></div>
                <p class="about-txt">
                    Your about me section is
                    currently blank. You want to
                    change it?
                    <i class="fa-solid fa-hand-back-point-right"></i>
                    <a href="" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Click
                        here</a>
                </p>
            </div>
        </div>
        </div>`;
  } else {
    htmls += `
        <div>
            ${tmp[0].name}
        </div>
        `;
  }
  info.innerHTML = htmls;
}
function renderGeneralQuestions() {
  let info = document.getElementById("general-questions");
  let tmp = questions.slice(-5);
  let htmls = "";
  for (let i = 4; i >= 0; i--) {
    htmls += `
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
                  <h5 class="title-ans">${tmp[i].title}</h5>
                  <div class="d-flex">
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
}
function renderGeneralAnswer() {
  let info = document.getElementById("general-answer");
  let tmp = data.slice(-5);
  let htmls = "";
  for (let i = 4; i >= 0; i--) {
    htmls += `
        <div class="mb-2 answers-list">
        <div class="pe-3 ps-3 pt-3 d-flex">
            <div class="me-3">
                <span>0</span>
                <span>votes</span>
            </div>
            // <div class="post-summary-stats">
            //     <svg aria-hidden="true" class="svg-icon iconCheckmarkSm" width="14"
            //         height="14" viewBox="0 0 14 14">
            //         <path d=="M13 3.41 11.59 2 5 8.59 2.41 6 1 7.41l4 4 8-8Z"></path>
            //     </svg>
            //     Accept
            // </div>
        </div>
        <div>
            <div class="pe-3 ps-3 pb-3">
                <h5 class="title-ans">${tmp[i].name}</h5>
                <div class="d-flex">
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
}
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
                                                <div>Gender : (Male)</div>
                                            </div>
                                        </li>

                                        <li class="mb-2 mt-2">
                                            <div class="d-flex me-3">
                                                <div>
                                                    <i class="fa-solid fa-cake-candles me-2"></i>
                                                </div>
                                                <div>DoB: (2004-24-11)</div>
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
                </div>
      `;
  });
  info.innerHTML = htmls;
}
getDataFakeAPI();
