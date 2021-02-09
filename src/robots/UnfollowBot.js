const readlineSync = require('readline-sync')

async function UnfollowBot(nonMutualFollowers, page) {
    console.log('Initializing UnfollowBot')
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
                    }, 2000)

                });
            }, nonMutualFollowers)

            await browser.close();
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
                    }, 2000)
                }
            }, nonMutualFollowers, quantityToUnfollow)

            console.log('You unfollow this users:\n')
            for (var i = 0; i < quantityToUnfollow; i++) {
                console.log(nonMutualFollowers[i])
            }
            await browser.close();
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