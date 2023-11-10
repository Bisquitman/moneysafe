import { preload } from "./preloader.js";
import { deleteData, getData } from "./service.js";
import { OverlayScrollbars } from "../overlayscrollbars.esm.min.js";
import { formatDate, typesOperation } from "./helpers.js";
import { storage } from "../storage.js";

const financeReportBtn = document.querySelector(".finance__report");
const report = document.querySelector(".report");
const reportDates = document.querySelector(".report__dates");
const reportOperationList = document.querySelector(".report__operation-list");
const reportTable = document.querySelector(".report__table");

preload.init();

OverlayScrollbars(report, {});

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

const renderReport = (data) => {
  reportOperationList.textContent = "";

  const reportRows = data.map((operation) => {
    const reportRow = document.createElement("tr");
    reportRow.className = "report__row";
    reportRow.innerHTML = `
      <td class="report__cell">${operation.category}</td>
      <td class="report__cell" style="text-align:end;">${operation.amount.toLocaleString()}&nbsp;&#8381;</td>
      <td class="report__cell">${operation.description}</td>
      <td class="report__cell">${formatDate(operation.date)}</td>
      <td class="report__cell">${typesOperation[operation.type]}</td>
      <td class="report__action-cell">
        <button class="report__button report__button_table" data-del="${operation.id}">&#10006;</button>
      </td>
    `;
    return reportRow;
  });

  reportOperationList.append(...reportRows);
};

export const reportController = () => {
  reportTable.addEventListener("click", async ({ target }) => {
    const targetSort = target.closest("[data-sort]");
    const targetDel = target.closest("[data-del]");

    if (targetSort) {
      const sortField = targetSort.dataset.sort;
      renderReport(
        [...storage.data].sort((a, b) => {
          if (targetSort.dataset.direction === "up") {
            [a, b] = [b, a];
          }

          if (sortField === "amount") {
            return parseFloat(a[sortField]) < parseFloat(b[sortField]) ? -1 : 1;
          } else {
            return a[sortField] < b[sortField] ? -1 : 1;
          }
        }),
      );
      if (targetSort.dataset.direction === "up") {
        targetSort.dataset.direction = "down";
      } else {
        targetSort.dataset.direction = "up";
      }
    }

    if (targetDel) {
      console.log(targetDel.dataset.del); //   todo Delete row
      await deleteData(targetDel.dataset.del);
      const data = await getData("finance");
      renderReport(data);
    }
  });

  financeReportBtn.addEventListener("click", async () => {
    const textContent = financeReportBtn.textContent;
    // financeReportBtn.textContent = "Загрузка...";
    financeReportBtn.textContent = "";
    financeReportBtn.style.padding = "0";
    preload.add(financeReportBtn);
    financeReportBtn.disabled = true;

    const data = await getData("finance");
    storage.data = data;

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
    const url = queryString ? `finance?${queryString}` : "finance";

    const data = await getData(url);
    renderReport(data);
  });
};
