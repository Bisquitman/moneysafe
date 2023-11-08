import { getData } from "./modules/APIHelpers.js";
import { preload } from "./modules/preloader.js";
import { renderReport } from "./modules/renderReport.js";
import { convertStrToNum } from "./modules/util.js";
import { OverlayScrollbars } from "./overlayscrollbars.esm.min.js";

preload.init();

const financeForm = document.querySelector(".finance__form");
const financeAmount = document.querySelector(".finance__amount");
const financeReportBtn = document.querySelector(".finance__report");
const report = document.querySelector(".report");
const reportDates = document.querySelector(".report__dates");

let amount = 0;

financeAmount.textContent = amount;

const closeReport = ({ target }) => {
  if (target.closest(".report__close") || (!target.closest(".report") && target !== financeReportBtn)) {
    gsap.to(report, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete() {
        report.style.visibility = "hidden";
      },
    });

    document.removeEventListener("click", closeReport);
  }
};

const openReport = (e) => {
  report.style.visibility = "visible";
  gsap.to(report, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  document.addEventListener("click", closeReport);
};

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

financeReportBtn.addEventListener("click", async () => {
  const textContent = financeReportBtn.textContent;
  // financeReportBtn.textContent = "Загрузка...";
  financeReportBtn.textContent = "";
  financeReportBtn.style.padding = "0";
  preload.add(financeReportBtn);
  financeReportBtn.disabled = true;

  const data = await getData("api/test");
  console.log("data: ", data);

  financeReportBtn.style = "";
  preload.remove(financeReportBtn);
  financeReportBtn.textContent = textContent;
  financeReportBtn.disabled = false;

  renderReport(data);
  openReport();
});

reportDates.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(reportDates));

  const searchParams = new URLSearchParams();
  if (formData.startDate) {
    searchParams.append("startDate", formData.startDate);
  }
  if (formData.endDate) {
    searchParams.append("endDate", formData.endDate);
  }
  const queryString = searchParams.toString();
  const url = queryString ? `api/test?${queryString}` : "api/test";

  const data = await getData(url);
  renderReport(data);
});

OverlayScrollbars(report, {});
