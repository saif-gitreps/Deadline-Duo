const htmlElement = document.querySelector("html");
const bodyElement = document.querySelector("body");
const editAsideElement = document.querySelector("aside");
const editButtonElement = document.getElementById("edit-btn");
const deadlineCardElement = document.getElementById("deadline-card");

editButtonElement.addEventListener("click", (event) => {
   event.preventDefault();
   deadlineCardElement.preventDefault();
   htmlElement.classList.toggle("overflow-hidden");
   bodyElement.classList.toggle("overflow-hidden");
   editAsideElement.style.display = "block";
});
