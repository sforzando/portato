const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const Favicon = require('koa-favicon');
const Puppeteer = require('puppeteer');
const Render = require('koa-ejs');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

Render(app, {
  root: __dirname + '/views',
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

router.get('/', async (ctx, next) => {
  ctx.body = await crawler();
});

router.get('/debug', async (ctx, next) => {
  const users = [{
    name: '鈴木'
  }, {
    name: '佐藤'
  }, {
    name: '齋藤'
  }];
  await ctx.render('content', {
    users
  });
});

app.use(router.routes());
app.use(router.allowedMethods());
// app.use(bodyParser());
app.use(Favicon(__dirname + '/favicon.ico'));
app.listen(process.env.PORT || 3000);

if (!process.env.DYNO) {
  require('dotenv').config();
}

const LAUNCH_OPTION = process.env.DYNO ? {
  args: ['--no-sandbox', '--disable-setuid-sandbox']
} : {
  headless: false
};

const crawler = async () => {
  const browser = await Puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();

  // Login to control panel
  await page.goto('https://my.zenlogic.jp/login/', {
    waitUntil: 'networkidle2'
  });
  await page.type('#account_username', process.env.account_username);
  await page.type('#account_password', process.env.account_password);
  await page.click('form input[type=submit]');
  await page.waitForNavigation();

  // Check mailbox sizes
  await page.goto('https://my.zenlogic.jp/configurations/27822/mail/mailbox_sizes', {
    waitUntil: 'networkidle2'
  });
  await page.select('select.mr5', 'j-monkey.jp');
  await page.waitFor(1000);

  // Get all rows
  const output = await page.evaluate(() => {
    const elements = document.querySelectorAll('tbody > tr');
    let rows = [];
    for (element of elements) {
      const innerTexts = element.innerText.split('\t');
      const account = innerTexts[0];
      const num = parseInt(innerTexts[1].replace(' 件', ''), 10);
      const size = parseFloat(innerTexts[2].replace(' MB', ''));
      rows.push({
        account: account,
        num: num,
        size: size
      });
    }

    // Sort by size
    rows.sort((a, b) => {
      if (a.size < b.size) {
        return 1;
      } else {
        return -1;
      }
    });
    return rows;
  });

  await browser.close();
  return output;
}
