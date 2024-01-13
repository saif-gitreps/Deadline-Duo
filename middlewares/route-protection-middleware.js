function protectRoute(req, res, next) {
   if (!res.locals.isAuthenticated) {
      res.redirect("/401");
   } else {
      next();
   }
}

module.exports = protectRoute;
