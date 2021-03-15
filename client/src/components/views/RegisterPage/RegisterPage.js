import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
        const dispatch = useDispatch();
    
        const [Email, setEmail] = useState("")
        const [Password, setPassword] = useState("")
        const [Name, setName] = useState("")
        const [ConfirmPassword, setConfirmPassword] = useState("")
    
        const onEmailHandler = (event) => {
            setEmail(event.currentTarget.value)
        }

        const onNameHandler = (event) => {
            setName(event.currentTarget.value)
        }

        const onPasswordHandler = (event) => {
            setPassword(event.currentTarget.value)
        }

        const onConfirmPasswordHandler = (event) => {
            setConfirmPassword(event.currentTarget.value)
        }
    
        const onSubmitHandler = (event) => {
            event.preventDefault();

            if(Password !== ConfirmPassword) {
                return alert('비밀번호가 일치하지 않습니다.')
            }
            let body = {
                email: Email,
                password: Password,
                name: Name
            }
            //registerUser -> user_actions.js에서 만들어주기
            dispatch(registerUser(body))
                .then(response => {
                    if(response.payload.registerSuccess) {
                        props.history.push('/login')
                    } else {
                        alert('Failed to sign up')
                    }
                })
        }

    return (
        <div style = {{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}} >
            <form style ={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler} >
                <lable>Email</lable>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <lable>Name</lable>
                <input type="text" value={Name} onChange={onNameHandler} />

                <lable>Password</lable>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <lable>Confirm Password</lable>
                <input type="Password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>       
        </div>
    )
}

export default RegisterPage
