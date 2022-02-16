/**
 * Appends a zero to the single digit date numbers.
 *
 * @param   {Number}  n
 *
 * @returns  {Number}     [return description]
 */

const appendLeadingZeroes = n => {
  if (n <= 9) {
    return `0${n}`;
  }

  return n;
};

/**
 * Formats the given date in the form (YYYY-MM-DD).
 * @param {Date} date
 * @returns {String}
 */

export const formatDate = (date, format = 'mm-dd-yyyy') => {
  const temp = new Date(date);
  const newDate = new Date(temp.getTime() + temp.getTimezoneOffset() * 60000);

  switch (format) {
    case 'mm-dd-yyyy':
      return `${appendLeadingZeroes(
        newDate.getMonth() + 1
      )}-${appendLeadingZeroes(newDate.getDate())}-${newDate.getFullYear()}`;
    case 'yyyy-mm-dd':
      return `${newDate.getFullYear()}-${appendLeadingZeroes(
        newDate.getMonth() + 1
      )}-${appendLeadingZeroes(newDate.getDate())}`;
    default:
      return `${appendLeadingZeroes(
        newDate.getMonth() + 1
      )}-${appendLeadingZeroes(newDate.getDate())}-${newDate.getFullYear()}`;
  }
};

/**
 * Subtracts the date from today to the specified date in the past.
 *
 * @param {String} date
 * @param {Number} n
 * @returns {String}
 */
export const subtractMonth = function(date, n) {
  const dateObj = new Date(date);
  const currentMonth = dateObj.getMonth() + 1;
  if (currentMonth <= n) {
    const calculatedLastDate = new Date(
      `${dateObj.getFullYear() - 1}-${12 -
        (n - currentMonth)}-${dateObj.getDate()}`
    );
    return formatDate(calculatedLastDate, 'yyyy-mm-dd');
  }
  const lastDate = new Date(
    `${dateObj.getFullYear()}-${dateObj.getMonth() +
      1 -
      n}-${dateObj.getDate()}`
  );
  return formatDate(lastDate, 'yyyy-mm-dd');
};

/**
 * Gives today's date.
 * @returns {String}
 */

export const getToday = function() {
  const today = new Date();

  return formatDate(today, 'yyyy-mm-dd');
};

/**
 * Formats the given date in the DD-MM-YYYY HH-mm.
 *
 * @param  {Date} date
 */
export const formatDateTime = function(date) {
  const newDate = new Date(date);
  let res = '';

  res += appendLeadingZeroes(newDate.getMonth() + 1);
  res += '-';
  res += appendLeadingZeroes(newDate.getDate());
  res += '-';
  res += appendLeadingZeroes(newDate.getFullYear());
  res += ' ';
  res += appendLeadingZeroes(
    newDate.getHours() > 12 ? newDate.getHours() - 12 : newDate.getHours()
  );
  res += ':';
  res += appendLeadingZeroes(newDate.getMinutes());
  res += ` ${newDate.getHours()}` > 11 ? ' PM' : ' AM';

  return res;
};

/**
 * Converts the date from date picker in the format required by the backend.
 *
 * @param {String} pickerDate
 */
export const getIsoString = pickerDate => {
  if (!pickerDate) {
    return null;
  }
  const today = new Date().toISOString();
  const newDate = today.split('T');
  newDate[0] = pickerDate;
  return newDate.join('T');
};
