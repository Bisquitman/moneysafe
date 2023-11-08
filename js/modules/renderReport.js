import { formatDate, typesOperation } from './util.js';

export const renderReport = (data) => {
  const reportOperationList = document.querySelector('.report__operation-list');

  reportOperationList.textContent = '';
  // preload.add(reportOperationList);

  const reportRows = data.map((operation) => {
    const reportRow = document.createElement('tr');
    reportRow.className = 'report__row';
    reportRow.innerHTML = `
      <td class="report__cell">${operation.category}</td>
      <td class="report__cell" style="text-align:end;">${operation.amount.toLocaleString()}&nbsp;&#8381;</td>
      <td class="report__cell">${operation.description}</td>
      <td class="report__cell">${formatDate(operation.date)}</td>
      <td class="report__cell">${typesOperation[operation.type]}</td>
      <td class="report__action-cell">
        <button class="report__button report__button_table">&#10006;</button>
      </td>
    `;
    return reportRow;
  });

  reportOperationList.append(...reportRows);

  // preload.remove(reportOperationList);
};
