import { words } from "./words.js";

const langRuBtn = document.getElementById("ru");
const langEnBtn = document.getElementById("en");
let lang = true; // true - en-ru, false - ru-en

const wordScreen = document.getElementById("word");
const info = document.getElementById("info");
const answer = document.getElementById("answer");
const checkBtn = document.getElementById("check");
const tipBtn = document.getElementById("tip");

let wordList = [];
let count = 0;

function setUp() {
  count = 0;
  wordList = [];
  for (let i = 0; i < words.length; i++) {
    let word = words[Math.floor(Math.random() * words.length)];
    if (wordList.filter((w) => w.en === word.en).length > 0) {
      i--;
      continue;
    }
    wordList[i] = word;
  }
  displayWord(count);
}

function displayWord(number) {
  if (number >= wordList.length) {
    setUp();
    return;
  }
  wordScreen.innerText = lang ? wordList[number].en : wordList[number].ru;
}

function checkAnswer() {
  if (answer.value === (lang ? wordList[count].ru : wordList[count].en)) {
    info.innerText = "CORRECT";
    info.classList.add("correct");
    displayWord(++count);
  } else {
    info.innerText = "WRONG";
    info.classList.add("wrong");
  }
  answer.value = "";
  removeInfo();
}

function removeInfo() {
  setTimeout(() => {
    info.classList.remove("wrong");
    info.classList.remove("correct");
    info.innerText = "";
  }, 300);
}

function switchLanguage() {
  langRuBtn.disabled = !lang;
  langEnBtn.disabled = lang;
  lang = !lang;
  count++;
  displayWord(count);
}

document.addEventListener("DOMContentLoaded", setUp);
checkBtn.addEventListener("click", checkAnswer);
langRuBtn.addEventListener("click", switchLanguage);
langEnBtn.addEventListener("click", switchLanguage);
