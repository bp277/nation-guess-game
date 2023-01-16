import { Answer } from "./answer.js";

const input = document.querySelector("#input");
const answers = document.querySelector(".answers");
const searchList = document.querySelector(".search-list");
const selectedCountry = document.querySelector(".list-item-selected");
const backdrop = document.querySelector(".backdrop");
const backdropCoa = document.querySelector(".backdrop-coa");
const backdropFlag = document.querySelector(".backdrop-flag");
const howToPlay = document.querySelector(".htp");
const backdropTutorial = document.querySelector(".backdrop-tutorial");
const correctName = document.querySelector(".correct-name");
const status = document.querySelector(".status");
const correctFlag = document.querySelector(".correct-flag");
const newGame = document.querySelector(".new-game");
const newGameUI = document.querySelector(".new-game-ui");
const coatsOfArms = document.querySelector(".coa");
const hintFlag = document.querySelector(".flag-h3");
const imgCoa = document.querySelector(".img-coa");
const modalFlag = document.querySelector(".img-flag");

// Fetch country data
async function getCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((res) => res.json());
}

const fetchedCountries = await getCountries();
const allCountries = fetchedCountries.filter((c) => c.unMember == true);

let id = null;
let guessNumber = 0;

let countryInfo = [];

for (let i = 0; i < allCountries.length; i++) {
  countryInfo.push([
    allCountries[i].flags.png,
    allCountries[i].name.common,
    allCountries[i].continents,
    allCountries[i].subregion,
    allCountries[i].population,
    allCountries[i].area,
    allCountries[i].borders == undefined
      ? (allCountries[i].borders = [])
      : allCountries[i].borders,
    allCountries[i].coatOfArms.png,
  ]);
}

//Searching and Submiting answer
input.addEventListener("keyup", () => {
  // Creating list of search results
  const inputValue = input.value;

  const filtered = countryInfo.filter((c) =>
    c[1].toLowerCase().startsWith(inputValue.toLowerCase())
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

function selectCountry(e) {
  for (let i = 0; i < countryInfo.length; i++) {
    if (e.target.innerHTML === allCountries[i].name.common) {
      new Answer(
        allCountries[i].flags.png,
        allCountries[i].name.common,
        allCountries[i].continents[0],
        allCountries[i].subregion,
        allCountries[i].population,
        allCountries[i].area,
        allCountries[i].borders.length
      );

      createAnswer(
        allCountries[i].flags.png,
        allCountries[i].name.common,
        allCountries[i].continents[0],
        allCountries[i].subregion,
        allCountries[i].population
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        allCountries[i].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " km²",
        allCountries[i].borders.length
      );

      // Open modal and end the game when answer is correct or when the user exceeds the limited number of guesses
      if (e.target.innerHTML === correctAnswer[1]) {
        backdrop.style.display = "flex";
        status.textContent = "You Win";
        correctName.textContent = correctAnswer[1];
        correctFlag.src = correctAnswer[0];
        input.disabled = true;
      } else if (answers.childNodes.length == 8) {
        backdrop.style.display = "flex";
        status.textContent = "Game Over";
        correctName.textContent = correctAnswer[1];
        correctFlag.src = correctAnswer[0];
        input.disabled = true;
      }
    }
    input.value = "";
    searchList.innerHTML = "";
    setTimeout(function() {
      searchList.scrollIntoView();
    },500)  }
}

function selectCountryEnterKey(answ) {
  for (let i = 0; i < countryInfo.length; i++) {
    if (answ === allCountries[i].name.common) {
      new Answer(
        allCountries[i].flags.png,
        allCountries[i].name.common,
        allCountries[i].continents[0],
        allCountries[i].subregion,
        allCountries[i].population,
        allCountries[i].area,
        allCountries[i].borders.length
      );

      createAnswer(
        allCountries[i].flags.png,
        allCountries[i].name.common,
        allCountries[i].continents[0],
        allCountries[i].subregion,
        allCountries[i].population
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        allCountries[i].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
          " km²",
        allCountries[i].borders.length
      );

      // Open modal and end the game when answer is correct or when the user exceeds the limited number of guesses
      if (answ === correctAnswer[1]) {
        backdrop.style.display = "flex";
        status.textContent = "You Win";
        correctName.textContent = correctAnswer[1];
        correctFlag.src = correctAnswer[0];
        input.disabled = true;
      } else if (answers.childNodes.length == 8) {
        backdrop.style.display = "flex";
        status.textContent = "Game Over";
        correctName.textContent = correctAnswer[1];
        correctFlag.src = correctAnswer[0];
        input.disabled = true;
      }
    }
    input.value = "";
    searchList.innerHTML = "";
    searchList.scrollIntoView();
  }
}

// Show/hide search results based on input value
$("#input").on("input", function () {
  $(this).val() === "" ? $(".search-list").hide() : $(".search-list").show();
});

// Keyboard navigation for country list
window.displayBoxIndex = -1;

$("#input").keyup(function (e) {
  if (e.keyCode == 40) {
    Navigate(1);
  }
  if (e.keyCode == 38) {
    Navigate(-1);
  }
  if (e.keyCode == 13) {
    e.preventDefault();
    Navigate(0);
    selectCountryEnterKey($(".list-item-selected")[0].innerHTML);
  }
});

var Navigate = function (diff) {
  displayBoxIndex += diff;
  var oBoxCollection = $(".list-item");
  if (displayBoxIndex >= oBoxCollection.length) displayBoxIndex = 0;
  if (displayBoxIndex < 0) displayBoxIndex = oBoxCollection.length - 1;
  var cssClass = "list-item-selected";
  oBoxCollection.removeClass(cssClass).eq(displayBoxIndex).addClass(cssClass);
  $("#input").keyup(function (e) {
    if (e.keyCode == 13) {
      displayBoxIndex = -1;
    }
  });
};

newGame.addEventListener("click", () => {
  location.reload();
  id = null;
  localStorage.clear();
});
newGameUI.addEventListener("click", () => {
  location.reload();
  id = null;
  localStorage.clear();
});

if (searchList) {
  searchList.addEventListener("click", selectCountry);
}

//Creating and appending the answer

function createAnswer(flg, name, cont, subreg, pop, siz, bord) {
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
  const countryName = document.createElement("div");
  flag.appendChild(countryName);
  countryName.textContent = name

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

  localStorage.setItem("guessNum", answers.childNodes.length);
  input.placeholder = `${answers.childNodes.length} of 8`;

  answers.childNodes.length === 8 ? (newGameUI.style.display = "block") : false;
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
backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
});

let correctAnswer =
  JSON.parse(localStorage.getItem("correctAnswer")) ||
  countryInfo[Math.floor(Math.random() * countryInfo.length)];
localStorage.setItem("correctAnswer", JSON.stringify(correctAnswer));
imgCoa.src = correctAnswer[7];
modalFlag.src = correctAnswer[0];
newGameUI.style.display = "block";

let data = localStorage.getItem("myAnswers");
let guessData = localStorage.getItem("guessNum");
input.placeholder = `${guessData ? guessData : 0} of 8`;

answers.innerHTML = data;
