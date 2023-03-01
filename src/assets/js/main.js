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

// const selected = document.querySelectorAll(".update-list");
// selected.addEventListener("click", function(){
//     const randomColor = colors[Math.floor(Math.random() * colors.length)];
//     for(let i = 0; i < selected.length; i++){
//         selected[i].style.backgroundColor = randomColor;
//     }
// });

// 1. new Promise
// 2. executor
var promise = new Promise(
  function(resolve, reject){
    // logic
    //Thành công: resolve();
    //Thất bại: reject();
    resolve([
      {
        id: 1,
        name: 'Javascript'
      }
    ]);
});

promise
  .then(function(source){
    console.log(source);
  })
  .catch(function(){
    console.log('Failure!');
  })
  .finally(function(){
    console.log('Done!');
  });