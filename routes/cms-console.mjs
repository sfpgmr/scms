

import * as riot from '@riotjs/ssr';

export default class CmsConsole
{

  constructor(){
    
  }

  mount(router){
    router.get('/login',this.login.bind(this));
    router.get('/list',this.list.bind(this));
    router.get('/edit',this.edit.bind(this));
    router.get('/deploy',this.deploy.bind(this));
  }

  async login(ctx,next){
    await next();
    ctx.body = 'login';
  }

  async list(ctx,next){
    await next();
    ctx.body = 'list';
  }

  async edit(ctx,next){
    await next();
    ctx.body = 'edit';
  }


  async deploy(ctx,next){
    await next();
    ctx.body = 'deploy';
  }

}

