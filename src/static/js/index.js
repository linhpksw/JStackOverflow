const incrementCount = document.getElementById("increment-count");
const decrementCount = document.getElementById("decrement-count");


const totalCount = document.getElementById("total-count");


var count = 0;


totalCount.innerHTML = count;


const handleIncrement = () => {
  count++;
  totalCount.innerHTML = count;
};


const handleDecrement = () => {
  count--;
  totalCount.innerHTML = count;
};
incrementCount.addEventListener("click", handleIncrement);
decrementCount.addEventListener("click", handleDecrement);
