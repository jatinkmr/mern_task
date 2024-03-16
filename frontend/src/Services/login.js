import axios from 'axios'

const loginUrl = 'http://localhost:8023/api/v1/login'
const loginService = async (username, password) => {
    return await axios.post(loginUrl, {
        username,
        password
    })
}

export default loginService
