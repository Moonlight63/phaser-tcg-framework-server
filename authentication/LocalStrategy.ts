import express from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserStorage } from '../ServerState';

const router = express.Router();

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await UserStorage.getUser(username);
  if (user && user.password === password) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect username or password.' });
  }
}));

router.post('/', passport.authenticate('local', { failureRedirect: '/login/local' }), (req, res) => {
  res.redirect('/');
});

export default router;
