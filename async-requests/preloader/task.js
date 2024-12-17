const loader = document.getElementById("loader");
const itemsContainer = document.getElementById("items");
const apiURL =
  "https://students.netoservices.ru/nestjs-backend/slow-get-courses";

function displayCurrencies(valutes) {
  itemsContainer.innerHTML = "";
  for (const key in valutes) {
    const { CharCode, Value } = valutes[key];
    const itemHTML = `
      <div class="item">
        <div class="item__code">${CharCode}</div>
        <div class="item__value">${Value}</div>
        <div class="item__currency">руб.</div>
      </div>
    `;
    itemsContainer.insertAdjacentHTML("beforeend", itemHTML);
  }
}

function cacheCurrencies(data) {
  localStorage.setItem(
    "cachedCurrencies",
    JSON.stringify({
      timestamp: Date.now(),
      data: data,
    })
  );
}

function loadCachedCurrencies() {
  const cached = localStorage.getItem("cachedCurrencies");
  if (cached) {
    const { timestamp, data } = JSON.parse(cached);
    const tenMinutes = 10 * 60 * 1000;
    if (Date.now() - timestamp < tenMinutes) {
      return data;
    }
  }
  return null;
}

async function loadCurrencies() {
  loader.classList.add("loader_active");
  try {
    const cachedData = loadCachedCurrencies();
    if (cachedData) {
      displayCurrencies(cachedData.Valute);
      console.log("Данные загружены из кэша");
    } else {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error("Ошибка загрузки данных");
      const result = await response.json();
      displayCurrencies(result.response.Valute);
      cacheCurrencies(result.response);
      console.log("Данные загружены с сервера");
    }
  } catch (error) {
    console.error("Ошибка:", error.message);
    itemsContainer.innerHTML = `<p>Не удалось загрузить данные.</p>`;
  } finally {
    loader.classList.remove("loader_active");
  }
}

document.addEventListener("DOMContentLoaded", loadCurrencies);
