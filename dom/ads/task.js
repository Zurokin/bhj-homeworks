function rotateText(rotator) {
  const cases = rotator.querySelectorAll(".rotator__case");
  let currentIndex = 0;

  function changeText() {
    const currentCase = cases[currentIndex];
    const nextIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[nextIndex];

    currentCase.classList.remove("rotator__case_active");
    nextCase.classList.add("rotator__case_active");

    nextCase.style.color = nextCase.getAttribute("data-color");

    currentIndex = nextIndex;
  }

  setInterval(changeText, cases[currentIndex].getAttribute("data-speed"));
}

document.querySelectorAll(".rotator").forEach((rotator) => {
  rotateText(rotator);
});
