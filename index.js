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

if (!process.env.DYNO) {
  require('dotenv').config();
}

const LAUNCH_OPTION = process.env.DYNO ? {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
} : {
  headless: false
};

const crawler = async () => {
  const browser = await puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();
  await page.goto('https://my.zenlogic.jp/login/', {
    waitUntil: 'networkidle2'
  });

  await page.type('#account_username', process.env.account_username);
  await page.type('#account_password', process.env.account_password);
  await page.click('form input[type=submit]');
  await page.waitForNavigation();

  await page.goto('https://my.zenlogic.jp/configurations/27822/mail/mailbox_sizes', {
    waitUntil: 'networkidle2'
  });
  await page.select('select.mr5', 'j-monkey.jp');
  await page.waitFor(1000);

  await page.screenshot({
    path: 'screenshot.png',
    fullPage: true
  });
  const output = await page.evaluate(() => {
    const elements = document.querySelectorAll('tr');
    return [].map.call(elements, el => el.innerText.split('\t'));
  });
  await browser.close();
  return output;
}
