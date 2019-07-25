const passport = require('passport');

// Only for SESSION AUTH !
// exports.onlyAuthUser = function (req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//
//   return res.status(401).send({errors: {auth: 'Not authenticated'}});
// };

exports.onlyAuthUser = passport.authenticate('jwt', {session: false});