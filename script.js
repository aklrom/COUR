let form = document.querySelector("form");
let input = document.querySelector("#inputcity");
let feature1value = document.getElementById("feature1value");
let feature2value = document.getElementById("feature2value");
let feature3value = document.getElementById("feature3value");
let feature4value = document.getElementById("feature4value");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let city = input.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e541f771da23a4c4f078a48a62394f59&units=metric`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    if (data.cod === "404") {
      alert("Ville introuvable");
      return;
    }
    feature1value.textContent = data.main.temp;
    feature2value.textContent = data.weather[0].description;
    feature3value.textContent = data.wind.speed;
    feature4value.textContent = data.main.humidity;
  } catch (error) {
    console.error("Erreur lors de la requete", error);
  }

  console.log(data);
});
