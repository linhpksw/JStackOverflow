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