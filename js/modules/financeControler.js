import {convertStrToNum} from "./helpers.js";

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");

let amount = 0;

financeAmount.textContent = amount;

export const financeController = () => {
  financeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const typeOperation = e.submitter.dataset.typeOperation;

    const changeAmount = Math.abs(convertStrToNum(financeForm.amount.value));

    if (typeOperation === "income") {
      amount += changeAmount;
    }

    if (typeOperation === "expenses") {
      amount -= changeAmount;

      if (amount <= 0) {
        amount = 0;
      }
    }
    console.log("amount: ", amount);

    financeAmount.textContent = amount === 0 ? 0 : `${amount.toLocaleString(((amount + Number.EPSILON) * 100) / 100)} р.`;
  });
}