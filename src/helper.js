import { uniqueNamesGenerator, names } from 'unique-names-generator'
const AVATAR_URL = 'https://api.dicebear.com/5.x/big-smile/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed='

function generateUserInfo(socketId) {
    const config = {
        dictionaries: [names],
        seed: socketId
    }
    const username = uniqueNamesGenerator(config)
    const avatar = AVATAR_URL + socketId

    return {
        id: socketId,
        username,
        avatar
    }
}


export default generateUserInfo
