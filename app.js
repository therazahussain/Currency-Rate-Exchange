const BASE_URL =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert";

const dropDown = document.querySelectorAll("select");
const inputVal = document.querySelector("input");
const convertFrom = document.querySelector(".from select");
const convertTo = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");
const toImage = document.querySelector("#toImage");
const fromImage = document.querySelector("#fromImage");

for (let select of dropDown) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
}

let changeFrom = "USD";
let changeTo = "INR";

const getChangeRateMessage = async () => {
  let amount = inputVal.value;
  try {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "af77ffab68msh7829a5b5d1170ecp1e973djsna9837e0ad4ff",
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `${BASE_URL}?from=${changeFrom}&to=${changeTo}&amount=${amount}`,
      options
    );
    const data = await response.json();
    newMessage = `${amount} ${changeFrom} = ${data.result} ${changeTo}`;
    msg.innerText = newMessage;
    btn.disabled = false;
    btn.innerText = "Get Exchange Rate";
    msg.style.display = ""
  } catch (error) {
    btn.disabled = false;
    btn.innerText = "Get Exchange Rate";
    alert(error.message);
  }
};

const changeFlag = (flagCode) => {
  const countryCode = countryList[flagCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  return newSrc;
};

convertFrom.addEventListener("change", (e) => {
  changeFrom = e.target.value;
  let nsrc = changeFlag(e.target.value);
  console.log(nsrc);
  fromImage.src = nsrc;
});

convertTo.addEventListener("change", (e) => {
  changeTo = e.target.value;
  let nsrc = changeFlag(e.target.value);
  toImage.src = nsrc;
});

btn.addEventListener("click", (e) => {
  btn.disabled = true;
  btn.innerText = "Getting Exchange Rate";
  e.preventDefault();
  getChangeRateMessage();
});

window.addEventListener("load", () => {
  getChangeRateMessage();
});