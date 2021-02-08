require('dotenv').config();
const puppeteer = require('puppeteer-core');
const browserConfig = require('./config/browserConfig')

async function FollowersBot () {
    console.log('Initializing FollowersBot')
    const browser = await puppeteer.launch(browserConfig);
  
    //Opening the browser
    const page = await browser.newPage();
  
    //Loading page address
    await page.goto('https://instagram.com/');
    await page.waitForSelector('input[name="username"]')
  
    //Typing instagram credentials to sign in
    await page.type('input[name="username"]', process.env.USER)
    await page.type('input[name="password"]', process.env.PASSWORD)
    await page.click('button[type="submit"]')
  
    //Navigating within the profile
    await page.waitForNavigation();
    await page.goto(`https://instagram.com/${process.env.USER}/`);
    await page.click('ul > li:nth-child(2) > a')
  
    //Getting followers @
    await page.evaluate(() => {
      var numberToStop = document.querySelector("ul > li:nth-child(2) > a > span").innerText
  
      if(numberToStop.includes('.')){
        numberToStop = Number(numberToStop.replace('.',''))
      }
      else{
        numberToStop = Number(numberToStop)
      }
  
      console.log(numberToStop)
      const scrollingBox = window.setInterval(() => {
        var numberOfProfiles = document.querySelectorAll("div.d7ByH").length-1
        const divBox = document.querySelector('.isgrP');
        console.log(numberOfProfiles)
        divBox.scrollTop = divBox.scrollHeight;
  
        if(numberOfProfiles === numberToStop){
          document.querySelectorAll("div.d7ByH").item(numberOfProfiles-1).classList.add('lastItem')
          clearInterval(scrollingBox)
        }
  
      }, 3000);
    });
  
    await page.waitForSelector('.lastItem', {timeout: 0})
  
    const followersProfiles = await page.evaluate(() => {
      const profileList = document.querySelectorAll("div.d7ByH > span > a")
  
      const profileNames = Array.from(profileList).map(user => user.innerHTML);
  
      return profileNames;
    })

    await browser.close();
  
    console.log('FOLLOWERS LIST:\n',followersProfiles);

    return followersProfiles
}

module.exports = FollowersBot