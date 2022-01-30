const client = require("../utils/twitterClient.js")
const sharp = require("sharp")
const axios = require("axios")

const updateBanner = async (imagePath) => {
    await client.v1.updateAccountProfileBanner(imagePath, {width: 1500, height: 500});
}

const getFollowers = async () => {
    try {
        const followers = await client.v2.followers(process.env.DOMS_TWITTER_ID)
        return followers.data.slice(0, 3)
    } catch (e) {
        console.error(e)
        throw new Error("Couldn't get followers")
    }
}

const getUserProfileImage = async (user_id) => {
    try {
        const {profile_image_url} = await client.v1.user({user_id});
        const {data} = await axios.get(profile_image_url, {
            responseType: "arraybuffer"
        })

        return data


    } catch (e) {
        console.error(e)
        throw new Error("Couldn't get users profile image")
    }
}

module.exports = {updateBanner, getUserProfileImage, getFollowers}