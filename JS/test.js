document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#myForm");

  if (!form) return; // Exit if the form doesn't exist

  function createDateTimePicker(inputField) {
    let calendarPopup = document.createElement("div");
    calendarPopup.classList.add("calendar-popup", "hidden");
    calendarPopup.innerHTML = `
            <div class="calendar-header">
                <button class="prev-month">&lt;</button>
                <span class="current-month-year"></span>
                <button class="next-month">&gt;</button>
            </div>
            <div class="calendar-days"></div>
            <div class="time-picker">
                <label>Time: <input type="time" class="time-input"></label>
            </div>
            <button class="confirm-btn" disabled>Confirm</button>
        `;

    document.body.appendChild(calendarPopup);

    let calendarDays = calendarPopup.querySelector(".calendar-days");
    let currentMonthYear = calendarPopup.querySelector(".current-month-year");
    let prevMonthBtn = calendarPopup.querySelector(".prev-month");
    let nextMonthBtn = calendarPopup.querySelector(".next-month");
    let timeInput = calendarPopup.querySelector(".time-input");
    let confirmBtn = calendarPopup.querySelector(".confirm-btn");

    let selectedDate = null;
    let currentDate = new Date();

    function positionPopup() {
      const rect = inputField.getBoundingClientRect();
      calendarPopup.style.position = "absolute";
      calendarPopup.style.top = `${rect.bottom + window.scrollY}px`;
      calendarPopup.style.left = `${rect.left + window.scrollX}px`;
    }

    function renderCalendar(date) {
      calendarDays.innerHTML = "";
      const year = date.getFullYear();
      const month = date.getMonth();
      currentMonthYear.textContent = `${date.toLocaleString("default", {
        month: "long",
      })} ${year}`;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      for (let i = 0; i < firstDay; i++) {
        calendarDays.appendChild(document.createElement("div"));
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");
        dayElement.textContent = day;

        dayElement.addEventListener("click", () => {
          calendarDays
            .querySelectorAll(".calendar-day")
            .forEach((d) => d.classList.remove("selected"));
          dayElement.classList.add("selected");
          selectedDate = new Date(year, month, day);
          confirmBtn.disabled = false;
          confirmBtn.style.opacity = "1";
        });

        calendarDays.appendChild(dayElement);
      }
    }

    inputField.addEventListener("click", (event) => {
      event.stopPropagation();
      selectedDate = null;
      confirmBtn.disabled = true;
      confirmBtn.style.opacity = "0.5";
      renderCalendar(currentDate);
      positionPopup();
      calendarPopup.classList.remove("hidden");
    });

    document.addEventListener("click", (event) => {
      if (
        !calendarPopup.contains(event.target) &&
        !inputField.contains(event.target)
      ) {
        calendarPopup.classList.add("hidden");
      }
    });

    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });

    confirmBtn.addEventListener("click", () => {
      if (selectedDate) {
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const year = selectedDate.getFullYear();
        const selectedTime = timeInput.value || "00:00";
        inputField.value = `${day}/${month}/${year} ${selectedTime}`;
        calendarPopup.classList.add("hidden");
      }
    });

    renderCalendar(currentDate);
  }

  form.querySelectorAll(".datetime-input").forEach((input) => {
    createDateTimePicker(input);
  });
});

// const button = document.querySelectorAll(".reveal-data");
const form = document.querySelectorAll(".modal-form");
const close = document.querySelectorAll(".close");
//First Form
showData(".reveal-data", ".modal-form");
closeData(".modal-form", ".close");
// Second Form
showData(".reveal-data", ".modal-form-1");
closeData(".modal-form-1", ".close");

// Function to open a modal
function openModal(modal) {
  modal.style.display = "block"; // Show the modal

  const modalHeader = modal.querySelector(".modal-header");

  // Add draggable functionality to the modal
  modalHeader.onmousedown = function (event) {
    let shiftX = event.clientX - modal.getBoundingClientRect().left;
    let shiftY = event.clientY - modal.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      modal.style.left = pageX - shiftX + "px";
      modal.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener("mousemove", onMouseMove);

    modalHeader.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      modalHeader.onmouseup = null;
    };
  };

  modalHeader.ondragstart = function () {
    return false; // Prevent default drag behavior
  };
}
// function showData(btn, form) {
//   const _btn = document.querySelectorAll(btn);
//   const _form = document.querySelectorAll(form);
//   _form.forEach((el, id) => {
//     _form[id].classList.add("hide");
//     _btn[id].addEventListener("click", (e) => {

//       if (_form[id].classList.contains("hide")) {
//         e.stopPropagation();
//         _form[id].classList.remove("hide");
//       } else {
//         _form[id].classList.add("hide");
//       }
//     });
//   });
// }

// function closeData(form, close) {
//   const _close = document.querySelectorAll(close);
//   const _form = document.querySelectorAll(form)
//   _close.forEach((el, id) => {
//     _close[id].addEventListener("click", () => {
//       _form[id].classList.add("hide")
//     });
//   });
// }

// Function to make the modal draggable
// function makeDraggable(forms) {
//   forms.forEach((form) => {
//     const header = form.querySelector("._modal-header"); // Select the header for dragging
//     let isDragging = false;

//     header.onmousedown = function (event) {
//       isDragging = true;
//       const shiftX = event.clientX - form.getBoundingClientRect().left;
//       const shiftY = event.clientY - form.getBoundingClientRect().top;

//       function moveAt(pageX, pageY) {
//         form.style.left = pageX - shiftX + "px";
//         form.style.top = pageY - shiftY + "px";
//       }

//       function onMouseMove(event) {
//         if (isDragging) {
//           moveAt(event.pageX, event.pageY);
//         }
//       }

//       document.addEventListener("mousemove", onMouseMove);

//       header.onmouseup = function () {
//         isDragging = false;
//         document.removeEventListener("mousemove", onMouseMove);
//         header.onmouseup = null;
//       };
//     };

//     header.ondragstart = function () {
//       return false; // Prevent default drag behavior
//     };
//   });
// }

// make the modal dragable

// Menu toggle
const sidebar = document.querySelectorAll(".sidebar");
const toggle = document.querySelectorAll(".menu-toggle");
const mainContent = document.querySelectorAll(".main-content");

hideMenu(toggle, sidebar, mainContent);
function hideMenu(btn, menu, content) {
  btn.forEach((element, id) => {
    element.addEventListener("click", () => {
      if (menu[id].classList.contains("hide")) {
        menu[id].classList.remove("hide");
        content[id].style.marginLeft = "28%";
        content[id].style.width = "80%";
        content[id].style.border = "1px solid #e2e4e7";
        element.style.transform = "rotate(0)";
      } else {
        menu[id].classList.add("hide");
        content[id].style.marginLeft = "0";
        content[id].style.width = "100%";
        content[id].style.border = "0";
        element.style.transform = "rotate(180deg)";
      }
    });
  });
}

//Role
const roleButton = document.querySelector(".reveal-role");
const roleForm = document.querySelector(".modal-form-role");
const roleClose = document.querySelector(".close-role");
showUniqueData(roleButton, roleForm);
closeUniqueData(roleForm, roleClose);

function showUniqueData(container, element) {
  if (element != null) {
    element.classList.add("hide");
    container.addEventListener("click", () => {
      if (element.classList.contains("hide")) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    });
  }
}

function closeUniqueData(data, close) {
  if (data != null) {
    close.addEventListener("click", () => {
      data.classList.add("hide");
    });
  }
}
