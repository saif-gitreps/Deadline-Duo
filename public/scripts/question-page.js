document.querySelectorAll(".hide-btn").forEach((hideButton) => {
   hideButton.addEventListener("click", () => {
      const answerField = hideButton
         .closest(".deadline-card")
         .querySelector(".user-box textarea");

      answerField.classList.toggle("hide");

      hideButton.innerText = answerField.classList.contains("hide")
         ? "Show Answer"
         : "Hide Answer";
   });
});
