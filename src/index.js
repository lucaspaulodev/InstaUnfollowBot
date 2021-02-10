const FollowersBot = require('./robots/FollowersBot')
const FollowingBot = require('./robots/FollowingBot')
const UnfollowBot = require('./robots/UnfollowBot')
const SaveInDatabase = require('./utils/SaveInDatabase')

async function startInstagramUnfollowBot() {
  const followersProfiles = await FollowersBot()
  const {followingProfiles, page} = await FollowingBot()

  const nonMutualFollowers = followingProfiles.filter(profile => !(followersProfiles.includes(profile)))
  
  await SaveInDatabase(nonMutualFollowers)
  await UnfollowBot(nonMutualFollowers, page)
};

startInstagramUnfollowBot();
