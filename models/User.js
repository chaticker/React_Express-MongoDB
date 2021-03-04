const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, //cha ticker에 대한 스페이스를 없애주는 역할 -> chaticker(cha ticker@naver.com)
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
    //user가 관리자가 될 수도 있고, 일반 유저가 될 수도 있음
    role:{
        type: Number,
        //role을 지정하지 않으면 임의로 0을 주겠다는 의미
        default: 0
    },
    image: String,
    //token을 이용해서 유효성을 검사
    token: {
        type: String,
    },
    //토큰 사용 기간 설정
    tokenExp: {
        type: Number
    }
})


const User = mongoose.model('User', userSchema)

//모델을 다른 파일에서도 쓰기 위함
module.exports = {User}