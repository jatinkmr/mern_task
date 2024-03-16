const Bcrypt = require('bcrypt')
const { createNewUser, isUserExist } = require('../model/user/service')
const jwt = require('jsonwebtoken')

const newUserRegisterController = async (req, res, next) => {
    try {
        const { name, password, username } = req.body
        const isUserNameExist = await isUserExist(username)
        if (isUserNameExist) {
            return res.status(200).json({
                error: true,
                message: 'Username already registered'
            })
        }
        const salt = await Bcrypt.genSalt(10)
        let bcryptedPassword = await Bcrypt.hash(password, salt)

        const response = await createNewUser({
            name,
            password: bcryptedPassword,
            username
        })

        if (response) {
            return res.status(201).json({
                error: false,
                message: 'User reigstered Successfully'
            })
        }
    } catch (error) {
        next(error)
    }
}

const userLoginController = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const isUserNameExist = await isUserExist(username)
        if (!isUserNameExist) {
            return res.status(200).json({
                error: true,
                message: 'Username not exist'
            })
        }

        const validPass = await Bcrypt.compare(password, isUserNameExist.password);
        if (!validPass) {
            return res.status(400).send('Invalid Password !!');
        }

        const token = jwt.sign({
            _id: isUserNameExist._id
        }, 'TOKEN_SECRET', {
            expiresIn: '1d'
        })

        return res.status(200).json({
            error: false,
            token,
            userData: isUserNameExist
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    newUserRegisterController,
    userLoginController
}