const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part");
wIcon = weatherPart.querySelector("img"),
welcomeMessage = document.getElementById('welcomeMessage');
arrowBack = wrapper.querySelector("header i");

function showWeatherApp() {
  wrapper.classList.remove("hidden");
  inputPart.classList.remove("hidden");
}

function hideInputPart() {
  inputPart.classList.add("hidden");
}

function showWeatherPart() {
  weatherPart.classList.remove("hidden");
}

function hideWelcome() {
  welcomeMessage.classList.add("hidden")
}

function handleUserInteraction() {
  const nextButton = document.getElementById('nextButton');
  const nameInput = document.getElementById('nameInput');
  const headerElement = document.querySelector('header');

  nextButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name !== '') {
      hideInputPart();
      showWeatherApp();
      document.querySelector('.welcome-part').style.display = 'none';
      headerElement.innerHTML = `<header><i class='bx bx-left-arrow-alt'></i>Привет, ${name}! | Weather App</header>`;
    }
  });

  arrowBack.addEventListener("click", () => {
    showWeatherApp();
  });
  
  inputField.addEventListener("keyup", (e) => {
    if (e.key == "Enter" && inputField.value != "") {
      requestApi(inputField.value);
    }
  });
  
  locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) { // Проверка на поддержку api браузером
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Ваш браузер не поддерживает API геолокации");
    }
  });
}

handleUserInteraction();

function weatherDetails(info) {  

    if (info.cod == "404") {
      infoTxt.classList.replace("pending", "error");
      infoTxt.innerText = `${inputField.value} Неизвестное название города`;
    } else {
      const city = info.name;
      const country = info.sys.country;
      const { description, id } = info.weather[0];
      const { temp, feels_like, humidity } = info.main;
  
      if (id == 800) {
        wIcon.src = "icons/clear.svg";
      } else if (id >= 200 && id <= 232) {
        wIcon.src = "icons/storm.svg";
      } else if (id >= 600 && id <= 622) {
        wIcon.src = "icons/snow.svg";
      } else if (id >= 701 && id <= 781) {
        wIcon.src = "icons/haze.svg";
      } else if (id >= 801 && id <= 804) {
        wIcon.src = "icons/cloud.svg";
      } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
        wIcon.src = "icons/rain.svg";
      }
  
      weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
      weatherPart.querySelector(".weather").innerText = description;
      weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
      weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
      weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
      infoTxt.classList.remove("pending", "error");
      infoTxt.innerText = "";
      inputField.value = "";
      wrapper.classList.add("active");

    }
  }
