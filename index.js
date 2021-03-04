const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');
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

app.post('/api/users/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, userInfo) =>{
    if (err) return res.json({ success: false, err }) 
    return res.status(200).json({
      success: true
    }) 
  }) 
})

app.post('/api/users/login', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) =>{
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 사용자가 없습니다."
      })
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

//인증 관련 라우트
//auth -  미들웨어 : /api/users/auth에서 req를 받은 후에 callback F 하기 전에 중간에서 어떤 작업을 하는 것 (middleware/auth.js)
app.get('/api/users/auth', auth, (req, res) => {
  //여기까지 왔다는 건 미들웨어를 성공적으로 통과 했다는 의미 !!Authentication이 true라는 것!!
  //인증이 됐으니, 유저 정보 제공
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //role이 0이 아니면 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})