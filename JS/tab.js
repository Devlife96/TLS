document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tab-container").forEach((container) => {
    const tabs = container.querySelectorAll(".tab-btn");
    const contents = container.querySelectorAll(".tab-content");

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const target = this.getAttribute("data-tab");

        // Remove active class from tabs and contents in this container only
        tabs.forEach((t) => t.classList.remove("active"));
        contents.forEach((c) => c.classList.remove("active"));

        // Activate clicked tab and its corresponding content
        this.classList.add("active");
        container.querySelector(`#${target}`).classList.add("active");
      });
    });
  });
});
