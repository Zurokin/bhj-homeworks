const timerElement = document.getElementById("timer");
const downloadLink = document.getElementById("downloadLink");
let timeRemaining = 59;

function formatTime(seconds) {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
}

timerElement.textContent = formatTime(timeRemaining);

const countdown = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining -= 1;
    timerElement.textContent = formatTime(timeRemaining);
  } else {
    clearInterval(countdown);
    alert("Вы победили в конкурсе!");
    downloadLink.click();
  }
}, 1000);
