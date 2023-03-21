import React from 'react';
import './Login.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './useAuth';
import {backUrl, customAxios} from './../config/ApiUrl';


const Login = () => {

    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [pwd, setPwd] = useState("");

    const [idMsg, setIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");

    const {auth, setAuth} = useAuth()

    const loginApi = () => {
        
        let bool = true;

        if(id == ""){
            setIdMsg("아이디를 입력해주세요")
            bool = false;
        }
        if(pwd == ""){
            setPwdMsg("비밀번호를 입력해주세요")
            bool = false;
        }

        if(bool){
            axios.post(backUrl + "/auth/login", 
            {
                loginId: id,
                password: pwd
            }, {
                withCredentials: true
            })
            .then(response => {
                const data = response.data;
                localStorage.setItem('gameinfo', JSON.stringify(data));
                navigate("/")
            })
            .catch(error => {
                const data = error.response.data;
                if(data.status === 400){
                    alert(data.message)
                }
            })
        }
    }

    const handleEnter = (event) => {
        if(event.keyCode === 13) {
            loginApi()
        }
    }


    return (
        <div className='login-form'>
            <div className='login-logo'>
                GameInfo
            </div>
            <div className='login-content'>
                <div className='login-item'>
                    <div className='login-label'>아이디</div>
                    <input id='loginId' className='login-input' type={'text'} placeholder='ID' onChange={e => setId(e.target.value)} onKeyUp={e => handleEnter(e)}/>
                    <div className='check-msg'>{idMsg}</div>
                </div>
                <div className='login-item'>
                    <div className='login-label'>비밀번호</div>
                    <input id='password' className='login-input' type={'password'} placeholder='PASSWORD' onChange={e => setPwd(e.target.value)} onKeyUp={e => handleEnter(e)}/>
                    <div className='check-msg'>{pwdMsg}</div>
                </div>
                <div className='login-item'>
                    <div className='login-sub'>
                        <Link to=''><div className='login-sub-link'>ID/PW 찾기</div></Link>
                        <Link to='/register/terms'><div className='login-sub-link'>회원가입</div></Link>
                    </div>
                </div>
                <div className='login-item-btn'>
                    <button className='btn-login'onClick={() => loginApi()}>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;       