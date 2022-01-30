const sharp = require("sharp")
const path = require("path")
const fs = require("fs")
const Jimp = require("jimp")
const fsPromises = fs.promises;

const saveFollowerAvatar = async (name, imageBuffer) => {
    console.log('saving follower avatas', name)
    await sharp(imageBuffer)
        .resize(100, 100)
        .toFile(`./images/avatars/${name}.png`)
}

const createBanner = async () => {
    console.log("creating banner")
    const banner = await Jimp.read(`${path.join(__dirname, '../images')}/banner.jpg`)
    const files = await fsPromises.readdir(path.join(__dirname, '../images/avatars'))

    let index = 0
    for (const avatar of files) {
        const imgPath = `${path.join(__dirname, "../images/avatars/")}${avatar}`
        const image = await Jimp.read(imgPath)

        const x = 600 + index * (100 + 10);
        banner.composite(image, x, 350);
        index++
    }

    try {
        await banner.writeAsync(`${path.join(__dirname, "../images/")}1500x500_final.png`);
        console.log("finished")
    } catch (e) {
        console.error(e)
    }

}

module.exports = {createBanner, saveFollowerAvatar}
