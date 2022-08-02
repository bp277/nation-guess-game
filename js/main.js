import { countries } from "./countries.js";

const main = document.querySelector('main');
const input = document.querySelector("#input");
const answers = document.querySelector(".answers");
const searchList = document.querySelector(".search-list")

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
      innerElement += `<li>${item}</li>`
    })
    searchList.innerHTML = innerElement
  }
  })
  

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {

    createAnswer();
  }
});

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

  //
}
