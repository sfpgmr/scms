import * as riot from 'riot';
import app from '../riot/app.riot';

import sf_button from '../riot/button.riot';
import sf_navbar from '../riot/navbar.riot';
import sf_textbox from '../riot/textbox.riot';
import sf_login from '../riot/login.riot';
import sf_about from '../riot/about.riot';
import sf_signup from '../riot/signup.riot';
import sf_home from '../riot/home.riot';
import sf_title from '../riot/title.riot';
import { Router, Route } from '@riotjs/route';

riot.register('sf_button',sf_button);
riot.register('sf_navbar',sf_navbar);
riot.register('sf_textbox',sf_textbox);
riot.register('sf_login',sf_login);
riot.register('sf_about',sf_about);
riot.register('sf_signup',sf_signup);
riot.register('sf_home',sf_home);
riot.register('sf_title',sf_title);
riot.register('route',Route);
riot.register('router',Router);
riot.component(app)(document.getElementById('sf_app'));

