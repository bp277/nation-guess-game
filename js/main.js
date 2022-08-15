import { unMembers } from "./countries.js";
import { Answer } from "./answer.js";

const main = document.querySelector("main");
const input = document.querySelector("#input");
const answers = document.querySelector(".answers");
const searchList = document.querySelector(".search-list");
const listItem = document.querySelector(".list-item");
const backdrop = document.querySelector(".backdrop");
const backdropCoa = document.querySelector(".backdrop-coa");
const backdropFlag = document.querySelector(".backdrop-flag");
const howToPlay = document.querySelector(".htp");
const backdropTutorial = document.querySelector(".backdrop-tutorial");
const modalTutorial = document.querySelector(".tutorial-modal");
const correctName = document.querySelector(".correct-name");
const correctFlag = document.querySelector(".correct-flag");
const newGame = document.querySelector(".new-game");
const coatsOfArms = document.querySelector(".coa");
const hintFlag = document.querySelector(".flag-h3");
const imgCoa = document.querySelector(".img-coa");
const modalFlag = document.querySelector(".img-flag");

let id = null;

let countryInfo = [];

for (let i = 0; i < unMembers.length; i++) {
  countryInfo.push([
    unMembers[i].flags.png,
    unMembers[i].name.common,
    unMembers[i].continents,
    unMembers[i].subregion,
    unMembers[i].population,
    unMembers[i].area,
    unMembers[i].borders == undefined
      ? (unMembers[i].borders = [])
      : unMembers[i].borders,
    unMembers[i].coatOfArms.png,
  ]);
}

//Searching and Submiting answer
input.addEventListener("keyup", () => {
  // Creating list of search results
  const searchItem = document.createElement("li");

  const inputValue = input.value;

  const filtered = countryInfo.filter((c) =>
    c[1].toLowerCase().includes(inputValue.toLowerCase())
  );
  const searchResult = Object.values(filtered).map((obj) => {
    return obj[1];
  });
  searchResult.sort();
  if (searchResult) {
    searchList.innerHTML = "";
    let innerElement = "";
    searchResult.forEach((item) => {
      innerElement += `<li class="list-item">${item}</li>`;
    });
    searchList.innerHTML = innerElement;
  }
});

input.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    createAnswer();
  }
});

function selectCountry(e) {
  for (let i = 0; i < countryInfo.length; i++) {
    if (e.target.innerHTML === unMembers[i].name.common) {
      new Answer(
        unMembers[i].flags.png,
        unMembers[i].continents[0],
        unMembers[i].subregion,
        unMembers[i].population,
        unMembers[i].area,
        unMembers[i].borders.length
      );

      createAnswer(
        unMembers[i].flags.png,
        unMembers[i].continents[0],
        unMembers[i].subregion,
        unMembers[i].population
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        unMembers[i].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " km²",
        unMembers[i].borders.length
      );

      // Open modal and end the game when answer is correct or when the user exceeds the limited number of guesses
      if (
        e.target.innerHTML === correctAnswer[1] ||
        answers.childNodes.length == 9
      ) {
        console.log("Correct!");
        backdrop.style.display = "flex";
        correctName.textContent = correctAnswer[1];
        correctFlag.src = correctAnswer[0];
      }
    }
    input.value = "";
    searchList.innerHTML = "";
  }
}
newGame.addEventListener("click", () => {
  location.reload();
  id = null;
  localStorage.clear();
});

if (searchList) {
  searchList.addEventListener("click", selectCountry);
}
//Creating and appending the answer

