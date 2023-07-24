// The 'roleGuard' middleware accepts one or more roles and returns a middleware function
function roleGuard(...allowedRoles) {
    return (req, res, next) => {
      // In a real application, you would determine the user's role based on the
      // authenticated user. The user would typically be attached to the request
      // in a previous authentication middleware. Here, we'll just hardcode a role.
      const userRole = req.user.role;
  
      // Check if the user's role is in the list of allowed roles
      if (!allowedRoles.includes(userRole)) {
        // If the user's role is not allowed, send a 403 Forbidden response
        return res.status(403).send('Forbidden');
      }
  
      // If the user's role is allowed, pass control to the next middleware function
      next();
    };
  }
module.exports = roleGuard;