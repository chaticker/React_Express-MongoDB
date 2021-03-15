import axios from 'axios';
import {
    LOGIN_USER
} from './types';

//액션 함수 구현
//LoginPage.js의 axios.post('/api/user/login',body).then(response => {}) 부분을 여기로 옮김
//사용자의 email과 password를 파라미터를 통해 받음
export function loginUser(dataToSubmit) {
    //서버에서 받은 데이터를 request에 저장
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    //_reducers/user_reducer.js로 데이터 보내기 -> reducer로 보내기
    return {
        type: LOGIN_USER,
        payload: request

    }
}