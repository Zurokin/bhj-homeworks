document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const progress = document.getElementById("progress");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        progress.value = percentComplete;
        console.log(`Загружено: ${(percentComplete * 100).toFixed(2)}%`);
      }
    });

    xhr.onload = () => {
      console.log(`Ответ от сервера: ${xhr.status}`);
      if (xhr.status === 200 || xhr.status === 201) {
        alert("Файл успешно загружен!");
        progress.value = 1;
      } else {
        alert(`Ошибка загрузки: ${xhr.status} - ${xhr.statusText}`);
      }
    };

    xhr.onerror = () => {
      alert("Ошибка сети при загрузке файла!");
    };

    xhr.send(formData);
  });
});
