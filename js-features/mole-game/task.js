(() => {
  let dead = 0,
    lost = 0;

  const handleClick = (index) => {
    const hole = document.getElementById(`hole${index}`);

    if (hole.classList.contains("hole_has-mole")) {
      dead++;
    } else {
      lost++;
    }

    document.getElementById("dead").textContent = dead;
    document.getElementById("lost").textContent = lost;

    if (dead >= 10) {
      alert("Вы победили!");
      resetGame();
    } else if (lost >= 5) {
      alert("Вы проиграли!");
      resetGame();
    }
  };

  const resetGame = () => {
    dead = 0;
    lost = 0;
    document.getElementById("dead").textContent = dead;
    document.getElementById("lost").textContent = lost;

    for (let i = 1; i <= 9; i++) {
      const hole = document.getElementById(`hole${i}`);
      hole.classList.remove("hole_has-mole");
    }

    next();
  };

  const addClickListeners = () => {
    for (let i = 1; i <= 9; i++) {
      const hole = document.getElementById(`hole${i}`);
      hole.addEventListener("click", () => handleClick(i));
    }
  };

  const next = () =>
    setTimeout(() => {
      if (dead >= 10 || lost >= 5) {
        return;
      }

      if (activeHole) {
        activeHole.classList.remove("hole_has-mole");
      }

      const randomIndex = Math.floor(Math.random() * 9) + 1;
      activeHole = document.getElementById(`hole${randomIndex}`);
      activeHole.classList.add("hole_has-mole");

      next();
    }, 800);

  addClickListeners();
  next();
})();
