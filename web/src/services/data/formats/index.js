export const dateFormat = (date) => {
    let d = new Date(date);

    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = '0' + month;
    }

    let format = day + '.' + month + '.' + year;
    return format;
};