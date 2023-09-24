
const GAME_TiME = 7;
let score = 0;
let time = GAME_TiME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');
//console.log(wordInput);

init();

function init(){
    buttonChange("Game loading ...")
    getWords();
    wordInput.addEventListener('input', checkMatch);
}

// 게임 실행
function run(){
    if (isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TiME;
    wordInput.focus();
    timeInterval = 0;
    timeInterval = setInterval(countDown, 2000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange("Game running ...");
}

function checkStatus(){
    if (!isPlaying && time === 0){
        buttonChange("Game Start");
        clearInterval(checkInterval);
        //clearInterval(timeInterval);
    }
}

// 단어 불러오기
function getWords(){
    // https://random-word-api.herokuapp.com/word?number=100

    // Make a request for a user with a given ID
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            // handle success
            // console.log(response.data);
            // words = response.data;
            response.data.forEach((word) => {
                if (word.length < 10){
                    words.push(word);
                }
            })
            buttonChange("Game Start");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        }
    )

    // words = ['Hello','Banana','Apple','Cherry','tomato'];
    // buttonChange('Game Start');
}

// 단어 일치 체크 
function checkMatch(){
    //console.log(wordInput.value.toLowerCase());
    if( wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase() ){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TiME;
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

function countDown(){
    time > 0 ? time -- : isPlaying = false;
    if (!isPlaying){
        clearInterval(timeInterval);
        //alert("Time Out !!")
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text === 'Game Start' ? button.classList.remove('loading') : button.classList.add('loading');
}