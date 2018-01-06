const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = await crawler();
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());
app.use(favicon(__dirname + '/favicon.ico'));
app.listen(process.env.PORT || 3000);

const puppeteer = require('puppeteer');
const LAUNCH_OPTION = process.env.DYNO ? {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
} : {
  headless: false
};

const crawler = async () => {
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto('https://news.ycombinator.com', {
    waitUntil: 'networkidle2'
  });
  const newsTitles = await page.evaluate(() => {
    const elenemts = document.querySelectorAll('.itemlist .title > a');
    return [].map.call(elenemts, el => el.innerText);
  });
  await browser.close();
  return newsTitles;
}
