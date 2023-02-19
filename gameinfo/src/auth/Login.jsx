import React from 'react';
import './Login.css';
import {Link} from 'react-router-dom';

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
                    <div className='login-sub'>
                        <Link to=''><div className='login-sub-link'>ID/PW 찾기</div></Link>
                        <Link to='/register/terms'><div className='login-sub-link'>회원가입</div></Link>
                    </div>
                </div>
                <div className='login-item-btn'>
                    <button className='btn-login'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;       