require('dotenv').config();
const puppeteer = require('puppeteer-core');

async function startBot() {
  //Defining environment variables
  const USER = process.env.USER
  const PASSWORD = process.env.PASSWORD

  //Setup browser pupperteer
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width: 1200, height: 800},
    executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  });
  
  //Opening the browser
  const page = await browser.newPage();

  //Loading page address
  await page.goto('https://instagram.com/');
  await page.waitForSelector('input[name="username"]')

  //Typing instagram credentials to sign in
  await page.type('input[name="username"]', USER)
  await page.type('input[name="password"]', PASSWORD)
  await page.click('button[type="submit"]')

  //Navigating within the profile
  await page.waitForNavigation();
  await page.goto(`https://instagram.com/${USER}/`);
  await page.click('ul > li:nth-child(2) > a')

  await page.evaluate(() => {
    const numberOfFollowers = Number(document.querySelector("ul > li:nth-child(2) > a > span").innerText)
    const scrollToGetData = window.setInterval(() => {
      const followersBox = document.querySelector('.isgrP');
      followersBox.scrollTop = followersBox.scrollHeight;

      const numberOfProfiles = document.querySelectorAll("div.d7ByH > span > a").length
      if(numberOfProfiles == numberOfFollowers){
        clearInterval(scrollToGetData)
      }
    }, 2000);
  });
  
  //Closing the Browser
  //await browser.close();
};

startBot();