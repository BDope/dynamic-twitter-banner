const sharp = require("sharp")
const fs = require("fs")
const Jimp = require("jimp")
const {getFollowers, getUserProfileImage, updateBanner} = require("./twitterController");
const fsPromises = fs.promises;

const saveFollowerAvatar = async (name, imageBuffer) => {
    console.log('saving follower avatars', name)
    await sharp(imageBuffer)
        .resize(100, 100)
        .toFile(`./images/avatars/${name}.png`)
}

const createBanner = async (bannerPath) => {
    console.log("creating banner")
    const banner = await Jimp.read(bannerPath)
    const files = await fsPromises.readdir('./images/avatars')

    let index = 0
    for (const avatar of files) {
        if (avatar !== '.gitkeep') {
            const imgPath = `./images/avatars/${avatar}`
            const image = await Jimp.read(imgPath)

            const x = 475 + index * (100 + 10);
            banner.composite(image, x, 380);
            index++
        }
    }


    try {
        await banner.writeAsync(`./images/1500x500_final.png`);
        console.log("finished")
    } catch (e) {
        console.log('create banner failed')
        console.error(e)
    }

}
const generateBanner = async () => {
    console.log('start generating banner!')

    try {
        const followers = await getFollowers()
        for (const follower of followers) {
            console.log("get follower images")
            const imageBuffer = await getUserProfileImage(follower.id)
            try {
                await saveFollowerAvatar(follower.id, imageBuffer)
            } catch (e) {
                console.log("follower of followers")
                console.error(e)
            }
        }

        await createBanner(process.env.BANNER_PATH)
        await updateBanner("./images/1500x500_final.png")

    } catch(e) {
        console.log("generateBanner knallt")
        console.error(e)
    }


}

module.exports = {createBanner, saveFollowerAvatar, generateBanner}