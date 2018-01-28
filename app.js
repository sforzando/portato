const Koa = require('koa');
const Favicon = require('koa-favicon');
const Render = require('koa-ejs');
const Router = require('koa-router');
const Serve = require('koa-static');

let users = [];

const app = new Koa();
const router = new Router();

const crawler = require('./lib/crawler/zenlogic');
const jsonError = require('./middlewares/json_error');

Render(app, {
  root: __dirname + '/views',
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(jsonError);
app.use(Serve(__dirname + '/views'));

router.get('/', async (ctx, next) => {
  if (users.length == 0) {
    users = await crawler();
  }
  console.log(users);  // XXX: for Debug!
  await ctx.render('content', {
    users
  });
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(Favicon(__dirname + '/favicon.ico'));

app.listen(process.env.PORT || 3000);
if (!process.env.DYNO) {
  require('dotenv').config();
}
