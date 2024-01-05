const hideButton = document.getElementById("hide-btn");
const answerField = document.getElementById("answer");

hideButton.addEventListener("click", () => {
   answerField.classList.toggle("hide");
   if (hideButton.innerText === "Show Answer") {
      hideButton.innerText = "Hide Answer";
   } else {
      hideButton.innerText = "Show Answer";
   }
});
