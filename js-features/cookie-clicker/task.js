let lastClickTime = null;
let clickCount = 0;

const cookie = document.getElementById("cookie");
const counterDisplay = document.getElementById("clicker__counter");
const speedDisplay = document.getElementById("clicker__speed");

function calculateClickSpeed() {
  if (lastClickTime !== null) {
    const currentTime = new Date();
    const timeDiff = (currentTime - lastClickTime) / 1000;
    if (timeDiff > 0) {
      return (1 / timeDiff).toFixed(2);
    }
  }
  return 0;
}

cookie.addEventListener("click", () => {
  clickCount++;
  counterDisplay.textContent = clickCount;

  const currentTime = new Date();

  const clickSpeed = calculateClickSpeed();
  speedDisplay.textContent = clickSpeed;

  lastClickTime = currentTime;
});
