let jokescreen = document.getElementById("jokescreen");
let btn = document.querySelector("button");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let url = "";
  let response = await fetch(url);
  let joke = (await response).json();
  console.log(joke);
});
