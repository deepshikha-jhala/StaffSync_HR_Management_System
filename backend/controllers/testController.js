const getProtectedData = (req, res) => {
    res.status(200).json({
        message: 'Access granted',
        user: {
            id: req.user._id,
            name: req.user.name,
            role: req.user.role
        }
    });
};

module.exports = { getProtectedData };