import { unauthorized } from '@hapi/boom';
import passport from 'passport';
import passportLocal from 'passport-local';
import { Request } from 'express';
import { User } from '../models';
import { verifyPassword } from '../modules/user/user.helper';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: User, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id: number, done) => {
  User.scope('excludePass')
      .findOne({ where: { id } })
      .then(
        (user: User) => done(undefined, user),
        (err) => done(err),
      );
});

passport.use(new LocalStrategy({ passReqToCallback: true, usernameField: 'email' },
  async (req: Request, email: string, password: string, done) => {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        return done(unauthorized('Invalid email or password'));
      }

      const verified = await verifyPassword(password, user.password);
      if (!verified) {
        return done(unauthorized('Invalid email or password'));
      }
      return done(undefined, { id: user.id, email: user.email });
    } catch (err) {
      return done(err);
    }
  }),
);
