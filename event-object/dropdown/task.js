document.querySelectorAll(".dropdown").forEach((dropdown) => {
  const valueElement = dropdown.querySelector(".dropdown__value");
  const listElement = dropdown.querySelector(".dropdown__list");

  valueElement.addEventListener("click", () => {
    listElement.classList.toggle("dropdown__list_active");
  });

  listElement.querySelectorAll(".dropdown__item").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      valueElement.textContent = item.textContent.trim();
      listElement.classList.remove("dropdown__list_active");
    });
  });
});
