const jwt=require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Access denied, token missing!' });
    console.log(token);
    try {
        const verified = jwt.verify(token,'12345');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token!' });
    }
};