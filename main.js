const clock = document.querySelector(".clock");

function getTime() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);

const QUOTE_LIST = "quoteList";

function getQuotes() {
  const quotes = document.querySelector(".quotes");
  let savedQuotes = localStorage.getItem(QUOTE_LIST);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTE_LIST,
      JSON.stringify(["철저하게 살지 않으면, 처절하게 살아가야 한다."])
    );

    savedQuotes = localStorage.getItem(QUOTE_LIST);
  }

  let parsedQuotes = JSON.parse(savedQuotes);

  quotes.innerText =
    parsedQuotes[Math.floor(Math.random() * parsedQuotes.length)];
}

getQuotes();

function onClickQuotes() {
  const quotes = document.querySelector(".quotes");
  const newQuote = document.querySelector(".new-quote");

  quotes.style.display = "none";
  newQuote.style.display = "block";
}

function onClickNewQuote() {
  const quotes = document.querySelector(".quotes");
  const newQuote = document.querySelector(".new-quote");
  const newQuoteInput = document.querySelector(".new-quote-input");

  if (!newQuoteInput.value) return;

  let savedQuotes = localStorage.getItem(QUOTE_LIST);
  let parsedQuotes = JSON.parse(savedQuotes);

  parsedQuotes.push(newQuoteInput.value);

  localStorage.setItem(QUOTE_LIST, JSON.stringify(parsedQuotes));

  quotes.innerText = newQuoteInput.value;
  newQuoteInput.value = "";

  quotes.style.display = "block";
  newQuote.style.display = "none";
}

async function getNft() {
  const nftImg = document.querySelector(".nft-img");
  const nftTitle = document.querySelector(".nft-name");
  const nftDesc = document.querySelector(".nft-desc");

  const response = await axios.get(
    "https://olbm.mypinata.cloud/ipfs/Qma5yLvGdS1CYF78aK9YQKezwk9ia3SWzZsrhSPSQs4nDC"
  );

  nftImg.src = response.data.image;
  nftTitle.innerText = response.data.name;
  nftDesc.innerText = response.data.description;
}

getNft();
