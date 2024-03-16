const User = require('./user')

const createNewUser = async reqBodyData => {
    return await User.create(reqBodyData)
}

const isUserExist = async username => {
    return await User.findOne({
        username
    })
}

module.exports = {
    createNewUser,
    isUserExist
}