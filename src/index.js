require('dotenv').config();
const puppeteer = require('puppeteer-core');
const readlineSync = require('readline-sync')
const os = require('os');

const executablePaths = {
  'linux': '/usr/bin/google-chrome',
  'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  'win32': 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
}

const platform = os.platform

async function startInstagramUnfollowBot() {
  //Defining environment variables
  const USER = process.env.USER
  const PASSWORD = process.env.PASSWORD

  //Setup browser pupperteer
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {width: 1200, height: 800},
    executablePath: executablePaths[platform]
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

    }, 3000);
  });

  await page.waitForSelector('.lastItem', {timeout: 0})

  const followersProfiles = await page.evaluate(() => {
    const profileList = document.querySelectorAll("div.d7ByH > span > a")

    const profileNames = Array.from(profileList).map(user => user.innerHTML);

    return profileNames;
  })

  console.log('FOLLOWERS LIST:\n',followersProfiles);

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

    }, 3000);
  });

  await page.waitForSelector('.lastItem', {timeout: 0})

  const followingProfiles = await page.evaluate(() => {
    const profileList = document.querySelectorAll("div.d7ByH > span > a")
    const profileNames = Array.from(profileList).map(user => user.innerHTML);

    return profileNames;
  })

  console.log('FOLLOWING PROFILES:\n',followersProfiles);

  const nonMutualFollowers = followingProfiles.filter(profile => !(followersProfiles.includes(profile)))

  console.log('UNMUTUAL FOLLOWERS', nonMutualFollowers);


  if(nonMutualFollowers.length !== 0) {
    var userOptions = ['Unfollow all non-mutual followers', 'Unfollow a specific quantity of non-mutual followers']
    var index = readlineSync.keyInSelect(userOptions, 'Which option you whant?');

    if(index === 0) {
      await page.evaluate((nonMutualFollowers) => {
        nonMutualFollowers.forEach(nonMutualFollower => {
          var user = document.querySelector(`a[title="${nonMutualFollower}"]`)
          console.log(user)
          var userFather = user.closest('li')
          console.log(userFather)
          var userButton = userFather.querySelector('button')
          console.log(userButton)
          
          userButton.click()
          
          var unfollowButton = document.querySelector('button.-Cab_')
    
          unfollowButton.click()
    
        });
      }, nonMutualFollowers)
    }
    else if(index === 1){
      var quantityToUnfollow = readlineSync.questionInt('How many do you want to stop following?')
      await page.evaluate((nonMutualFollowers, quantityToUnfollow) => {
        for(var i=0; i<= quantityToUnfollow; i++) {
          var user = document.querySelector(`a[title="${nonMutualFollowers[i]}"]`)
          console.log(user)
          var userFather = user.closest('li')
          console.log(userFather)
          var userButton = userFather.querySelector('button')
          console.log(userButton)
          
          userButton.click()
          
          var unfollowButton = document.querySelector('button.-Cab_')
    
          unfollowButton.click()
        }
      }, nonMutualFollowers, quantityToUnfollow)

      console.log('You unfollow this users:\n')
      for(var i=0; i<quantityToUnfollow; i++) {
        console.log(nonMutualFollowers[i])
      }

    }
    else {
      console.log("You exited from the robot")
      await browser.close();
    }

  }
  else {
    console.log("You don´t have non-mutual followers!!")
    await browser.close();
  }
  
  //Close the Browser
  await browser.close();
};

startInstagramUnfollowBot();