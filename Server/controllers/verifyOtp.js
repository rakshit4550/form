const User = require('../models/User');

const verifyOtp = async(req, res, next) => {
    const { otp } = req.body;

    try {
        const findedUser = await User.findOne({'otp.otp':otp})
        if(!findedUser) {
            const error = new Error('Invalid OTP')
            error.statusCode = 400
            throw error
        }

        if(new Date(findedUser.otp.sendTime).getTime() < new Date().getTime()){
            const error = new Error('OTP Expired')
            error.statusCode = 400
            throw error
        }
        findedUser.otp.otp = null;
        await findedUser.save();

        res.status(200).json({message:'OTP Verified', status:true});
    } catch (error) {
        return next(error);
    }
}

module.exports = verifyOtp;