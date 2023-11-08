import { getData } from './modules/APIHelpers.js';
import { preload } from './modules/preloader.js';
import { renderReport } from './modules/renderReport.js';
import { convertStrToNum } from './modules/util.js';
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';

preload.init();

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const financeReportBtn = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportDates = document.querySelector('.report__dates');

let amount = 0;

financeAmount.textContent = amount;

const closeReport = ({ target }) => {
  if (
    target.closest('.report__close') ||
    (!target.closest('.report') && target !== financeReportBtn)
  ) {
    report.classList.remove('report_open');
    document.removeEventListener('click', closeReport);
  }
};

const openReport = (e) => {
  report.classList.add('report_open');
  document.addEventListener('click', closeReport);
};

financeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const typeOperation = e.submitter.dataset.typeOperation;

  const changeAmount = Math.abs(convertStrToNum(financeForm.amount.value));

  if (typeOperation === 'income') {
    amount += changeAmount;
  }

  if (typeOperation === 'expenses') {
    amount -= changeAmount;

    if (amount <= 0) {
      amount = 0;
    }
  }
  console.log('amount: ', amount);

  financeAmount.textContent =
    amount === 0
      ? 0
      : `${amount.toLocaleString(((amount + Number.EPSILON) * 100) / 100)} р.`;
});

financeReportBtn.addEventListener('click', async () => {
  openReport();
  preload.add(document.body);
  const data = await getData('api/test');
  console.log('data: ', data);
  renderReport(data);
  preload.remove(document.body);
});

reportDates.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(reportDates));

  const searchParams = new URLSearchParams();
  if (formData.startDate) {
    searchParams.append('startDate', formData.startDate);
  }
  if (formData.endDate) {
    searchParams.append('endDate', formData.endDate);
  }
  const queryString = searchParams.toString();
  const url = queryString ? `api/test?${queryString}` : 'api/test';

  const data = await getData(url);
  renderReport(data);
});

OverlayScrollbars(report, {});
