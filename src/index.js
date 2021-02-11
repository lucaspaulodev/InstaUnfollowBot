const FollowersBot = require('./robots/FollowersBot')
const FollowingBot = require('./robots/FollowingBot')
const UnfollowBot = require('./robots/UnfollowBot')

async function startInstagramUnfollowBot() {
  const followersProfiles = await FollowersBot()
  const {followingProfiles, page, browser} = await FollowingBot()

  const nonMutualFollowers = followingProfiles.filter(profile => !(followersProfiles.includes(profile)))
  
  await UnfollowBot(nonMutualFollowers, page, browser)
};

startInstagramUnfollowBot();
