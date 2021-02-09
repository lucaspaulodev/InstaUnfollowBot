const FollowersBot = require('./FollowersBot')
const FollowingBot = require('./FollowingBot')
const UnfollowBot = require('./UnfollowBot')

async function startInstagramUnfollowBot() {
  const followersProfiles = await FollowersBot()
  const {followingProfiles, page} = await FollowingBot()

  const nonMutualFollowers = followingProfiles.filter(profile => !(followersProfiles.includes(profile)))

  await UnfollowBot(nonMutualFollowers, page)
};

startInstagramUnfollowBot();