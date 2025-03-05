"strict";
const accordion = document.querySelectorAll(".accordion-content");
const Show = document.querySelectorAll(".hideContent");

playAction(accordion, ".arrow", ".accordion", ".accordion-item");
playAction(Show, ".arrow", ".hideInfo", ".showInfo");
//make it flexible

function removeAction(element, arrow, content, id) {
  if (arrow != null) {
    element.forEach((el, index) => {
      if (index != id) {
        el.querySelector(content).classList.add("hide");
        el.querySelector(arrow).style.transform = "rotate(0)";
      }
    });
  } else {
    element.forEach((el, index) => {
      if (index != id) {
        el.querySelector(content).classList.add("hide");
      }
    });
  }
}

function playAction(element, arrow, header, content) {
  if (arrow != null) {
    element.forEach((el, id) => {
      let _arrow = el.querySelector(arrow);
      let _header = el.querySelector(header);
      let _content = el.querySelector(content);

      _content.classList.add("hide");

      _header.addEventListener("click", () => {
        if (_content.classList.contains("hide")) {
          _content.classList.remove("hide");
          _header.classList.add("active");
          _arrow.style.transform = "rotate(180deg)";
        } else {
          _header.classList.remove("active");
          _content.classList.add("hide");
          _arrow.style.transform = "rotate(0)";
        }
        removeAction(element, arrow, content, id);
      });
    });
  } else {
    element.forEach((el, id) => {
      let _header = el.querySelector(header);
      let _content = el.querySelector(content);

      _content.classList.add("hide");

      _header.addEventListener("click", () => {
        if (_content.classList.contains("hide")) {
          _content.classList.remove("hide");
          _header.classList.add("active");
        } else {
          _header.classList.remove("active");
          _content.classList.add("hide");
        }
        removeAction(element, content, id);
      });
    });
  }
}

// toggle table
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".table-line").forEach((row) => {
    row.addEventListener("click", function(e) {
      e.stopPropagation();
      let targetId = this.getAttribute("data-toggle");
      let contentRow = document.getElementById(targetId);

      if (contentRow.classList.contains("show")) {
        contentRow.style.height = "0px"; // Collapse animation
        contentRow.style.opacity = "0";
        setTimeout(() => {
          contentRow.classList.remove("show");
          contentRow.style.display = "none"; // Hide after animation
        }, 400); // Matches CSS transition time
      } else {
        // Close other open rows
        document.querySelectorAll(".hidden-row.show").forEach((openRow) => {
          openRow.style.height = "0px";
          openRow.style.opacity = "0";
          setTimeout(() => {
            openRow.classList.remove("show");
            openRow.style.display = "none";
          }, 400);
        });

        contentRow.style.display = "table-row"; // Show row first
        setTimeout(() => {
          contentRow.classList.add("show");
          contentRow.style.height = contentRow.scrollHeight + "px"; // Expand
          contentRow.style.opacity = "1";
        }, 10); // Small delay to trigger animation
      }
    });
  });
});
