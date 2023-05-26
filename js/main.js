import { Answer } from "./answer.js";

const input = document.querySelector("#input");
const answers = document.querySelector(".answers");
const searchList = document.querySelector(".search-list");
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
const imgCoa = document.querySelector(".img-coa");
const modalFlag = document.querySelector(".img-flag");

// Fetch country data
async function getCountries() {
  return fetch("https://restcountries.com/v3.1/all").then((res) => res.json());
}

const fetchedCountries = await getCountries();
const allCountries = fetchedCountries.filter((c) => c.unMember == true);

let id = null;

let wonToday = "false";
let lostToday = "false";

let countryInfo = [];

function userWonContent() {
  status.textContent = "Congrats!";
  correctName.textContent = correctAnswer[1];
  correctFlag.src = correctAnswer[0];
  localStorage.setItem("wonToday", "true");
}

function userLostContent() {
  status.textContent = "So Close...";
  correctName.textContent = correctAnswer[1];
  correctFlag.src = correctAnswer[0];
  localStorage.setItem("lostToday", "true");
}

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
  countryInfo.sort();
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
        allCountries[i].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        allCountries[i].borders.length
      );

      // Open modal and end the game when answer is correct or when the user exceeds the limited number of guesses
      if (e.target.innerHTML === correctAnswer[1]) {
        backdrop.style.display = "flex";
        userWonContent();
        input.disabled = true;
        localStorage.setItem("inputDisabled", true);
      } else if (answers.childNodes.length == 8) {
        backdrop.style.display = "flex";
        userLostContent();
        input.disabled = true;
        localStorage.setItem("inputDisabled", true);
      }
    }
    input.value = "";
    searchList.innerHTML = "";

    answers.scrollIntoView();
    answers.scrollTop = answers.scrollHeight;
  }
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
        allCountries[i].area.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        allCountries[i].borders.length
      );

      // Open modal and end the game when answer is correct or when the user exceeds the limited number of guesses
      if (answ === correctAnswer[1]) {
        backdrop.style.display = "flex";
        userWonContent();
        input.disabled = true;
        localStorage.setItem("inputDisabled", true);
      } else if (answers.childNodes.length == 8) {
        backdrop.style.display = "flex";
        userLostContent();
        input.disabled = true;
        localStorage.setItem("inputDisabled", true);
      }
    }
    input.value = "";
    searchList.innerHTML = "";
    answers.scrollIntoView();
    answers.scrollTop = answers.scrollHeight;
  }
}

if (localStorage.getItem("inputDisabled") === "true") {
  input.setAttribute("disabled", "true");
}

localStorage.getItem("wonToday") === "true"
  ? (wonToday = "true")
  : (wonToday = "false");

localStorage.getItem("lostToday") === "true"
  ? (lostToday = "true")
  : (lostToday = "false");

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
  countryName.textContent = name;

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
}

//Show How to play
howToPlay.addEventListener("click", () => {
  backdropTutorial.style.display = "flex";
});
backdropTutorial.addEventListener("click", () => {
  backdropTutorial.style.display = "none";
});
//Show Coats Of Arms
coatsOfArms.addEventListener("click", () => {
  backdropCoa.style.display = "flex";
});
backdropCoa.addEventListener("click", () => {
  backdropCoa.style.display = "none";
});

// Close end game modal on click
backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
});

backdrop.addEventListener("click", () => {
  backdrop.style.display = "none";
});

// Don;t show country list if input is not in focus
window.addEventListener("click", function (e) {
  if (document.querySelector(".input-wrapper").contains(e.target)) {
    searchList.style.display = "block";
  } else {
    searchList.style.display = "none";
  }
});

// Daily country reset
let futureAnswers = [
  75, 64, 170, 85, 32, 54, 61, 29, 6, 17, 89, 14, 19, 57, 55, 5, 70, 97, 10,
  139, 128, 67, 47, 116, 49, 134, 38, 125, 82, 23, 4, 22, 129, 101, 124, 15, 81,
  118, 77, 166, 130, 52, 3, 109, 147, 28, 111, 181, 73, 98, 187, 174, 121, 153,
  48, 80, 74, 11, 168, 12, 62, 185, 142, 115, 108, 25, 138, 88, 160, 93, 179,
  161, 171, 33, 104, 53, 164, 151, 167, 13, 99, 58, 68, 105, 178, 20, 24, 189,
  177, 51, 2, 159, 56, 40, 1, 131, 136, 100, 103, 63, 76, 137, 42, 183, 84, 165,
  36, 83, 65, 110, 140, 133, 37, 0, 46, 135, 191, 173, 117, 96, 71, 41, 90, 27,
  143, 190, 21, 87, 112, 7, 16, 126, 72, 94, 26, 45, 163, 79, 43, 59, 18, 102,
  60, 92, 35, 78, 141, 114, 154, 106, 156, 95, 50, 180, 184, 31, 182, 69, 145,
  146, 169, 186, 122, 9, 66, 107, 120, 30, 113, 148, 127, 192, 8, 175, 34, 149,
  44, 155, 132, 86, 162, 91, 39, 172, 158, 188, 157, 119, 150, 144, 152, 176,
  123
];

const today = new Date();
const currentMonth = today.getMonth();
const currentDay = today.getDate();

let correctAnswer =
  countryInfo[futureAnswers[(currentMonth + currentDay) % futureAnswers.length]];

// Get the number of milliseconds until midnight
var timeUntilMidnight =
  new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 1,
    0,
    0,
    0,
    0
  ) - today;

imgCoa.src = correctAnswer[7];
modalFlag.src = correctAnswer[0];

let data = localStorage.getItem("myAnswers");
let guessData = localStorage.getItem("guessNum");
input.placeholder = `${guessData ? guessData : 0} of 8`;

answers.innerHTML = data;

// Scroll to the last submitted answer on page load
if (answers.childNodes.length > 1) {
  answers.scrollTo({ top: answers.scrollHeight, behavior: "smooth" });
}

// Time until game resets
const countdown = document.querySelector(".countdown");

function setCountdown() {
  let date = new Date(timeUntilMidnight);
  let hours = date.getUTCHours().toString().padStart(2, "0");
  let minutes = date.getUTCMinutes().toString().padStart(2, "0");
  let seconds = date.getUTCSeconds().toString().padStart(2, "0");
  countdown.textContent = `${hours}:${minutes}:${seconds}`;
  timeUntilMidnight -= 1000;
  if (timeUntilMidnight < 0) {
    clearInterval(intervalId);
    location.reload();
  }
}

let intervalId = setInterval(setCountdown, 1000);
setCountdown();

// Show the correct answer if the game has ended
if (wonToday === "true") {
  backdrop.style.display = "flex";
  status.textContent = "Congrats!";
  correctName.textContent = correctAnswer[1];
  correctFlag.src = correctAnswer[0];
}
if (lostToday === "true") {
  backdrop.style.display = "flex";
  status.textContent = "So close...";
  correctName.textContent = correctAnswer[1];
  correctFlag.src = correctAnswer[0];
}