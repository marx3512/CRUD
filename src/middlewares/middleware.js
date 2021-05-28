exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash();
    next();
};