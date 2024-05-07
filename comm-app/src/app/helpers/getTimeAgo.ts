/*
  This helper function returns a string saying "--" seconds ago and so on until the date is over 14 days ago,
  then it just displays the date in DD/MM/YY format. 
*/
function getTimeAgo(timestamp: string, language: string) {
  // Create a Date object from the timestamp string
  const date = new Date(timestamp);

  const currentTimestamp = Date.now();
  const timeDiff = currentTimestamp - date.getTime();

  // Define a function to pad single digit numbers with leading zero
  const padWithZero = (num: number) => (num < 10 ? "0" + num : num);

  // Format the date as DD/MM/YY
  const formattedDate = `${padWithZero(date.getDate())}/${padWithZero(
    date.getMonth() + 1
  )}/${date.getFullYear().toString().slice(-2)}`;

  if (language === "EN") {
    if (timeDiff < 60000) {
      const seconds = Math.floor(timeDiff / 1000);
      return seconds + ` second${seconds !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < 3600000) {
      const minutes = Math.floor(timeDiff / 60000);
      return minutes + ` minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < 86400000) {
      const hours = Math.floor(timeDiff / 3600000);
      return hours + ` hour${hours !== 1 ? "s" : ""} ago`;
    } else if (timeDiff < 1209600000) {
      // 14 days in milliseconds
      const days = Math.floor(timeDiff / 86400000);
      return days + ` day${days !== 1 ? "s" : ""} ago`;
    } else {
      return formattedDate;
    }
  } else if (language === "KR") {
    if (timeDiff < 60000) {
      const seconds = Math.floor(timeDiff / 1000);
      return seconds + `초 전`;
    } else if (timeDiff < 3600000) {
      const minutes = Math.floor(timeDiff / 60000);
      return minutes + `분 전`;
    } else if (timeDiff < 86400000) {
      const hours = Math.floor(timeDiff / 3600000);
      return hours + `시간 전`;
    } else if (timeDiff < 1209600000) {
      // 14 days in milliseconds
      const days = Math.floor(timeDiff / 86400000);
      return days + `일 전`;
    } else {
      return formattedDate;
    }
  }
}

export default getTimeAgo;
