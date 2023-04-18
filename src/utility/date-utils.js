import { dateFormats } from '../constants/dateFormats';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getDayOfWeek = (date) => {
  const dayOfWeek = date.getDay();

  return dayOfWeek.isNaN
    ? null
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
};

export const dateTime = (date) => {
  let amPm = 'AM';
  let hour = date.getHours();
  if (hour >= 12) {
    amPm = 'PM';
  }
  if (hour === 0) {
    hour = 12;
  }
  if (hour > 12) {
    hour -= 12;
  }
  if (hour < 10) {
    hour = `0 ${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0 ${minute}`;
  }
  let sec = date.getSeconds();
  if (sec < 10) {
    sec = `0 ${sec}`;
  }

  return `${hour}:${minute} ${amPm}`;
};

export const getFormatedDate = (date, dateFormat) => {
  let formatedDate = '';

  if (date && Object.prototype.toString.call(date) === '[object Date]' && dateFormat) {
    const newdate = new Date(date);
    const monthNmbr = `0${new Date(date).getMonth() + 1}`.slice(-2);
    const weekDay = getDayOfWeek(newdate);
    // eslint-disable-next-line prefer-destructuring
    const month = monthNames[newdate.getMonth()];
    const day = `0${newdate.getDate()}`.slice(-2);
    const year = date.getFullYear();

    switch (dateFormat) {
      case dateFormats.dddd_MM_DD:
        formatedDate = `${weekDay && weekDay.slice(0, 3)} ${monthNmbr}/${day} `;
        break;
      case dateFormats.MM_DD_dddd:
        formatedDate = `${monthNmbr}/${day}/${year}`;
        break;
      case dateFormats.dddd_MMMM_DD:
        formatedDate = `${weekDay}, ${month} ${day}, ${year}`;
        break;
      case dateFormats.DD_MM_dddd:
        formatedDate = `${day} ${month.slice(0, 3)} ${year} ${dateTime(date)}`;
        break;
      default:
        formatedDate = `${month.slice(0, 3)} ${day}, ${year}`;
    }
  }
  return formatedDate;
};

/* export function getTimeSince(timestamp) {
  const date = new Date(timestamp);
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();
  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  let ltime = new Date();
  let localTimeET = ltime.toLocaleString('en-US', { timeZone: 'America/New_York' });
  let lstime = new Date(localTimeET);
  let seconds = Math.floor((lstime - date) / 1000);
  let interval = seconds / 31536000;
  interval = seconds / 86400;
  if (interval > 1) {
    if (Math.floor(interval) > 5) {
      return `Published on ${month + '/' + day + '/' + year}`;
    } else {
      if (Math.floor(interval) > 1) {
        return Math.floor(interval) + ' days ago';
      } else {
        return Math.floor(interval) + ' day ago';
      }
    }
  }
  interval = seconds / 3600;
  if (interval > 1) {
    if (Math.floor(interval) > 1) {
      return Math.floor(interval) + ' hours ago';
    } else {
      return Math.floor(interval) + ' hour ago';
    }
  }
  interval = seconds / 60;
  if (interval > 1) {
    if (Math.floor(interval) > 1) {
      return Math.floor(interval) + ' minutes ago';
    } else {
      return Math.floor(interval) + ' minute ago';
    }
  }
  return Math.floor(seconds) + ' seconds ago';
}

export function isGreaterThan1Week(date) {
  return (
    new Date().getTime() + 1000 * 60 * 60 * 24 * 7 - new Date().getTime() <
    new Date(date).getTime() - new Date().getTime()
  );
}

export function secondsToHms(time) {
  time = Number(time);
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;

  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${minutes}:${seconds}`;
}

export function dateByUserTimezone(date) {
  let dt = new Date(date);

  dt.setTime(dt.getTime() + dt.getTimezoneOffset() * 60 * 1000);

  let offset = -300;
  let estDate = new Date(dt.getTime() + offset * 60 * 1000);

  const formatedDate = getTimeSince(estDate);
  return formatedDate;
}
 */

export function dateFormater(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let day = date.getDate();
  // get month from 0 to 11
  let month = date.getMonth();
  console.log(month);
  // conver month digit to month name
  // eslint-disable-next-line prefer-destructuring
  month = months[month];
  console.log(month);
  const year = date.getFullYear();

  // show date in two digits
  if (day < 10) {
    day = `0${day}`;
  }

  // now we have day, month and year
  // arrange them in the format we want
  return `${month} ${day} ${year}`;
}
