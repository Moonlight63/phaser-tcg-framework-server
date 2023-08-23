import express from 'express';
import localStrategyRouter from './LocalStrategy';

const authRouter = express.Router();

authRouter.get('/logout', (req, res) => {
  // res.send('Logout page placeholder');
  res.send(req.user || "Not Logged In");
});

authRouter.post('/logout', (req, res, next) => {
  if (req.user) {
    req.logout(function (err) {
      if (err) { return next(err); }
      req.session.destroy(function (err) {
        if (err) { return next(err); }
        res.clearCookie('connect.sid');
        res.send("success");
      });
      // res.redirect('/');
      // res.send("success");
    });
  } else {
    res.send("Not Logged In");
  }
});

const loginRouter = express.Router();
authRouter.use('/login', loginRouter);
loginRouter.get('/', (req, res) => {
  res.send('Login page placeholder');
  // res.statusCode = 200;
});

loginRouter.use('/local', localStrategyRouter);


export default authRouter;
