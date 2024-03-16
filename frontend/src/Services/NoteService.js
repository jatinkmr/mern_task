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

const taskFetchUrl = 'http://localhost:8023/api/v1/fetch-task'
const taskFetchService = async () => {
    return await axios.get(taskFetchUrl, headerConfig)
}

const taskRemoveUrl = 'http://localhost:8023/api/v1/remove-exist'
const removeTaskService = async taskId => {
    return await axios.delete(`${taskRemoveUrl}/${taskId}`, headerConfig)
}

const taskUpdateUrl = 'http://localhost:8023/api/v1/update-exist-note'
const updateTaskService = async reqBodyData => {
    return await axios.put(taskUpdateUrl, reqBodyData, headerConfig)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    taskCreationService,
    taskFetchService,
    removeTaskService,
    updateTaskService
}
