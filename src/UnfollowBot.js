require('dotenv').config();
const puppeteer = require('puppeteer-core');
const readlineSync = require('readline-sync')

const browserConfig = require('./config/browserConfig')

async function UnfollowBot(followersProfiles, followingProfiles) {
    console.log('Initializing UnfollowBot')
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
    await page.click('ul > li:nth-child(3) > a')

    const nonMutualFollowers = followingProfiles.filter(profile => !(followersProfiles.includes(profile)))

    console.log('UNMUTUAL FOLLOWERS', nonMutualFollowers);

    if (nonMutualFollowers.length !== 0) {
        var userOptions = ['Unfollow all non-mutual followers', 'Unfollow a specific quantity of non-mutual followers']
        var index = readlineSync.keyInSelect(userOptions, 'Which option you whant?');

        if (index === 0) {
            await page.evaluate((nonMutualFollowers) => {
                nonMutualFollowers.forEach(nonMutualFollower => {
                    var username = nonMutualFollower
                    var userTag = document.querySelector(`a[title="${username}"]`)
                    var userFather = userTag.closest('li')
                    var userButton = userFather.querySelector('button')

                    userButton.click()

                    var unfollowButton = document.querySelector('button.-Cab_')

                    unfollowButton.click()

                    setTimeout((username) => {
                        console.log(`Stop following ${username}`)
                    }, 1000)

                });
            }, nonMutualFollowers)
        }
        else if (index === 1) {
            var quantityToUnfollow = readlineSync.questionInt('How many do you want to stop following?\n')
            await page.evaluate((nonMutualFollowers, quantityToUnfollow) => {
                for (var i = 0; i <= quantityToUnfollow; i++) {
                    var username = nonMutualFollowers[i]
                    var userTag = document.querySelector(`a[title="${username}"]`)
                    var userFather = userTag.closest('li')
                    var userButton = userFather.querySelector('button')
                    userButton.click()

                    var unfollowButton = document.querySelector('button.-Cab_')

                    unfollowButton.click()
                    setTimeout((username) => {
                        console.log(`Stop following ${username}`)
                    }, 1000)
                }
            }, nonMutualFollowers, quantityToUnfollow)

            console.log('You unfollow this users:\n')
            for (var i = 0; i < quantityToUnfollow; i++) {
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
}

module.exports = UnfollowBot