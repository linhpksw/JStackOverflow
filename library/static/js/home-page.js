const modalQuestion = document.getElementById("modal-question");
const discardBtn = document.getElementById("discard-btn");
const modalOpenBtn = document.getElementById("modal-open-btn");

const postQuestionElement = document.getElementById("post-question");

modalOpenBtn.addEventListener("click", () => {
  modalQuestion.classList.add("modal-open");
});

discardBtn.addEventListener("click", () => {
  modalQuestion.classList.remove("modal-open");
});

function appendQuestion() {
  const questionsElement = document.getElementById("questions");
}

//  Initialize Quill editor
let toolbarOptions = [
  [{ header: [1, 2, 3] }],
  // [{ header: 1 }, { header: 2 }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  ["blockquote", "code-block"],
  ["link", "image"],
];
let options = {
  modules: { toolbar: toolbarOptions, syntax: true },
  placeholder: "Compose an epic...",
  theme: "snow",
};

const quill = new Quill("#editor", options);
const container = document.querySelector("#delta-container");

const postQuestion = async () => {
  try {
    const questionTitle = document.getElementById("question-title").value;
    const questionTag = document.getElementById("question-tag").value;
    const questionContent = quill.getContents();
    // console.log(questionContent);

    const jsonQuestionContent = JSON.stringify(questionContent);

    console.log(jsonQuestionContent);
    const URL =
      "https://jstackoverflow.jsclub.me/questions_manager/add_question";

    const data = {
      title: questionTitle,
      tag: questionTag,
      content: questionContent,
    };

    const opt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    const response = await fetch(URL, opt);
    const jsonResponse = await response.json();

    if (jsonResponse.status == "") {
      alert();
      // modalQuestion.classList.remove('modal-open');
    } else {
    }
  } catch (err) {
    console.log(err);
  }
};

postQuestionElement.addEventListener("click", postQuestion);
