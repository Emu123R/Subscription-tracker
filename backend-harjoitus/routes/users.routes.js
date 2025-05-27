import { Router } from 'express';

import authorize from '../middelwares/auth.middelware.js';
import { getUsers, getUser } from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/', getUsers); //tulosta kaikki käyttäjät

userRouter.get('/:id', authorize, getUser); //tulosta käyttäjän tiedot id:n perusteella

userRouter.post('/', (req, res) => {
    res.send({title: 'CREATE new user'});
});

userRouter.put('/:id', (req, res) => {
    res.send({title: 'UPDATE user'});
});

userRouter.delete('/:id', (req, res) => {
    res.send({title: 'DELETE user'});
});

export default userRouter;