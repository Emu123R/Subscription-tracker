import { Router } from 'express';

import { signUp, signIn } from '../controllers/auth.controller.js';

const authRouter = Router();
//reitit jokaiselle kirjautumis fuktiolle
authRouter.post('/sign-up', signUp); //käyttäjän rekisteröinti
authRouter.post('/sign-in', signIn); //käyttäjän kirjautuminen
authRouter.post('/sign-out', (req, res) => {
    res.send({title: 'Sign Out'});
});

export default authRouter;