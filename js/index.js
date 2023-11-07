import { convertStrToNum } from './modules/convertStrToNum.js';
import { preload } from './modules/preloader.js';
import { OverlayScrollbars } from './overlayscrollbars.esm.min.js';

preload.init();

const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const financeReportBtn = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportClose = report.querySelector('.report__close');
let amount = 0;

financeAmount.textContent = amount;

const closeReport = (e) => {
  if (!e.target.closest('.report') || e.target === reportClose) {
    report.classList.remove('report_open');
    // report.style.display = '';
    document.removeEventListener('click', closeReport);
  }
};

const openReport = (e) => {
  if (e.target === financeReportBtn) {
    report.classList.add('report_open');
    // report.style.display = 'block';
    document.addEventListener('click', closeReport);
  }
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

  financeAmount.textContent = amount === 0 ? 0 : `${amount.toLocaleString(((amount + Number.EPSILON) * 100) / 100)} р.`;
});

document.addEventListener('click', openReport);

OverlayScrollbars(report, {});