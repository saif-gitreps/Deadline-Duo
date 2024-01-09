const editButtonElement = document.getElementById("edit-btn");
const deadlineFormElement = document.getElementById("deadline-form");

deadlineFormElement.addEventListener("submit", async (event) => {
   event.preventDefault();
   const userId = event.target.dataset.userId;
   const title = event.target.title.value;
   const dueDate = event.target.dueDate.value;
   const description = event.target.description.value;

   try {
      const response = await fetch(`/deadline/${userId}`, {
         method: "POST",
         body: JSON.stringify({
            title: title,
            dueDate: dueDate,
            description: description,
         }),
         headers: {
            contentType: "application/json",
         },
      });
      if (response.ok) {
         window.location.href = "/deadline";
      } else {
         window.location.href = "/500";
      }
   } catch (error) {
      console.log(error);
      window.location.href = "/500";
   }
});

editButtonElement.addEventListener("click", (event) => {
   // This will lead the deadline edit page , will load the edit route.
});
