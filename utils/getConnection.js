const mongoose = require('mongoose');

const getConnection = () => {
    try {
        mongoose.connect(process.env.MONGO_URI).then((connection)=>{
            console.log('Db is Connected')
        }).catch((error) =>{
            console.log('failed to Connect')
        })
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = getConnection;