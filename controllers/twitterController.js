const client = require("../utils/twitterClient.js")
const axios = require("axios")

const updateBanner = async (imagePath) => {
    try {
        await client.v1.updateAccountProfileBanner(imagePath, {width: 1500, height: 500});
    } catch (e) {
        console.log('update banner failed')
        console.error(e)
    }
}

const getFollowers = async () => {
    try {
        const followers = await client.v2.followers(process.env.TWITTER_ID)
        return followers.data.slice(0, 5)
    } catch (e) {
        console.error(e)
        if (e.rateLimit) {
            console.log('Requests available in: ', e.rateLimit.reset)
        }
        throw new Error("Couldn't get followers")
    }
}

const getUserProfileImage = async (user_id) => {
    const defaultImage = "https://hosting101451.af98b.netcup.net/default_profile_normal.jpg"

    let image;
    try {
        const {profile_image_url} = await client.v1.user({user_id});

        if (profile_image_url.endsWith(".png")) {
            image = defaultImage
        } else {
            image = profile_image_url
        }

        console.log('IMAGE', image)
    } catch (e) {
        console.log("Error fetching image")
        console.error(e)
    }

    try {
        const {data} = await axios.get(image, {
            responseType: "arraybuffer"
        })
        return data
    } catch (e) {
        console.log("Error creating image buffer")
        console.error(e)
    }

}

const tweetGoodMorning = async () => {
    try {
        await client.v1.tweet("Good Morning everyone! (This is an automated tweet)\n" +
            " #100DaysOfCode #5amClub")
    } catch (e) {
        console.error(e)
        throw new Error("Couldn't make the tweet")
    }
}

module.exports = {updateBanner, getUserProfileImage, getFollowers, tweetGoodMorning}