const Puppeteer = require('puppeteer');

const LAUNCH_OPTION = process.env.DYNO
  ? {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
  : {
      headless: false,
    };

module.exports = async () => {
  const browser = await Puppeteer.launch(LAUNCH_OPTION);
  const page = await browser.newPage();

  // Login to control panel
  await page.goto('https://my.zenlogic.jp/login/', {
    waitUntil: 'networkidle2',
  });
  await page.type('#account_username', process.env.account_username);
  await page.type('#account_password', process.env.account_password);
  await page.click('form input[type=submit]');
  await page.waitForNavigation();

  // Check mailbox size
  await page.goto(
    'https://my.zenlogic.jp/configurations/27822/mail/mailbox_sizes',
    {
      waitUntil: 'networkidle2',
    }
  );
  await page.select('select.mr5', 'j-monkey.jp');
  await page.waitForTimeout(1000);

  const output = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('tbody > tr')).map(account => {
      const innerTexts = account.innerText.split('\t');
      const mail_address = innerTexts[0];
      const mail_num = parseInt(
        innerTexts[1].replace(/,/g, '').replace(' 件', ''),
        10
      );
      const mailbox_size = parseFloat(
        innerTexts[2].replace(/,/g, '').replace(' MB', '')
      );
      const result = {
        mail_address: mail_address,
        mail_num: mail_num,
        mailbox_size: mailbox_size,
        quota: 5120,
        usage: mailbox_size / 5120,
      };
      console.log(result);
      return result;
    });
  });

  await browser.close();
  return output;
};
