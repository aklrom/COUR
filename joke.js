let jokescreen = document.getElementById("jokescreen");
let btn = document.querySelector("button");
btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let url = "https://api.api-ninjas.com/v1/jokes";
  let apiKey= "XAi2qxwiBZcSSDdj6fpMjm5jPpVkFbLpXInhU5cG";
  try{
    let Response=await fetch(url,{
      method:'GET',
      headers:{
        'X-Api-Key':apiKey,
        'Content-Type':'application/json'
      }
    });
    if(!Response.ok){
      throw new Error(`Erreur HTTP : ${Response.status}`);
    }

    const data=await Response.json();
    console.log(data[0].joke);
    jokescreen.innerHTML=`<p>${data[0].joke}</p>`
  }catch (error){
    alert("Quelque chose s'est mal passé.Reéssayer");
  }
});
