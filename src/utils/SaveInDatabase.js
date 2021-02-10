const fs = require('fs')

async function SaveUnmutualFollowers (array) {
    const string = JSON.stringify(array)

    fs.writeFile('src/database/NonMutualFollowers.txt', string, (err) => {
        err ? console.log('Error to create file', err) : console.log('Success to create file')
    })
}

module.exports = SaveUnmutualFollowers