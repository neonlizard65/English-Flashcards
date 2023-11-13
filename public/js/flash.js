let card = document.getElementById("card");
let correctBox = document.getElementById("correctBox");
let cardNumber = document.getElementById("number");
let nextBtn = document.getElementById("nextBtn");
let currentCard;
let cardIterator;
let unusedNumbers = [];

let cardCount = 1;
let correctCount = 0;

const WORD = 0;
const TRANSLATION = 1;

fetch("data/words.json")
    .then((res) => res.text())
    .then((data) => callbackWrite(data));

let wordsMap = new Map();

function callbackWrite(json) {
    let data = JSON.parse(json);
    for (let object of data) {
        wordsMap.set(object["Word"], object["Translation"]);
    }
    for (let i = 1; i < wordsMap.size + 1; i++) {
        unusedNumbers.push(i);
    }
    setCardContent();
}


function revealCard() {
    card.innerHTML = (card.innerHTML == currentCard[WORD]) ? currentCard[TRANSLATION] : currentCard[WORD];
}

function nextCard() {
    if (cardCount == wordsMap.size) {
        document.location.href = "result";
        sessionStorage.setItem("result", `${correctCount}/${cardCount}`);
    }
    else {
        if (cardCount == wordsMap.size - 1) {
            nextBtn.innerHTML = "Закончить";
        }
        if (correctBox.checked) {
            correctCount += 1;
            console.log(correctCount);
        }
        correctBox.checked = false;
        cardCount += 1;
        setCardContent();
    }
}

function setCardContent() {
    let randomNum = 0;
    do {
        randomNum = Math.floor(Math.random() * wordsMap.size);
    } while (!unusedNumbers.includes(randomNum) && unusedNumbers.length > 1);

    unusedNumbers = unusedNumbers.filter(num => num !== randomNum);

    console.log(unusedNumbers);

    cardIterator = wordsMap.entries();
    currentCard = [...cardIterator][randomNum];
    card.innerHTML = currentCard[WORD];
    cardNumber.innerHTML = `${cardCount}/${wordsMap.size}`;
}