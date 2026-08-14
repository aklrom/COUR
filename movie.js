/*OMDN API*/
let inputcity = document.getElementById("inputcity");
let form = document.querySelector("form");
let imgscreen = document.getElementById("imgscreen");
let year = document.getElementById("year");
let resume = document.getElementById("resume");

form.addEventListener("submit", async (e) => {
  e.preventDefault;
  let url = "";
  let apiKey = "";
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        "api-x": apiKey,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new error(`Erreur HTTP ${response.status}`);
    }
    data = await response.json();
    console.log(data);
    imgscreen.innerHTML = `<img src="" alt="" class="image"/>`;
    year.innerHTML = `<p> data form api </p>`;
    resume.innerHTML = `<p> data from api </p> `;
  } catch {
    alert("error something wrong try again");
  }
});
