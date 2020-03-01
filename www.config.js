module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name      : 'www',
      script    : './bin/www.mjs',
      node_args:['--expose-gc','--experimental-modules'],
      exec_mode: "fork"
    }
  ]
};
