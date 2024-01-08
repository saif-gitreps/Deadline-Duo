const db = require("../data/database");

function getDeadlinePage(req, res) {
   res.render("deadline-page");
}

module.exports = {
   getDeadlinePage: getDeadlinePage,
};
