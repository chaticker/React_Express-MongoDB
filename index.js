const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const config = require('./config/dev');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());



const mongoose = require('mongoose');
const { response } = require('express');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! nodemon으로 실행하깃')
})

app.post('/register', (req, res) => {
  const user = new User(req.body)
  //save하기 전에 비밀번호 암호화 필요 -> mongoose 기능 사용

  user.save((err, userInfo) =>{
    if (err) return res.json({ success: false, err }) 
    return res.status(200).json({
      success: true
    }) 
  }) 
})

//로그인 라우트
app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) =>{
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다."
      })
    }
    //요청한 이메일이 있다면, 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
      //비밀번호가 일치하면 user를 위한 토큰 생성
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        //토큰을 쿠키, 로컬 스토리지 등에 저장 (여기선 쿠키에 저장)
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})