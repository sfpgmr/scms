
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-morgan'
import helmet from 'koa-helmet';
import serve from 'koa-static';
import mount from 'koa-mount';
import CmsConsole from '../routes/cms-console.mjs';
import resolveHome from './resolveHome.mjs';

const app = new Koa();
const router = new Router();

const serveOpts = {extensions:['html','htm']};
app.use(helmet());
app.use(logger('combined'));

const cms = new CmsConsole(app);

app.use(mount('/js/',serve(resolveHome('./public/js/'),serveOpts)));
app.use(mount('/css/',serve(resolveHome('./public/css/'),serveOpts)));
app.use(mount('/images/',serve(resolveHome('./public/images/'),serveOpts)));
app.use(mount('/',serve(resolveHome('./public/html/'),serveOpts)));

app.use(cms.router.routes());
app.use(cms.router.allowedMethods());


export default app;
