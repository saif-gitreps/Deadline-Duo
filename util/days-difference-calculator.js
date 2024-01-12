function calculateDaysLeft(endDate) {
   const startDate = new Date();
   const timeDifference = endDate - startDate;
   return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

module.exports = calculateDaysLeft;
