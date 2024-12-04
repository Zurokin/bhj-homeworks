function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

const reveals = document.querySelectorAll(".reveal");

function checkReveals() {
  reveals.forEach((reveal) => {
    if (isElementInViewport(reveal)) {
      reveal.classList.add("reveal_active");
    }
  });
}

window.addEventListener("scroll", checkReveals);

checkReveals();
