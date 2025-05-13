export const checkAuthenticationApi = (req, res, next) => {
  const user = req.cookies.user;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  next();
}

export const checkAuthentication = (req, res, next) => {
  const user = req.cookies.user;

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user;
  next();
}
