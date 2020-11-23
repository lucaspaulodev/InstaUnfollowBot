require('dotenv').config();
const puppeteer = require('puppeteer-core');

(async () => {
  const USER = process.env.USER
  const PASSWORD = process.env.PASSWORD

  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  });
  
  const page = await browser.newPage();
  await page.goto('https://instagram.com/');
  await page.waitForSelector('input[name="username"]')
  await page.type('input[name="username"]', USER)
  await page.type('input[name="password"]', PASSWORD)
  await page.click('button[type="submit"]')
  await page.waitForSelector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span')
  await page.click('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span')
  await page.waitForSelector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > div.poA5q > div.uo5MA._2ciX.tWgj8.XWrBI > div._01UL2 > a:nth-child(1)')
  await page.click('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > div.poA5q > div.uo5MA._2ciX.tWgj8.XWrBI > div._01UL2 > a:nth-child(1)')
  await page.waitForSelector('.k9GMp')

  
  await page.screenshot({path: 'me.png'})


  await browser.close();
})();