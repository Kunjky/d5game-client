import { uniqueNamesGenerator, names } from 'unique-names-generator'
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';


function getAvatar(socketId) {
    const avatar = createAvatar(bigSmile, {
        seed: socketId,
        backgroundColor: ['b6e3f4','c0aede','d1d4f9', 'ffd5dc', 'ffdfbf'],
        // ... other options
    });
    return avatar.toString()
}

const AVATAR_URL = 'https://api.dicebear.com/5.x/big-smile/svg?backgroundColor=b6e3f4,c0aede,d1d4f9&seed='

function generateUserInfo(socketId) {
    const config = {
        dictionaries: [names],
        seed: socketId
    }
    const username = uniqueNamesGenerator(config)
    const avatar = getAvatar(socketId)

    return {
        id: socketId,
        username,
        avatar
    }
}


export default generateUserInfo
