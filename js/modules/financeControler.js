import { animationNumbers, convertStrToNum } from "./helpers.js";
import { getData, postData } from "./service.js";
import { preload } from "./preloader.js";
import { storage } from "../storage.js";

const financeForm = document.querySelector(".finance__form");
export const financeAmount = document.querySelector(".finance__amount");
const financeContainer = document.querySelector('.finance > .container')

let amount = 0;

financeAmount.textContent = amount;

const newOperation = async (e) => {
  e.preventDefault();
  const typeOperation = e.submitter.dataset.typeOperation;

  const financeFormData = Object.fromEntries(new FormData(financeForm));
  financeFormData.type = typeOperation;

  const operationNew = await postData("finance", financeFormData);

  const changeAmount = Math.abs(convertStrToNum(operationNew.amount));

  if (typeOperation === "income") {
    amount += changeAmount;
  }

  if (typeOperation === "expenses") {
    amount -= changeAmount;

    // if (amount <= 0) {
    //   amount = 0;
    // }
  }
  // financeAmount.textContent = amount === 0 ? 0 : `${(((amount + Number.EPSILON) * 100) / 100).toLocaleString("RU-ru")} р.`;
  // financeAmount.textContent = `${(((amount + Number.EPSILON) * 100) / 100).toLocaleString("RU-ru")} р.`;
  animationNumbers(financeAmount, amount);
  financeForm.reset();
};

export const financeController = async () => {
  preload.add(financeContainer);
  document.querySelector('.preload').style.cssText = `
    border-radius: 30px;
  `;

  const operations = await getData("finance");

  amount = operations.reduce((acc, item) => {
    if (item.type === "income") {
      acc += convertStrToNum(item.amount);
    }

    if (item.type === "expenses") {
      acc -= convertStrToNum(item.amount);
    }

    return acc;
  }, 0);

  storage.amount = amount;

  preload.remove(financeContainer);

  animationNumbers(financeAmount, amount);

  financeForm.addEventListener("submit", newOperation);
};
