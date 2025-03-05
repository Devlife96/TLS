function showForm() {
  document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("._form");

    if (!forms.length) return; // Exit if no form exists
    let activePopup = null;

    function createDateTimePicker(inputField) {
      let calendarPopup = document.createElement("div");
      calendarPopup.classList.add(
        "calendar-popup",
        "px-4",
        "py-4",
        "bg-white",
        "border-1",
        "w-auto",
        "rounded-4",
        "hide"
      );
      calendarPopup.innerHTML = `
            <div class="mb-4 calendar-header">
                <div class="_btn _h-30 _w-30 rounded-pill bg-whiteChalk-1 middle prev-month cursor">
                    <i class="bi bi-chevron-left fs-13"></i>
                </div>
                <span class="fs-13 darkGray current-month-year"></span>
                <div class="_btn _h-30 _w-30 rounded-pill bg-whiteChalk-1 middle next-month cursor">
                    <i class="bi bi-chevron-right fs-13"></i>
                </div>
            </div>
            <div class="line bg-silver mb-4"></div>
            <div class="mb-3 calendar-days"></div>
            <button class="_btn _h-40 px-3 w-100 rounded-5 confirm-btn" type="button">
                Confirm
            </button>
        `;

      document.body.appendChild(calendarPopup);
      inputField.dataset.popup = `#${calendarPopup.id}`;

      let calendarDays = calendarPopup.querySelector(".calendar-days");
      let currentMonthYear = calendarPopup.querySelector(".current-month-year");
      let prevMonthBtn = calendarPopup.querySelector(".prev-month");
      let nextMonthBtn = calendarPopup.querySelector(".next-month");
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

        // Close the active popup if it's not the current one
        if (activePopup && activePopup !== calendarPopup) {
          activePopup.classList.add("hide");
        }

        // Toggle the popup visibility
        if (calendarPopup.classList.contains("hide")) {
          calendarPopup.classList.remove("hide");
          activePopup = calendarPopup;
          renderCalendar(currentDate);
          positionPopup();
        } else {
          calendarPopup.classList.add("hide");
          activePopup = null;
        }
      });

      // Close popup when clicking outside
      document.addEventListener("click", (event) => {
        if (
          activePopup &&
          !activePopup.contains(event.target) &&
          !event.target.classList.contains("datetime-input")
        ) {
          activePopup.classList.add("hide");
          activePopup = null;
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
          const year = selectedDate.getFullYear();
          const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
          const day = String(selectedDate.getDate()).padStart(2, "0");

          // Change the format to YYYY-MM-DD for input type="date"
          inputField.value = `${year}-${month}-${day}`;
          calendarPopup.classList.add("hide");
          activePopup = null;
          checkFormCompletion();
        }
      });

      // **NEW: Convert native date input to formatted text input**
      inputField.addEventListener("change", function () {
        let date = new Date(this.value);
        if (!isNaN(date)) {
          let formattedDate = date.toLocaleDateString("fr-FR"); // DD/MM/YYYY
          this.setAttribute("data-value", this.value); // Store original YYYY-MM-DD value
          this.value = formattedDate;
        }
        checkFormCompletion();
      });

      renderCalendar(currentDate);
      return calendarPopup;
    }

    function checkFormCompletion() {
      forms.forEach((form) => {
        const allFilled = Array.from(
          form.querySelectorAll(".datetime-input")
        ).every((input) => input.value.trim() !== "");
        form.querySelector("button[type=submit]").disabled = !allFilled;
      });
    }

    forms.forEach((form) => {
      form.querySelectorAll(".datetime-input").forEach((input) => {
        createDateTimePicker(input);
        input.addEventListener("input", checkFormCompletion);
      });
    });
  });

}

showForm();
