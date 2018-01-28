const Koa = require('koa');
const Favicon = require('koa-favicon');
const Puppeteer = require('puppeteer');
const Render = require('koa-ejs');
const Router = require('koa-router');
const Serve = require('koa-static');

let users = [];

const app = new Koa();
const router = new Router();

Render(app, {
  root: __dirname + '/views',
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
});

app.use(Serve(__dirname + '/views'));

router.get('/', async (ctx, next) => {
  if (users.length == 0) {
    users = await crawler();
  }
  await ctx.render('content', {
    users
  });
});

router.get('/debug', async (ctx, next) => {
  if (users.length == 0) {
    users = await crawler();
  }
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

  // Check mailbox size
  await page.goto('https://my.zenlogic.jp/configurations/27822/mail/mailbox_sizes', {
    waitUntil: 'networkidle2'
  });
  await page.select('select.mr5', 'j-monkey.jp');
  await page.waitFor(1000);

  const output = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('tbody > tr')).map((account) => {
      console.log(account);  // XXX: for DEBUG!
      const innerTexts = account.innerText.split('\t');
      const mail_address = innerTexts[0];
      const mail_num = parseInt(innerTexts[1].replace(/,/g, '').replace(' 件', ''), 10);
      const mailbox_size = parseFloat(innerTexts[2].replace(' MB', ''));
      return {
        mail_address: mail_address,
        mail_num: mail_num,
        mailbox_size: mailbox_size,
        quota: 1000,
        usage: mailbox_size / 1000
      };
    });
  });

  await browser.close();
  return output;
}
