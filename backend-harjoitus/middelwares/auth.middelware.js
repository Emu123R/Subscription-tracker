import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import { JWT_SECRET } from '../config/env.js';

//middleware jolla tarkistetaan että vain käyttäjä näkee omat tietonsa
// ja että käyttäjä on kirjautunut sisään
const authorize = async (req, res, next) => {
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) return res.status(401).json({ message: 'Unauthorized1' });

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId);
        
        if (!user) return res.status(404).json({ message: 'Unauthorized2' });

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized3', error: error.message });
    }
};

export default authorize;