import {financeController} from "./modules/financeControler.js";
import {reportController} from "./modules/reportController.js";

const init = () => {
  financeController();
  reportController();
};

init();