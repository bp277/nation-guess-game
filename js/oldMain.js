const url = "https://restcountries.com/v3.1/all"

async function getCountries() {
  const response = await fetch(url)
  const data = await response.json()
  console.log(data.map((x) => x.name.common))
}
async function renderCountries() {
  let allCountries = await getCountries()
  let html = ''
  allCountries.f
}


const main = document.querySelector('main');
const input = document.querySelector("#input");
const answers = document.querySelector(".answers");
const searchList = document.querySelector(".search-list")
const listItem = document.querySelector(".list-item")
//Searching and Submiting answer
input.addEventListener("keyup", () => {
  // Creating list of search results
  const searchItem = document.createElement("li")

  const inputValue = input.value
  const filtered = countries.filter((c) => (c["country"].toLowerCase()).startsWith(inputValue.toLowerCase()));
  const searchResult = (Object.values(filtered).map((obj) => {
    return obj.country
  }));
  searchResult.sort()
  if (searchResult) {
    searchList.innerHTML = "";
    let innerElement = "";
    searchResult.forEach((item) => {
      innerElement += `<li class="list-item">${item}</li>`
    })
    searchList.innerHTML = innerElement
  }
  })
  

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    createAnswer();
  }
});

function selectCountry(e){
  console.log(e.target.innerHTML)
}
if (searchList){
  searchList.addEventListener("click", selectCountry)
}
//Creating and appending the answer

function createAnswer() {
  const answer = document.createElement("div");
  answer.classList.add("answer");
  answers.appendChild(answer);

  // Creating answers elements
  const flag = document.createElement("div");
  flag.classList.add("flag");
  const continent = document.createElement("div");
  continent.classList.add("continent");
  const population = document.createElement("div");
  population.classList.add("population");
  const landSize = document.createElement("div");
  landSize.classList.add("landSize");
  const borderingCountries = document.createElement("div");
  borderingCountries.classList.add("borderingCountries");

  //Appending elements to answer div
  answer.appendChild(flag);
  answer.appendChild(continent);
  answer.appendChild(population);
  answer.appendChild(landSize);
  answer.appendChild(borderingCountries);

  //Filling in the answer

}
console.log(new Answer("flag", "Europe", 7.2, 88, 4));