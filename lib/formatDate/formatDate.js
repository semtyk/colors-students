//Функция для форматирования даты в РУ формат ДД/ММ/ГГ ЧЧ:ММ

export const formatDateToRu = (dateObject) => {
    let minutes = dateObject.getMinutes();
    let months = dateObject.getMonth() + 1;
    let years = dateObject.getFullYear() - 2000;
    let days = dateObject.getDate();
    if (days < 10) {
        days = "0" + days;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (months < 10) {
        months = "0" + months;
    }
    const outDate = days + '/' + months + '/' + years + '  ' + dateObject.getHours() + ':' + minutes;
    return outDate;
}

//Функция для форматирования даты в US формат ММ-ДД-ГГГГ ЧЧ:ММ

export const formatDateToUs = (dateObject) => {
    let minutes = dateObject.getMinutes();
    let months = dateObject.getMonth() + 1;
    let years = dateObject.getFullYear() - 2000;
    let days = dateObject.getDate();
    if (days < 10) {
        days = "0" + days;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (months < 10) {
        months = "0" + months;
    }
    const outDate = months + '/' + days + '/' + years + '  ' + dateObject.getHours() + ':' + minutes;
    return outDate;
}

