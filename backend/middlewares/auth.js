const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(':')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token.', error: error.message });
    }
};

const isSeller = (req,res,next) => {
    const user = req.user;
    if(user.role != 'Seller'){
        return res.status(401).json({ message: 'You are not authorised.' });
    }
    next();
}

// const isBuyer = (req,res,next) => {
//     const user = req.user;
//     if(user.role != 'Buyer'){
//         return res.status(403).json({ message: 'You are not authorised.' });
//     }
//     next();
// }

module.exports = {checkAuth,isSeller}