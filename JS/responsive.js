"strict";
const width = window.innerWidth;
const sidebar = document.querySelectorAll(".sidebar");
const toggle = document.querySelectorAll(".menu-toggle");
const mainContent = document.querySelectorAll(".main-content");
const navbar = document.querySelectorAll(".container-navigation");
const menuToggle = document.querySelectorAll(".menuToggle");

if (width <= 575.98) {
  hideSidebar();
  toggSidebar();
  toggleNavbar();
  document.querySelector(".menu-toggle").innerHTML =
    '<i class="bi bi-filter-left fw-5 darkGray fs-20"></i>';
} else if (width >= 767.98 && width <= 991.98) {
  hideSidebar();
  toggSidebar();
  toggleNavbar();
  document.querySelector(".menu-toggle").innerHTML =
    '<i class="bi bi-filter-left fw-5 darkGray fs-20"></i>';
} else {
  // Menu toggle

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
}

function toggSidebar() {
  toggle.forEach((element) => {
    element.addEventListener("click", () => {
      if (sidebar[0].classList.contains("hide")) {
        showSidebar();
        element.innerHTML =
          '<i class="bi bi-filter-left fw-5 darkGray fs-20"></i>';
      } else {
        hideSidebar();
        element.innerHTML =
          '<i class="bi bi-filter-right fw-5 darkGray fs-20"></i>';
      }
    });
  });
}
function hideSidebar() {
  sidebar.forEach((element) => {
    element.classList.add("hide");
  });
}
function showSidebar() {
  sidebar.forEach((element) => {
    const headerMenu = element.querySelector(".title");
    const content =
      '<h2 class="fs-20 px-4 blue"><i class="bi bi-x fs-22 fw-800 border-1 px-2 rounded-1 darkGray"></i> Close Menu</h2>';
    headerMenu.innerHTML = content;
    element.classList.remove("hide");
    if (width <= 575.98) {
      element.style.width = "70%";
    }
    if (width >= 767.98 && width <= 991.98) {
      element.style.width = "40%";
    }
    element.style.height = "auto !important";
    element.style.position = "absolute !important";
    element.style.zIndex = "1000";
    element.top = "0 !important";
    element.left = "40% !important";
    headerMenu.addEventListener("click", () => {
      hideSidebar();
    });
  });
}
// navbar toggle
function toggleNavbar() {
  const li = document.createElement("li");
  li.classList.add("navigation-item");
  li.innerHTML =
    '<a class="py-2 d-flex align-items-center gap-2" href="profile.html"><i class="bi bi-person-circle"></i><span>Profile</span></a>';
  menuToggle.forEach((element) => {
    element.addEventListener("click", () => {
      navbar.forEach((nav) => {
        if (nav.classList.contains("show")) {
          element.innerHTML =
            '<i class="bi bi-list px-2 darkGray rounded-2"></i>';
          nav.classList.remove("show");
        } else {
          document.querySelectorAll(".navigation").forEach((nav) => {
            nav.appendChild(li);
          });
          element.innerHTML =
            '<i class="bi bi-x px-2 border-1 darkGray rounded-2"></i>';
          nav.classList.add("show");
        }
      });
    });
  });
}
