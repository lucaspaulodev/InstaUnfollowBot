const os = require('os');

const executablePaths = {
    'linux': '/usr/bin/google-chrome',
    'darwin': '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    'win32': 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
}

const platform = os.platform

module.exports = {
    headless: false,
    defaultViewport: {width: 1200, height: 800},
    executablePath: executablePaths[platform]
}