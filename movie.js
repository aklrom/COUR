let inputmoviename = document.getElementById("inputmovie");
let form = document.querySelector("form");
let imgscreen = document.getElementById("imgscreen");
let year = document.getElementById("year");
let resume = document.getElementById("resume");
let container = document.getElementById("actorSection");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  container.innerHTML="";
  let apiKey = "a8ef239";
  let movieTitle = encodeURIComponent(inputmoviename.value.trim());

  // URL correcte avec HTTPS et paramètre apikey
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`;

  try {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    let data = await response.json();
    console.log(data);

    if (data.Response === "False") {
      throw new Error(data.Error || "Film introuvable");
    }

    imgscreen.innerHTML =
      data.Poster !== "N/A"
        ? `<img src="${data.Poster}" alt="${data.Title}" class="image"/>`
        : `<p>Aucune image disponible</p>`;

    year.innerHTML = `<p><strong>Année :</strong> ${data.Year}</p>`;
    resume.innerHTML = `<p><strong>Résumé :</strong> ${data.Plot}</p>
        
        <p><strong>Genre :</strong>${data.Genre}</p>`;

    let actors = data.Actors.split(","); 
    let tmdbApiKey = "3f718ff765a563341c599ffcec5fb17f";

    actors.forEach(async (actorName) => {
      actorName = actorName.trim(); 

      let url = `https://api.themoviedb.org/3/search/person?api_key=${tmdbApiKey}&query=${encodeURIComponent(actorName)}`;
      let response = await fetch(url);
      let result = await response.json();

      if (result.results.length > 0) {
        let actor = result.results[0];
        let profilePath = actor.profile_path;
        if (profilePath) {
          let imgUrl = `https://image.tmdb.org/t/p/w500${profilePath}`;

          
          container.innerHTML += `
                <div class="card">
                    <img src="${imgUrl}" alt="${actorName}" />
                    <p>${actorName}</p>
                </div>
            `;
        }
      }
    });
    
  } catch (error) {
    console.error(error);
    alert(`Erreur : ${error.message}`);
  }
});
