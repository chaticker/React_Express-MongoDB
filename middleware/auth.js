const { User } = require("../models/User");

//인증 처리 하는 곳
let auth = (req, res, next) => {
    //1. 클라이언트 쿠키에서 토큰 가져오기 -> cookie-parser 이용
    let token = req.cookies.x_auth;
    //2. 토큰을 복호화 한 후 유저 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        //유저가 없다면
        if(!user) return res.json({ isAuth: false, error: true })
        //유저가 있다면
        req.token = token;
        req.user = user;
        //next하는 이유는 미들웨어에서 일을 끝내고 갈 수 있게 하기 위함
        next();
    })
    //3. 유저가 있으면 인증 됨

    //4. 유저가 없으면 인증 안됨
}

//다른 파일에서도 쓸 수 있도록 하기 위함
module.exports = { auth };