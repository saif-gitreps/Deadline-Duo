async function authorize(req, res, next) {
   if (!req.session.user || !req.session.isAuthenticated) {
      return next();
   }

   res.locals.isAuthenticated = req.session.isAuthenticated;
   res.locals.user = req.session.user;

   next();
}

module.exports = authorize;
