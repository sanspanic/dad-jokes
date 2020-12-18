console.log("connected");

const retrieveBtn = document.querySelector("#retrieve-btn");
const img = document.querySelector("#img");
const jokePar = document.querySelector("#joke-p");
const NUM_OF_IMGS = 11;
const titleCont = document.querySelector("#title-container");
const jokeCont = document.querySelector("#joke-container");
let currImgNum;

retrieveBtn.addEventListener("click", function () {
  retrieveJoke();
});

async function retrieveJoke() {
  await axios
    .get("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "text/plain",
      },
    })
    .then(function (response) {
      // handle success
      renderJoke(response.data);
      retrieveImg(NUM_OF_IMGS);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

function renderJoke(joke) {
  jokePar.firstElementChild.innerText = joke;
}

function retrieveImg(NUM_OF_IMGS) {
  const imgNum = pickRandNum(NUM_OF_IMGS);
  img.setAttribute("src", `./imgs/dad-${imgNum}.jpeg`);
}

//pick random image number to insert into src, make sure it isn't 0 or previous image number
function pickRandNum(num) {
  let randNum = 0;
  while (randNum === 0 || randNum === currImgNum) {
    randNum = Math.floor(Math.random() * num);
  }
  currImgNum = randNum;
  return randNum;
}
