import instance from './instance'

function getUserInfo(...params) {
    return instance.post('/user/getUserInfo', ...params)
}

const httpService = {
    getUserInfo: getUserInfo
}

export default httpService
