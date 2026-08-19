// let url =
//   "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
// let topTen = [];

// async function updateTopTen() {
//   try {
//     let response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`erreur ${response.status}`);
//     }
//     let data = await response.json();
//     console.log(data);

//     // Affichage des 10 cryptos
//     data.forEach((crypto, index) => {
//       let div = document.getElementById(`top${index + 1}`);
//       let h3 = div.querySelector(".h3ctn");
//       let img = div.querySelector(".imgctn");
//       let p = div.querySelector(".pctn");
//       let change24h = crypto.price_change_percentage_24h;
//       let trendClass = change24h >= 0 ? "text-green" : "text-red";
//       let trendArrow = change24h >= 0 ? "▲" : "▼";

//       h3.innerHTML = `<h3>${crypto.name}</h3>`;
//       img.innerHTML = `<img src=${crypto.image} alt=${crypto.name}/>`;
//       p.innerHTML = `<h4>${crypto.current_price} USD</h4>
//                      <p class=${trendClass}>${trendArrow} ${change24h.toFixed(2)}%</p>`;

//       topTen.push({ id: crypto.id, name: crypto.name });
//     });

//     // Dessiner le graphique pour la première crypto du top 10
//     if (topTen.length > 0) {
//       drawChart(topTen[0].id, topTen[0].name);
//     }
//   } catch (error) {
//     alert("something wrong");
//     console.log(error);
//   }
// }

// async function drawChart(cryptoId, cryptoName) {
//   const ctx = document.getElementById("myChart").getContext("2d");
//   let urlGraphe = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7`;

//   try {
//     let responseg = await fetch(urlGraphe);
//     if (!responseg.ok) throw new Error(`erreur ${responseg.status}`);
//     let dataprice = await responseg.json();

//     // Extraire les prix
//     let prices = dataprice.prices.map(p => p[1]);
//     let labels = dataprice.prices.map((p, i) => `Jour ${i + 1}`);

//     new Chart(ctx, {
//       type: "line",
//       data: {
//         labels: labels,
//         datasets: [{
//           label: `Prix du ${cryptoName}`,
//           data: prices,
//           borderColor: "#ff9f43",
//           backgroundColor: "rgba(255, 159, 67, 0.2)",
//           tension: 0.3
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { labels: { color: "#ffffff" } }
//         }
//       }
//     });
//   } catch (error) {
//     alert("something wrong");
//     console.log(error);
//   }
// }

// updateTopTen();
// setInterval(updateTopTen, 360000); // toutes les 6 minutes

let url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";
let topTen = [];

async function updateTopTen() {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Erreur ${response.status}`);
    let data = await response.json();
    console.log(data);

    topTen = []; // réinitialiser

    // Affichage des 10 cryptos
    data.forEach((crypto, index) => {
      let div = document.getElementById(`top${index + 1}`);
      let h3 = div.querySelector(".h3ctn");
      let img = div.querySelector(".imgctn");
      let p = div.querySelector(".pctn");

      let change24h = crypto.price_change_percentage_24h;
      let trendClass = change24h >= 0 ? "text-green" : "text-red";
      let trendArrow = change24h >= 0 ? "▲" : "▼";

      h3.innerHTML = `<h3>${crypto.name}</h3>`;
      img.innerHTML = `<img src="${crypto.image}" alt="${crypto.name}"/>`;
      p.innerHTML = `<h4>$${crypto.current_price.toLocaleString()} USD</h4>
                     <p class="${trendClass}">${trendArrow} ${change24h.toFixed(2)}%</p>`;

      // Sauvegarder l'ID et le nom
      topTen.push({ id: crypto.id, name: crypto.name });

      
      // Ajouter un listener sur la carte
      div.onclick = () => {
        document.getElementById("myChart").scrollIntoView({ behavior: "smooth" });
        drawChart(crypto.id, crypto.name);
      };
    });
  } catch (error) {
    alert("something wrong");
    console.error(error);
  }
}

let currentChart = null; // pour détruire l'ancien graphique

async function drawChart(cryptoId, cryptoName) {
  const ctx = document.getElementById("myChart").getContext("2d");
  let urlGraphe = `https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=7`;

  try {
    let responseg = await fetch(urlGraphe);
    if (!responseg.ok) throw new Error(`Erreur ${responseg.status}`);
    let dataprice = await responseg.json();

    // Extraire les prix
    let prices = dataprice.prices.map(p => p[1]);
    let labels = dataprice.prices.map((p, i) => `Jour ${i + 1}`);

    // Détruire l'ancien graphique si présent
    if (currentChart) {
      currentChart.destroy();
    }

    currentChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: `Prix du ${cryptoName}`,
          data: prices,
          borderColor: "#ff9f43",
          backgroundColor: "rgba(255, 159, 67, 0.2)",
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: "#ffffff" } }
        }
      }
    });
  } catch (error) {
    console.error("Erreur graphique:", error);
  }
}

updateTopTen();
setInterval(updateTopTen, 360000); // toutes les 6 minutes
