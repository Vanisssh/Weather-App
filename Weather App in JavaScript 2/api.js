
function requestApi(city) {  // Запрос по городу
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=324c16f4a7011c296911032a73f1786a`;
  fetchData(api);
}

function onSuccess(position) {  // Запрос по координатам
  const { latitude, longitude } = position.coords;
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=324c16f4a7011c296911032a73f1786a`;
  fetchData(api);
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}

function fetchData(api) {
  infoTxt.innerText = "Получение деталей о погоде...";
  infoTxt.classList.add("pending");
  fetch(api)
    .then((res) => res.json())
    .then((result) => weatherDetails(result))
    .catch(() => {
      infoTxt.innerText = "Что-то пошло не так";
      infoTxt.classList.replace("pending", "error");
    });
}


