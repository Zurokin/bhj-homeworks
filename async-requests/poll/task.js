document.addEventListener("DOMContentLoaded", () => {
  function loadPoll() {
    const xhr = new XMLHttpRequest();
    console.log("Отправляю GET-запрос...");

    xhr.open("GET", "https://students.netoservices.ru/nestjs-backend/poll");
    xhr.responseType = "json";

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Ответ от сервера:", xhr.response);
        const pollData = xhr.response;
        renderPoll(pollData);
      } else {
        console.error("Ошибка запроса:", xhr.status);
      }
    };

    xhr.onerror = () => console.error("Ошибка сети при выполнении запроса!");
    xhr.send();
  }

  function renderPoll(data) {
    const pollTitle = document.getElementById("poll__title");
    const pollAnswers = document.getElementById("poll__answers");

    pollTitle.textContent = data.data.title;

    pollAnswers.innerHTML = "";

    data.data.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "poll__answer";
      button.textContent = answer;

      button.addEventListener("click", () => {
        alert("Спасибо, ваш голос засчитан!");
        sendVote(data.id, index);
      });

      pollAnswers.appendChild(button);
    });
  }

  function renderResults(stats) {
    const pollAnswers = document.getElementById("poll__answers");
    pollAnswers.innerHTML = "";

    const totalVotes = stats.reduce((sum, item) => sum + item.votes, 0);
    stats.forEach((stat) => {
      const percentage = ((stat.votes / totalVotes) * 100).toFixed(2);
      const resultDiv = document.createElement("div");
      resultDiv.className = "poll__result";
      resultDiv.textContent = `${stat.answer}: ${percentage}% (${stat.votes} голосов)`;
      pollAnswers.appendChild(resultDiv);
    });
  }

  function sendVote(voteId, answerIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/poll");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    console.log(`Отправляю голос: vote=${voteId}&answer=${answerIndex}`);

    xhr.onload = () => {
      if (xhr.status === 201) {
        console.log("Результаты голосования:", xhr.response);
        const results = JSON.parse(xhr.response);
        renderResults(results.stat);
      } else {
        console.error("Ошибка при отправке голоса:", xhr.status);
      }
    };

    xhr.onerror = () => console.error("Ошибка сети при отправке голоса!");
    xhr.send(`vote=${voteId}&answer=${answerIndex}`);
  }

  loadPoll();
});
