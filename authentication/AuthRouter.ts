import express from 'express';
import localStrategyRouter from './LocalStrategy';

const authRouter = express.Router();

authRouter.get('/logout', (req, res) => {
  res.send('Logout page placeholder');
});

const loginRouter = express.Router();
authRouter.use('/login', loginRouter);
loginRouter.get('/', (req, res) => {
  res.send('Login page placeholder');
});

loginRouter.use('/local', localStrategyRouter);


export default authRouter;
