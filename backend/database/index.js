const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/tasklistapp';

async function databaseConnection() {
    try {
        await mongoose.connect(DB_URL)
        console.log('Database Connected')
    } catch (error) {
        console.log(`error while making connection with Database :- ${error}`)
        process.exit(1)
    }
}

databaseConnection()