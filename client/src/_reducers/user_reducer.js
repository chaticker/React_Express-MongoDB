import {
    LOGIN_USER
} from '../_actions/types';

//전 state와 현재 state를 nextState로 만듦
//다른 type이 올 때마다 다른 조치를 취하기 위해 switch문 사용
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            //...state: 스프레드 오퍼레이터 -> 똑같이 가져오는 역할(빈 상태 나타냄)
            return { ...state, loginSuccess: action.payload }
            
        default:
            return state;
    }
}