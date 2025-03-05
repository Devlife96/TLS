document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.getElementById("datetime-input");
  const calendarPopup = document.getElementById("calendar-popup");
  const calendarDays = document.getElementById("calendar-days");
  const currentMonthYear = document.getElementById("current-month-year");
  const prevMonthBtn = document.getElementById("prev-month");
  const nextMonthBtn = document.getElementById("next-month");
  const confirmBtn = document.getElementById("confirm-btn");

  let selectedDate = null;
  let currentDate = new Date();
  calendarPopup.classList.add("hidden");
  confirmBtn.disabled = true;
  confirmBtn.style.cursor = "not-allowed";
  function renderCalendar(date) {
    calendarDays.innerHTML = "";
    const year = date.getFullYear();
    const month = date.getMonth();
    currentMonthYear.textContent = `${date.toLocaleString("default", {
      month: "long",
    })} ${year}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // work on the button enable or disable
    // Enable the button when a date is selected
    function enableConfirmButton() {
      confirmBtn.disabled = false;
      confirmBtn.style.cursor = "pointer";
    }

    // Disable the button when no date is selected
    function disableConfirmButton() {
      confirmBtn.disabled = true;
      confirmBtn.style.opacity = "0.5";
    }
    // Fill in empty spaces for previous month
    for (let i = 0; i < firstDay; i++) {
      const emptyCell = document.createElement("div");
      calendarDays.appendChild(emptyCell);
    }

    // Fill in actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
      dayElement.textContent = day;

      dayElement.addEventListener("click", () => {
        document
          .querySelectorAll(".calendar-day")
          .forEach((d) => d.classList.remove("selected"));
        dayElement.classList.add("selected");
        selectedDate = new Date(year, month, day);
        enableConfirmButton();
      });

      calendarDays.appendChild(dayElement);
    }
  }

  // Show the calendar when clicking the input field
  inputField.addEventListener("click", () => {
    calendarPopup.classList.toggle("hidden");
  });

  // Hide calendar if clicking outside
  document.addEventListener("click", (e) => {
    if (!inputField.contains(e.target) && !calendarPopup.contains(e.target)) {
      calendarPopup.classList.add("hidden");
    }
  });

  // Navigate to previous month
  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  // Navigate to next month
  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Confirm the selection
  confirmBtn.addEventListener("click", (e) => {
    if (selectedDate) {
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      inputField.value = formattedDate;
      calendarPopup.classList.add("hidden");
    } else {
      disableConfirmButton();
    }
  });

  // Initialize calendar
  renderCalendar(currentDate);
});

//
// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.querySelectorAll("._form");

//   if (!form) return; // Exit if the form doesn't exist
//   let activePopup = null;
//   function createDateTimePicker(inputField) {
//     let calendarPopup = document.createElement("div");
//     calendarPopup.classList.add(
//       "calendar-popup",
//       "px-4",
//       "py-4",
//       "bg-white",
//       "border-1",
//       "w-auto",
//       "rounded-4",
//       "hide"
//     );
//     calendarPopup.innerHTML = `
//            <div  class="mb-4 calendar-header">
//                     <div
//                       class="_btn _h-30 _w-30 rounded-pill bg-whiteChalk-1 middle prev-month cursor"
//                     >
//                       <i class="bi bi-chevron-left fs-13"></i>
//                     </div>
//                     <span  class="fs-13 darkGray current-month-year"></span>
//                     <div
//                       class="_btn _h-30 _w-30 rounded-pill bg-whiteChalk-1 middle next-month cursor"
//                     >
//                       <i class="bi bi-chevron-right fs-13"></i>
//                     </div>
//                   </div>
//                   <div class="line bg-silver mb-4"></div>
//                   <div  class="mb-3 calendar-days"></div>

//                   <button
//                     class="_btn _h-40 px-3 w-100 rounded-5 confirm-btn "
//                     type="button" id="submitBtn"
//                   >
//                     Confirm
//                   </button>
//         `;

//     document.body.appendChild(calendarPopup);
//     inputField.dataset.popup = `#${calendarPopup.id}`;

//     let calendarDays = calendarPopup.querySelector(".calendar-days");
//     let currentMonthYear = calendarPopup.querySelector(".current-month-year");
//     let prevMonthBtn = calendarPopup.querySelector(".prev-month");
//     let nextMonthBtn = calendarPopup.querySelector(".next-month");
//     let confirmBtn = calendarPopup.querySelector(".confirm-btn");

//     let selectedDate = null;
//     let currentDate = new Date();

//     function positionPopup() {
//       const rect = inputField.getBoundingClientRect();
//       calendarPopup.style.position = "absolute";
//       calendarPopup.style.top = `${rect.bottom + window.scrollY}px`;
//       calendarPopup.style.left = `${rect.left + window.scrollX}px`;
//     }

//     function renderCalendar(date) {
//       calendarDays.innerHTML = "";
//       const year = date.getFullYear();
//       const month = date.getMonth();
//       currentMonthYear.textContent = `${date.toLocaleString("default", {
//         month: "long",
//       })} ${year}`;

//       const firstDay = new Date(year, month, 1).getDay();
//       const daysInMonth = new Date(year, month + 1, 0).getDate();

//       for (let i = 0; i < firstDay; i++) {
//         calendarDays.appendChild(document.createElement("div"));
//       }

//       for (let day = 1; day <= daysInMonth; day++) {
//         const dayElement = document.createElement("div");
//         dayElement.classList.add("calendar-day");
//         dayElement.textContent = day;

//         dayElement.addEventListener("click", () => {
//           calendarDays
//             .querySelectorAll(".calendar-day")
//             .forEach((d) => d.classList.remove("selected"));
//           dayElement.classList.add("selected");
//           selectedDate = new Date(year, month, day);
//           confirmBtn.disabled = false;
//           confirmBtn.style.opacity = "1";
//         });

//         calendarDays.appendChild(dayElement);
//       }
//     }

//     inputField.addEventListener("click", (event) => {
//       event.stopPropagation();

//       // Close the active popup if it's not the current one
//       if (activePopup && activePopup !== calendarPopup) {
//         activePopup.classList.add("hide");
//       }

//       // Toggle the popup visibility
//       if (calendarPopup.classList.contains("hide")) {
//         calendarPopup.classList.remove("hide");
//         activePopup = calendarPopup;
//         renderCalendar(currentDate);
//         positionPopup();
//       } else {
//         calendarPopup.classList.add("hide");
//         activePopup = null;
//       }
//     });

//     // Close popup when clicking outside
//     document.addEventListener("click", (event) => {
//       if (
//         activePopup &&
//         !activePopup.contains(event.target) &&
//         !event.target.classList.contains("datetime-input")
//       ) {
//         activePopup.classList.add("hide");
//         activePopup = null;
//       }
//     });

//     prevMonthBtn.addEventListener("click", () => {
//       currentDate.setMonth(currentDate.getMonth() - 1);
//       renderCalendar(currentDate);
//     });

//     nextMonthBtn.addEventListener("click", () => {
//       currentDate.setMonth(currentDate.getMonth() + 1);
//       renderCalendar(currentDate);
//     });

//     confirmBtn.addEventListener("click", () => {
//       if (selectedDate) {
//         const day = String(selectedDate.getDate()).padStart(2, "0");
//         const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
//         const year = selectedDate.getFullYear();
//         inputField.value = `${day}/${month}/${year}`;
//         calendarPopup.classList.add("hide");
//         activePopup = null;
//         checkFormCompletion();
//       }
//     });

//     renderCalendar(currentDate);
//     return calendarPopup;
//   }
//   function checkFormCompletion() {
//     const allFilled = Array.from(
//       form.querySelectorAll(".datetime-input")
//     ).every((input) => input.value.trim() !== "");
//     document.querySelector("#submitBtn").disabled = !allFilled;
//   }

//   form.forEach((f) => {
//     f.querySelectorAll(".datetime-input").forEach((input) => {
//       createDateTimePicker(input);
//       input.addEventListener("input", checkFormCompletion);
//     });
//   });
// });
