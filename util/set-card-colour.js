function setColor(daysDifference) {
   if (daysDifference <= 2) {
      return "#6B240C";
   } else if (daysDifference < 7) {
      return "#FF9000";
   } else {
      return "#030303";
   }
}

module.exports = setColor;
