"strict";
const accordion = document.querySelectorAll(".accordion-content");

playAction(accordion, ".arrow", ".accordion", ".accordion-item");

//make it flexible

function removeAction(element, arrow, content, id) {
  element.forEach((el, index) => {
    if (index != id) {
      el.querySelector(content).classList.add("hide");
      el.querySelector(arrow).style.transform = "rotate(0)";
    }
  });
}

function playAction(element, arrow, header, content) {
  element.forEach((el, id) => {
    let _arrow = el.querySelector(arrow);
    let _header = el.querySelector(header);
    let _content = el.querySelector(content);

    _content.classList.add("hide");

    _header.addEventListener("click", () => {
      if (_content.classList.contains("hide")) {
        _content.classList.remove("hide");
        _arrow.style.transform = "rotate(180deg)";
      } else {
        _content.classList.add("hide");
        _arrow.style.transform = "rotate(0)";
      }
      removeAction(element, arrow, content, id);
    });
  });
}
