// / <reference path="./../global.d.ts" />
import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserStorage } from '../ServerState';
import { Console } from 'console';

const router = express.Router();

passport.use('local', new LocalStrategy(async (username, password, done) => {
  console.log("🚀 ~ file: LocalStrategy.ts:9 ~ passport.use ~ password:", password)
  console.log("🚀 ~ file: LocalStrategy.ts:9 ~ passport.use ~ username:", username)
  const user = await UserStorage().getUserByUsername(username);
  if (user && user.password === password) {
    console.log("🚀 ~ file: LocalStrategy.ts:13 ~ passport.use ~ user.password === password:", user.password === password)
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect username or password.' });
  }
}));

router.post('/', (req: Express.Request, res, next) => {
  if (!req.user) {
    passport.authenticate('local')(req, res, next);
  } else {
    next();
  }
}, (req, res) => {
  if (req.user) {
    res.status(200).send(req.user.username);
  } else {
    res.status(401).send('Authentication failed: Incorrect username or password.');
  }
});

export default router;
