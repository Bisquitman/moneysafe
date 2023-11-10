import {financeController} from "./modules/financeControler.js";
import {reportController} from "./modules/reportController.js";
import {datalistController} from "./modules/datalistController.js";

const init = () => {
  financeController();
  reportController();
  datalistController();
};

init();