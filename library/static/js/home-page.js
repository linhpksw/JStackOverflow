const modalQuestion = document.getElementById('modal-question');
const discardBtn = document.getElementById('discard-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

const postQuestionElement = document.getElementById('post-question');

const loadQuestions = async () => {
    try {
        const URL = 'https://jstackoverflow.jsclub.me/questions_manager/questions/all_questions';

        const opt = {
            method: 'GET',
        };

        const response = await fetch(URL, opt);

        const jsonResponse = await response.json();

        const {
            id: questionId,
            title: questionTitle,
            tag: questionTag,
            datetime_posted: questionTime,
            name: askerName,
            asker_id: askerId,
        } = jsonResponse;

        appendQuestion(questionId, askerId, questionTitle, questionTag, questionTime, askerName);
    } catch (err) {
        console.log(err);
    }
};

modalOpenBtn.addEventListener('click', () => {
    modalQuestion.classList.add('modal-open');
});

discardBtn.addEventListener('click', () => {
    modalQuestion.classList.remove('modal-open');
});

function appendQuestion(questionId, askerId, questionTitle, questionTag, questionTime, askerName) {
    const questionsElement = document.getElementById('questions');

    const questionChild = document.createElement('div');
    questionChild.setAttribute('id', `question-${questionId}`);

    questionChild.innerHTML = `
    <!-- Question ${questionId} -->
    <div id="question-${questionId}" class="flex h-auto gap-5 rounded-2xl bg-[#262D34] py-5 px-5 mb-5">
    <!-- Stats -->
    <div id="stats" class="flex flex-none flex-col gap-2 text-white">
        <!-- Total votes -->
        <span id="total-votes" class="flex justify-end text-sm font-medium"
            >0 votes</span
        >

        <!-- Answers -->
        <div id="answers" class="rounded-md bg-green-900 py-2 px-1.5">
            <div class="flex items-center justify-between gap-1">
                <!-- Correct answer -->
                <!-- <div id="correct-answer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2.5"
                        stroke="currentColor"
                        class="h-5 w-5">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div> -->

                <!-- Total answers -->
                <div>
                    <span
                        id="total-answers"
                        class="flex justify-end text-sm font-medium"
                        >0 answers</span
                    >
                </div>
            </div>
        </div>

        <span id="total-views" class="flex justify-end text-sm font-medium"
            >1 views</span
        >
    </div>

    <!-- Infor -->
    <div id="infors" class="flex flex-1 flex-col gap-3">
        <!-- Question title -->
        <div class="flex justify-between">
            <a
                id="question-title"
                href="/questions_manager/questions/${questionId}"
                class="text-xl font-semibold text-amber-400 hover:text-amber-500"
                >${questionTitle}</a
            >
        </div>

        <!-- Tag and ask_id -->
        <div class="flex justify-between gap-3">
            <button
                id="question-tag"
                class="rounded-3xl bg-[#2C353D] py-1 px-3 text-xs font-semibold text-[#C5D0E6]">
                ${questionTag}
            </button>

            <div class="mt-3 flex items-center justify-end">
                <div
                    class="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F1FE]"></div>

                <div class="flex-none">
                    <span
                        id="question-time"
                        class="text-sm font-semibold text-[#C5D0E6]"
                        ><a id="user-name" href="/user/${askerId}" class="text-amber-400"
                            >${askerName}</a
                        >
                        asked at ${questionTime}</span
                    >
                </div>
            </div>
        </div>
    </div>
    </div>
    `;

    // Check if there are any child elements
    if (questionsElement.children.length > 0) {
        questionsElement.children[0].appendChild(questionChild);
    } else {
        questionsElement.appendChild(questionChild);
    }
}

//  Initialize Quill editor
let toolbarOptions = [
    [{ header: [1, 2, 3] }],
    // [{ header: 1 }, { header: 2 }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
];
let options = {
    modules: { toolbar: toolbarOptions, syntax: true },
    placeholder: 'Compose an epic...',
    theme: 'snow',
};

const quill = new Quill('#editor', options);
const container = document.querySelector('#delta-container');

const postQuestion = async () => {
    try {
        const questionTitle = document.getElementById('question-title').value;
        const questionTag = document.getElementById('question-tag').value;
        const questionContent = quill.getContents();

        const URL = 'https://jstackoverflow.jsclub.me/questions_manager/add_question';

        const data = {
            title: questionTitle,
            tag: questionTag,
            content: questionContent.ops[0].insert,
        };

        const opt = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        const response = await fetch(URL, opt);
        const jsonResponse = await response.json();

        if (jsonResponse.status == 'add question successfully') {
            const {
                name: askerName,
                question_id: questionId,
                title: questionTitle,
                content: questionContent,
                tag: questionTag,
                asker_id: askerId,
                datetime_posted: questionTime,
                datetime_updated: updateTime,
            } = jsonResponse;

            appendQuestion(questionId, askerId, questionTitle, questionTag, questionTime, askerName);
            modalQuestion.classList.remove('modal-open');
        }
    } catch (err) {
        console.log(err);
    }
};

postQuestionElement.addEventListener('click', postQuestion);

window.addEventListener('DOMContentLoaded', loadQuestions);
