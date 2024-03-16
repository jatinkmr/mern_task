const router = require('express').Router();
const { newUserRegisterController, userLoginController } = require('../controller/register');
const { fetchAllTaskController, newTaskCreationController, removeTaskController, updateExistingNoteController } = require('../controller/notes')
const tokenVerification = require('./tokenAvailability')

router.post('/new-register', newUserRegisterController);
router.post('/login', userLoginController)

router.get('/fetch-task', tokenVerification, fetchAllTaskController)
router.post('/create-task', tokenVerification, newTaskCreationController)
router.delete('/remove-exist/:noteid', tokenVerification, removeTaskController)
router.put('/update-exist-note', tokenVerification, updateExistingNoteController)

module.exports = router;
