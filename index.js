require('dotenv').config();
const puppeteer = require('puppeteer-core');

(async () => {
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
  await page.goto('https://instagram.com/_lucaspaulo/');
  await page.click('ul > li:nth-child(2) > a')

  await page.evaluate(()=>{
    window.setInterval(function() {
      var followersBox = document.querySelector('.isgrP');
      followersBox.scrollTop = followersBox.scrollHeight;
    }, 1000);
  })

  await page.evaluate(()=>{
    var followers = document.querySelectorAll("div.d7ByH > span > a").forEach(follower => follower.innerHTML)

    console.log(followers);
  })


  //Closing the Browser
  //await browser.close();
})();

/*window.setInterval(function() {
  var elem = document.querySelector('.isgrP');
  elem.scrollTop = elem.scrollHeight;
}, 500);*/

// document.querySelectorAll("div.d7ByH > span > a")