function createAnswer(flg, cont, subreg, pop, siz, bord) {
  const answer = document.createElement("div");
  answer.classList.add("answer");
  answer.setAttribute("id", id++ + 1);
  answers.appendChild(answer);

  const flag = document.createElement("div");
  flag.classList.add("flag");
  answer.appendChild(flag);
  const flagImg = document.createElement("img");
  flag.appendChild(flagImg);
  flagImg.src = flg;
  flagImg.setAttribute("width", "68px");
  flagImg.setAttribute("height", "45px");

  const continent = document.createElement("div");
  continent.classList.add("continent");
  answer.appendChild(continent);
  const continentPara = document.createElement("p");
  continent.appendChild(continentPara);
  continentPara.textContent = cont;

  const subregion = document.createElement("div");
  subregion.classList.add("subregion");
  answer.appendChild(subregion);
  const subregionPara = document.createElement("p");
  subregion.appendChild(subregionPara);
  subregionPara.textContent = subreg;

  const population = document.createElement("div");
  population.classList.add("population");
  answer.appendChild(population);
  const populationPara = document.createElement("p");
  population.appendChild(populationPara);
  populationPara.textContent = pop;

  const size = document.createElement("div");
  size.classList.add("size");
  answer.appendChild(size);
  const sizePara = document.createElement("p");
  size.appendChild(sizePara);
  sizePara.textContent = siz;

  const borders = document.createElement("div");
  borders.classList.add("borders");
  answer.appendChild(borders);
  const bordersPara = document.createElement("p");
  borders.appendChild(bordersPara);
  bordersPara.textContent = bord;

  if (flagImg.src == correctAnswer[0]) {
    flag.classList.add("success");
  }
  if (continentPara.innerHTML === correctAnswer[2][0]) {
    continent.classList.add("success");
  }
  if (subregionPara.innerHTML === correctAnswer[3]) {
    subregion.classList.add("success");
  }
  if (
    parseFloat(populationPara.innerHTML.replace(/,/g, "")) < correctAnswer[4]
  ) {
    population.classList.add("higher");
  } else if (
    parseFloat(populationPara.innerHTML.replace(/,/g, "")) > correctAnswer[4]
  ) {
    population.classList.add("lower");
  } else if (
    parseFloat(populationPara.innerHTML.replace(/,/g, "")) == correctAnswer[4]
  ) {
    population.classList.add("success");
  }
  if (parseFloat(sizePara.innerHTML.replace(/,/g, "")) < correctAnswer[5]) {
    size.classList.add("higher");
  } else if (
    parseFloat(sizePara.innerHTML.replace(/,/g, "")) > correctAnswer[5]
  ) {
    size.classList.add("lower");
  } else if (
    parseFloat(sizePara.innerHTML.replace(/,/g, "")) == correctAnswer[5]
  ) {
    size.classList.add("success");
  }
  if (parseInt(bordersPara.innerHTML) > correctAnswer[6].length) {
    borders.classList.add("lower");
  } else if (parseInt(bordersPara.innerHTML) < correctAnswer[6].length) {
    borders.classList.add("higher");
  } else if (parseInt(bordersPara.innerHTML) == correctAnswer[6].length) {
    borders.classList.add("success");
  }
  localStorage.setItem("myAnswers", answers.innerHTML);
}
//Show How to play
howToPlay.addEventListener("click", () => {
  backdropTutorial.style.display = "flex";
});
backdropTutorial.addEventListener("click", () => {
  backdropTutorial.style.display = "none";
}); //Show Coats Of Arms
coatsOfArms.addEventListener("click", () => {
  backdropCoa.style.display = "flex";
});
backdropCoa.addEventListener("click", () => {
  backdropCoa.style.display = "none";
});
//Show Flag
hintFlag.addEventListener("click", () => {
  backdropFlag.style.display = "flex";
});
backdropFlag.addEventListener("click", () => {
  backdropFlag.style.display = "none";
});

let correctAnswer =  JSON.parse(localStorage.getItem("correctAnswer")) || countryInfo[Math.floor(Math.random() * countryInfo.length)];
localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));
imgCoa.src = correctAnswer[7];
modalFlag.src = correctAnswer[0];

let data = localStorage.getItem("myAnswers");
answers.innerHTML = data;

console.log(correctAnswer);

