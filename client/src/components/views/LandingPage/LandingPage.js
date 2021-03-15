import React, {useEffect} from 'react'
import axios from 'axios'

function LandingPage() {

    useEffect(() => {
        //get request를 서버에 보냄
        axios.get('/api/hello')
        //서버에서 돌아오는 response를 콘솔창에 출력
        .then(response => console.log(response.data))
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
