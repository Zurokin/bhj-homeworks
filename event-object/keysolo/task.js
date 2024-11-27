class Game {
  constructor() {
    this.wordElement = document.querySelector(".word");
    this.winsElement = document.querySelector(".status__wins");
    this.lossElement = document.querySelector(".status__loss");
    this.timerElement = document.querySelector(".status__timer");
    this.timer = null;

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    document.addEventListener("keydown", (event) => {
      const currentSymbol = this.currentSymbol.textContent.toLowerCase();
      const inputSymbol = event.key.toLowerCase();

      if (currentSymbol === inputSymbol) {
        this.success();
      } else {
        this.fail();
      }
    });
  }

  success() {
    this.currentSymbol.classList.add("symbol_correct");
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (!this.currentSymbol) {
      this.winsElement.textContent = +this.winsElement.textContent + 1;

      if (this.winsElement.textContent === "10") {
        alert("Вы выиграли!");
        this.reset();
      } else {
        this.setNewWord();
      }
    }
  }

  fail() {
    this.lossElement.textContent = +this.lossElement.textContent + 1;

    if (this.lossElement.textContent === "3") {
      alert("Вы проиграли!");
      this.reset();
    } else {
      this.setNewWord();
    }
  }

  setNewWord() {
    clearInterval(this.timer);
    const word = this.getWord();

    this.renderWord(word);
    this.startTimer(word.length);
  }

  getWord() {
    const words = ["Коля", "Привет", "Слово", "JavaScript", "Игрок", "Книга"];
    const index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? "symbol_current" : ""}">${s}</span>`
      )
      .join("");
    this.wordElement.innerHTML = html;
    this.currentSymbol = this.wordElement.querySelector(".symbol_current");
  }

  startTimer(seconds) {
    this.timerElement.textContent = seconds;
    this.timer = setInterval(() => {
      seconds--;
      this.timerElement.textContent = seconds;

      if (seconds <= 0) {
        clearInterval(this.timer);
        this.fail();
      }
    }, 1000);
  }
}

new Game();
