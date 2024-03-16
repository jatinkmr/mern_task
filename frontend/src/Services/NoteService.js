import axios from 'axios'

let headerConfig = {
    headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token')
    }
}

const taskCreationUrl = 'http://localhost:8023/api/v1/create-task'
const taskCreationService = async reqBodyData => {
    return await axios.post(taskCreationUrl, reqBodyData, headerConfig)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    taskCreationService
}