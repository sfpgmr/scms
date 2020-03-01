
import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-morgan'
import helmet from 'koa-helmet';
import serve from 'koa-static';
import mount from 'koa-mount';
import CmsConsole from '../routes/cms-console.mjs';

const app = new Koa();
const router = new Router();
const cms = new CmsConsole();

const serveOpts = {extensions:['html','htm']};

app.use(helmet());
app.use(logger('combined'));


app.use(mount('/js/',serve(resolveHome('../public/js/'),serveOpts)));
app.use(mount('/css/',serve(resolveHome('../public/css/'),serveOpts)));
app.use(mount('/',serve(resolveHome('../public/html/'),serveOpts)));
cms.mount(router);
app.use(router.routes());


export default app;
