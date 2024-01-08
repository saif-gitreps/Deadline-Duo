function protectRoute(req, res, next) {
   if (!res.locals.isAuthenticated) {
      return res.redirect("/401");
   } else {
      next();
   }
}

module.exports = protectRoute;
