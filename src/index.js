const FollowersBot = require('./FollowersBot')
const FollowingBot = require('./FollowingBot')
const UnfollowBot = require('./UnfollowBot')

async function startInstagramUnfollowBot() {
  const followersProfiles = await FollowersBot()
  const followingProfiles = await FollowingBot()

  await UnfollowBot(followersProfiles, followingProfiles)
};

startInstagramUnfollowBot();