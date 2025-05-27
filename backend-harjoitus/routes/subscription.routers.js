import { Router } from 'express';
import authorize from '../middelwares/auth.middelware.js';
import { createSubscription, getUserSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

//reitit jokaiselle tilauksen fuktiolle
subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));

subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));

subscriptionRouter.post('/', authorize, createSubscription); //luo uusi tilaus

subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));

subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

subscriptionRouter.get('/users/:id', authorize, getUserSubscription); //hae käyttäjän tilaukset

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRouter;