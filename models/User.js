const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else { 
        next()
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword와 데이터베이스에 있는 암호화된 password가 맞는지 체크
	//plainPassword를 암호화 한 후에 맞는치 체크
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        //비밀번호가 같이 않은 경우 err
        if (err) return cb(err);
        //비밀번호가 같은 경우 err없이 isMatch가 true가 되도록 함 -> 다시 index.js의 comparePassword로 돌아옴👆🏻
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    //jsonwebtoken 이용해 토큰 생성
	//user._id + 'secretToken' = token 생성 -> 나중에 토큰 해석 할 때 secretToken을 넣으면 user._id가 나옴
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function (err, user) {
        if (err) return cb(err)
        //err없고, user 정보만 전달 -> index.js의 generateToken으로 돌아옴👆🏻
        cb(null, user)
    })
}


const User = mongoose.model('User', userSchema)

module.exports = {User}