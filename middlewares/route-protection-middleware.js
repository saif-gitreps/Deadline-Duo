function protectRoute(req, res, next) {
   if (!res.locals.isAuthenticated) {
      res.status(401).render("/401");
   } else {
      next();
   }
}

module.exports = protectRoute;
