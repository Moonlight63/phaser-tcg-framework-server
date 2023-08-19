import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import serverState from '../ServerState';

passport.use(new LocalStrategy(async (username, password, done) => {
  const user = await serverState.userStorage.getUser(username);
  if (user && user.password === password) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect username or password.' });
  }
}));
