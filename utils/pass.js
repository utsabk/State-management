'use strict';
import passport from 'passport';
import passportLocal from 'passport-local';
const Strategy = passportLocal.Strategy;

// fake database: ****************
const users = [
  {
    user_id: 1,
    name: 'Foo Bar',
    email: 'foo@bar.fi',
    password: 'foobar',
  },
  {
    user_id: 2,
    name: 'Bar Foo',
    email: 'bar@foo.fi',
    password: 'barfoo',
  },
];
// *******************

// fake database functions *********
const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.user_id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};
// *****************

// serialize: store user id in session
passport.serializeUser((id, done) => {
  console.log('serialize', id);
  done(null, id);
  // serialize user id by adding it to 'done()' callback
});

// deserialize: get user id from session and get all user data
passport.deserializeUser(async(id, done) => {
  const user =  await getUser(id);
  console.log('deserialize', user);
  done(null, user.user_id);
  // deserialize user by adding it to 'done()' callback
});

passport.use(
  new Strategy((username, password, done) => {
    const user = getUserLogin(username);

    console.log('My user:- ', user);

    if (user == undefined || password !== user.password) {
      return done(null, false);
    }
    done(null, user.user_id);
  })
);

export default passport
