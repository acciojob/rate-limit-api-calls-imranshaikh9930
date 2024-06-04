const  fetchButton = document.getElementById("fetch-button");
const  clickCountDisplay = document.getElementById("click-count");
const  resultsDiv = document.getElementById("results");
let  clickCount = 0;
let lastClickTime = 0;
let MAX_CLICKS = 5;
let TIME_FRAME = 10000;
async function fetchData() {
    let currentTime = new Date().getTime();
  if (currentTime - lastClickTime > TIME_FRAME) {
    // Reset click count if time frame has passed
    clickCount = 0;
  }

  clickCount++;
  clickCountDisplay.textContent = clickCount;

  if (clickCount > MAX_CLICKS) {
    alert("Too many API calls. Please wait and try again.");
    return;
  }

  const p = document.createElement("p");
  // Make the API call
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => {
      p.textContent = `ID:${data.id},Title:${data.title},Completed:${data.completed}`;

      resultsDiv.appendChild(p);
    })
    .catch((error) => console.error("Error fetching data:", error));

  lastClickTime = currentTime;

  // Reset click count after 10 seconds
  setInterval(function () {
    clickCount = 0;
    clickCountDisplay.textContent = clickCount;
  }, TIME_FRAME);
}
