const express = require('express')
const app = express()
const port = 5000

//mongoose를 이용해서 앱과 몽고디비 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://chaticker:chacha@youtubeclone.8lxfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    //에러 방지용 코드
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    //연결이 잘 됐는지 확인
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})