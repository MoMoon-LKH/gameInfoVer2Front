import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className='login-form'>
            <div className='login-logo'>
                GameInfo
            </div>
            <div className='login-content'>
                <div className='login-item'>
                    <div className='login-label'>아이디</div>
                    <input id='loginId' className='login-input' type={'text'} placeholder='ID'/>
                </div>
                <div className='login-item'>
                    <div className='login-label'>비밀번호</div>
                    <input id='password' className='login-input' type={'password'} placeholder='PASSWORD'/>
                </div>
                <div className='login-item'>
                    <span>ID/PW 찾기</span>
                    <span>회원가입</span>
                </div>
                <div className='login-item-btn'>
                    <button className='btn-login'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;       