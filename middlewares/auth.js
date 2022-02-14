const jwt = require('jsonwebtoken');
exports.authenticate = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(400).send({
            message: "No token provided"
        })
    }
    jwt.verify(token, "Vicky", (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized"
            });
        }
        req.user = decoded;
        next()
    })
}