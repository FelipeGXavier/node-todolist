export function formatDate(date) {
  date = convertDateToUTC(new Date(date));
  const day = date.getDate();
  let month = date.getMonth() + 1;
  month = month.toString().length == 1 ? `0${month}` : month;
  const year = date.getFullYear();
  const formatedDate = `${day}/${month}/${year}`;
  return formatedDate;
}

function convertDateToUTC(date) {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
}
