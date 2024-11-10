const authMiddleware = (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'No has iniciado sesión' });
    }
    next();
  };
  
  export default authMiddleware;