const modalQuestion = document.getElementById('modal-question');
const discardBtn = document.getElementById('discard-btn');
const modalOpenBtn = document.getElementById('modal-open-btn');

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

let quill = new Quill('#editor', options);

quill.on('text-change', update);
let container = document.querySelector('#delta-container');
update();

function update(delta) {
    let contents = quill.getContents();

    // console.log(contents);

    // quill2.setContents(contents);
    // quill2.disable();

    // if (delta) {
    //     console.log(JSON.stringify(delta, null, 2));
    // }
}
