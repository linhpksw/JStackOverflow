const modalQuestion = document.getElementById('modal-question');
const discardBtn = document.getElementById('discard-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

const postQuestionElement = document.getElementById('post-question');

modalOpenBtn.addEventListener('click', () => {
    modalQuestion.classList.add('modal-open');
});

discardBtn.addEventListener('click', () => {
    modalQuestion.classList.remove('modal-open');
});

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
    modules: {
        toolbar: toolbarOptions,
        syntax: true,
    },
    placeholder: 'Compose an epic...',

    theme: 'snow',
};

const quill = new Quill('#editor', options);

quill.on('text-change', update);
const container = document.querySelector('#delta-container');
update();

function update(delta) {
    const editorContent = quill.getContents();

    console.log(editorContent);

    // quill2.setContents(contents);
    // quill2.disable();

    // if (delta) {
    //     console.log(JSON.stringify(delta, null, 2));
    // }
}

const postQuestion = async () => {
    try {
        const questionTitle = document.getElementById('question-title').value;
        const questionTag = document.getElementById('question-tag').value;

        console.log(questionTitle);
        console.log(questionTag);
    } catch (err) {
        console.log(err);
    }
};

postQuestionElement.addEventListener('click', postQuestion);
