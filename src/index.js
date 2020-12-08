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

  //Getting followers @
  await page.evaluate(() => {
    const numberToStop = Number(document.querySelector("ul > li:nth-child(2) > a > span").innerText)

    const scrollingBox = window.setInterval(() => {
      const numberOfProfiles = document.querySelectorAll("div.d7ByH > span > a").length
      const divBox = document.querySelector('.isgrP');

      divBox.scrollTop = divBox.scrollHeight;

      if(numberOfProfiles == numberToStop){
        document.querySelectorAll("div.d7ByH > span > a").item(numberToStop-1).classList.add('lastItem')
        clearInterval(scrollingBox)
      }

    }, 2000);
  });

  await page.waitForSelector('.lastItem')

  const followersProfiles = await page.evaluate(() => {
    const profileList = document.querySelectorAll("div.d7ByH > span > a")

    const profileNames = Array.from(profileList).map(user => user.innerHTML);

    return profileNames;
  })

  console.log(followersProfiles);

  //Getting following @
  await page.click('button > div > svg')
  await page.click('ul > li:nth-child(3) > a')

  await page.evaluate(() => {
    const numberToStop = Number(document.querySelector("ul > li:nth-child(3) > a > span").innerText)

    const scrollingBox = window.setInterval(() => {
      const numberOfProfiles = document.querySelectorAll("div.d7ByH > span > a").length
      const divBox = document.querySelector('.isgrP');

      divBox.scrollTop = divBox.scrollHeight;

      if(numberOfProfiles == numberToStop){
        document.querySelectorAll("div.d7ByH > span > a").item(numberToStop-1).classList.add('lastItem')
        clearInterval(scrollingBox)
      }

    }, 2000);
  });

  await page.waitForSelector('.lastItem')

  const followingProfiles = await page.evaluate(() => {
    const profileList = document.querySelectorAll("div.d7ByH > span > a")
    const profileNames = Array.from(profileList).map(user => user.innerHTML);

    return profileNames;
  })

  console.log(followingProfiles);


  //Closing the Browser
  //await browser.close();
};

startBot();