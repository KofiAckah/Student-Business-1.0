// export function extractTime(dateString) {
//   const date = new Date(dateString);
//   const day = date.getDate();
//   const monthNames = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const month = monthNames[date.getMonth()];
//   const year = date.getFullYear();
//   let hours = date.getHours();
//   const minutes = padZero(date.getMinutes());
//   const ampm = hours >= 12 ? "pm" : "am";
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   const daySuffix = getDaySuffix(day);

//   const dateOnly = `${day}${daySuffix} ${month}, ${year}`;
//   const timeOnly = `${hours}:${minutes}${ampm}`;
//   return `${dateOnly} at ${timeOnly}`;
// }

export function dateOnly(dateString) {
  const date = new Date(dateString);
  const dayOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = dayOfWeekNames[date.getDay()];
  const day = date.getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const daySuffix = getDaySuffix(day);
  return `${dayOfWeek}, ${day}${daySuffix} ${month}, ${year}`;
}

export function timeOnly(dateString) {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = padZero(date.getMinutes());
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours}:${minutes}${ampm}`;
}

function padZero(number) {
  return number.toString().padStart(2, "0");
}

function getDaySuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
