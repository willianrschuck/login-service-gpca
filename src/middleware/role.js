
const admin = (req, res, next) => {

    if (req.user.people_type) {
        return res.status(401).json({ message: 'You are not an admin!' });
    }
    next();

}

module.exports = {
    admin
}