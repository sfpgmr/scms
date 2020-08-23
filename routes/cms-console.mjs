
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import passport from 'koa-passport';
import PassportLocal from 'passport-local'  
import koaHelmet from 'koa-helmet';
import graphql from 'koa-graphql';
import schema from './schema.mjs';


const LocalStrategy  = PassportLocal.Strategy;

const fetchUser = (() => {
  // This is an example! Use password hashing in your project and avoid storing passwords in your code
  const user = { id: 1, username: 'test', password: 'test' }
  return async function() {
    return user
  }
})()

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser()
    done(null, user)
  } catch(err) {
    done(err)
  }
})

//const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  fetchUser()
    .then(user => {
      if (username === user.username && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))

export default class CmsConsole
{

  constructor(app){
    this.app = app;
    app.proxy = true;
    app.keys = [process.env.SESSION_KEY];

    const router = this.router = new Router();  
    this.app.use(bodyParser());
    this.app.use(session({},app));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.local_authenticate = passport.authenticate('local');

    router.post('/login',this.login.bind(this));
    router.post('/graphql',graphql({schema:schema,graphql:true}));
    router.get('/logout',this.logout.bind(this));
  }

  async login(ctx,next){
    await next();
    return this.local_authenticate(ctx,next);
  }

  async logout(ctx,next){
    ctx.logout();
    ctx.redirect('/#login');
  }

}

