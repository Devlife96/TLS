// Function to open any modal

showModal(".form-modal", ".reveal-data");
// makeDraggable(".form-modal");
function showModal(formSelector, btnSelector) {
  const forms = document.querySelectorAll(formSelector);
  const buttons = document.querySelectorAll(btnSelector);

  buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Hide all forms before showing the selected one
      forms.forEach((form) => (form.style.display = "none"));

      // Get the target form from data attribute
      const targetForm = document.querySelector(btn.dataset.target);

      if (targetForm) {
        targetForm.style.display = "block";
      }
    });
  });
}

// Close modal when the close button is clicked
document.querySelectorAll(".close").forEach((closeBtn) => {
  closeBtn.onclick = function () {
    closeBtn.closest(".modal-form").style.display = "none"; // Hide the modal
  };
});

// Close modal when clicking outside of it
window.onclick = function (event) {
  if (event.target.classList.contains("modal-form")) {
    event.target.style.display = "none"; // Hide the modal
  }
};

// // Menu toggle
// const sidebar = document.querySelectorAll(".sidebar");
// const toggle = document.querySelectorAll(".menu-toggle");
// const mainContent = document.querySelectorAll(".main-content");

// hideMenu(toggle, sidebar, mainContent);
// function hideMenu(btn, menu, content) {
//   btn.forEach((element, id) => {
//     element.addEventListener("click", () => {
//       if (menu[id].classList.contains("hide")) {
//         menu[id].classList.remove("hide");
//         content[id].style.marginLeft = "28%";
//         content[id].style.width = "80%";
//         content[id].style.border = "1px solid #e2e4e7";
//         element.style.transform = "rotate(0)";
//       } else {
//         menu[id].classList.add("hide");
//         content[id].style.marginLeft = "0";
//         content[id].style.width = "100%";
//         content[id].style.border = "0";
//         element.style.transform = "rotate(180deg)";
//       }
//     });
//   });
// }
