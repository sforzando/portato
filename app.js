const Koa = require('koa');
const Favicon = require('koa-favicon');
const Render = require('koa-ejs');
const Router = require('koa-router');
const Serve = require('koa-static');

const crawler = require('./lib/crawler/zenlogic');

const app = new Koa();
const router = new Router();

let users = [];

Render(app, {
  root: __dirname + '/views',
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true,
});

app.use(Serve(__dirname + '/views'));

router.get('/', async (ctx, next) => {
  if (users.length == 0) {
    users = await crawler();
  }
  await next();
  await ctx.render('content', {
    users,
  });
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(Favicon(__dirname + '/favicon.ico'));
app.listen(process.env.PORT || 3000);

if (!process.env.DYNO) {
  require('dotenv').config();
}
