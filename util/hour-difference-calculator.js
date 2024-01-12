function calculateHoursLeft(endDate) {
   const startDate = new Date();
   const timeDifference = endDate - startDate;
   return Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
}

module.exports = calculateHoursLeft;
