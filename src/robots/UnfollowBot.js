const readlineSync = require('readline-sync')
const SaveInDatabase = require('../utils/SaveInDatabase')

async function UnfollowBot(nonMutualFollowers, page, browser) {
    console.log('Initializing UnfollowBot')
    console.log('UNMUTUAL FOLLOWERS', nonMutualFollowers);
    
    if (nonMutualFollowers.length !== 0) {
        let userOptions = ['Unfollow 20 non-mutual followers', 'Unfollow 40 non-mutual followers', 'Unfollow 80 non-mutual followers']
        let index = readlineSync.keyInSelect(userOptions, 'Which option you whant? (You can unfollow 160 profiles per hour in Instagram)');

        if (index === 0) {
            await page.evaluate((nonMutualFollowers) => {
                for (let i = 0; i < 20; i++) {
                    let username = nonMutualFollowers[i]
                    let userTag = document.querySelector(`a[title="${username}"]`)
                    let userFather = userTag.closest('li')
                    let userButton = userFather.querySelector('button')
                    userButton.click()

                    let unfollowButton = document.querySelector('button.-Cab_')

                    unfollowButton.click()
                    setTimeout((username) => {
                        console.log(`Stop following ${username}`)
                    }, 2000)
                }
            }, nonMutualFollowers)

            const data = nonMutualFollowers.splice(0, 20)

            await SaveInDatabase(data)

            await browser.close();
        }
        else if (index === 1) {
            await page.evaluate((nonMutualFollowers) => {
                for (let i = 0; i < 40; i++) {
                    let username = nonMutualFollowers[i]
                    let userTag = document.querySelector(`a[title="${username}"]`)
                    let userFather = userTag.closest('li')
                    let userButton = userFather.querySelector('button')
                    userButton.click()

                    let unfollowButton = document.querySelector('button.-Cab_')

                    unfollowButton.click()
                    setTimeout((username) => {
                        console.log(`Stop following ${username}`)
                    }, 2000)
                }
            }, nonMutualFollowers)

            console.log('You unfollow this users:\n')
            for (let i = 0; i < 40; i++) {
                console.log(nonMutualFollowers[i])
            }

            const data = nonMutualFollowers.splice(0, 40)

            await SaveInDatabase(data)

            await browser.close();
        }
        else if (index === 2) {
            await page.evaluate((nonMutualFollowers) => {
                for (let i = 0; i < 80; i++) {
                    let username = nonMutualFollowers[i]
                    let userTag = document.querySelector(`a[title="${username}"]`)
                    let userFather = userTag.closest('li')
                    let userButton = userFather.querySelector('button')
                    userButton.click()

                    let unfollowButton = document.querySelector('button.-Cab_')

                    unfollowButton.click()
                    setTimeout((username) => {
                        console.log(`Stop following ${username}`)
                    }, 2000)
                }
            }, nonMutualFollowers)

            console.log('You unfollow this users:\n')
            for (let i = 0; i < 80; i++) {
                console.log(nonMutualFollowers[i])
            }

            const data = nonMutualFollowers.splice(0, 80)

            await SaveInDatabase(data)

            await browser.close();
        }
        else {
            console.log("You exited from the robot")
            await SaveInDatabase(nonMutualFollowers)
            await browser.close();
        }
    }
    else {
        console.log("You don´t have non-mutual followers!!")
        await browser.close();
    }
}

module.exports = UnfollowBot