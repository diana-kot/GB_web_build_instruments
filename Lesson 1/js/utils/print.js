const resultParagraph = document.getElementById('output');

function printError(errorText) {
    resultParagraph.innerHTML = `
        <span style="color: red;">
            ${errorText}
        </span>
    `
}

function printDateDiff({years, months, days}) {
    resultParagraph.innerHTML = `
        Годы: ${years}
        Месяцы: ${months}
        Дни: ${days}
    `
}

export {printDateDiff, printError}