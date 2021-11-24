import { printError, printDateDiff } from '../utils/print.js';
import getDateDiff from '../utils/getDateDiff.js';

const form = document.getElementById("calcDate");

form.onsubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const dateFrom = formData.get("dateFrom");
    const dateTo = formData.get("dateTo");

    if (!dateFrom || !dateTo) {
        printError('Ошибка, заполните оба поля!')

        return
    }

    const dateDiff = getDateDiff(dateFrom, dateTo)

    printDateDiff(dateDiff)
};