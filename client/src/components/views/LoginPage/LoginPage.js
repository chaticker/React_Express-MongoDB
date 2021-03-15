// import axios from 'axios'
// import { response } from 'express'
// import { response } from 'express';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function LoginPage(props) {
    const dispatch = useDispatch();

    //state 안에서 서버에 보내고자 하는 값을 받는 중
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        //페이지 리프레시(원래 해야할 일을 하는 게 아닌)를 막기 위함
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        //dispatch를 이용해서 액션 취하기
        //_actions/user_action.js에 액션 구현
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    //페이지 이동 시
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

        //서버에 데이터 보내기
        //body에 Email, Password 값 담기
        //server/index.js 안에 있는 로그인 라우트 경로로 보냄
        //axios.post('/api/users/login',body)
        //redux로는 어떻게 사용될까? -> 복잡,,
        //.then(response => {
        //})
    }

    return (
        <div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
            <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <lable>Password</lable>
                <input type="Password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    Login
                </button>
            </form>       
        </div>
    )
}

export default LoginPage
