export const isAdmin = (req, res, next) => {
    if (req.userId === 1) {
        next();
    } else {
        res.status(403).json({ message: 'Permissão negada' });
    }
};