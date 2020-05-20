const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const {REDIS_CONF} = require('./conf/db');

// view-router
const userViewRouter = require('./routes/view/user');
const errorViewRouter = require('./routes/view/error');

// api-router
const userApiRouter = require('./routes/api/user');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// session 配置
app.keys = ['Yiasd_@!2213&*#'];
app.use(
  session({
    key: 'weibo.sid', // cookie name 默认是koa.sid
    prefix: 'weibo:sess:', // redis key的前缀 默认soa:sess
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 3600 * 24 * 1000, // ms 过期时间 1天
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes register
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
