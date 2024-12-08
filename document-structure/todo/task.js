document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("tasks__form");
  const taskInput = document.getElementById("task__input");
  const tasksList = document.getElementById("tasks__list");

  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskText) => addTask(taskText));
  };

  const saveTasks = () => {
    const tasks = Array.from(tasksList.children).map(
      (task) => task.querySelector(".task__title").textContent
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (taskText) => {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.innerHTML = `
            <div class="task__title">${taskText}</div>
            <a href="#" class="task__remove">&times;</a>
        `;

    const removeButton = taskElement.querySelector(".task__remove");
    removeButton.addEventListener("click", () => {
      taskElement.remove();
      saveTasks();
    });

    tasksList.appendChild(taskElement);
  };

  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTask(taskText);
      saveTasks();
      taskInput.value = "";
    }
  });

  loadTasks();
});
