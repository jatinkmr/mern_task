const router = require('express').Router();
const { newUserRegisterController, userLoginController } = require('../controller/register');
const { fetchAllTaskController, newTaskCreationController, removeTaskController } = require('../controller/task')
const tokenVerification = require('./tokenAvailability')

router.post('/new-register', newUserRegisterController);
router.post('/login', userLoginController)

router.get('/fetch-task', tokenVerification, fetchAllTaskController)
router.post('/create-task', tokenVerification, newTaskCreationController)
router.delete('/remove-exist/:noteid', tokenVerification, removeTaskController)

module.exports = router;
