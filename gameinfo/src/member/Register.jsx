import React from 'react';
import './Register.css'
import { useState } from 'react';

const Register = () => {

    const [loginId, setLoginId] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");

    const confirmId = () => {
        alert(loginId)
    }

    const confirmPw = () => {

    }


    return (
        <div className='register-form'>
            <div className='register-title'>
                회원가입
            </div>
            <div className='register-body'>
                <div className='register-precautions'><span className='register-point'>* 표시는 필수입력 사항입니다</span></div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 아이디</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='loginId' className='register-input' type={'text'} onChange={e => setLoginId(e.target.value)}/>
                    </div>
                    <input type={'button'} className='verify-btn' onClick={() => confirmId()} value={'중복확인'}/>
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 비밀번호</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='pwd' className='register-input' type={'password'} onChange={e => setPwd(e.target.value)}/>
                    </div>
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 비밀번호 확인</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='confirmPwd' className='register-input' type={'password'}/>
                    </div>
                </div>
                

            </div>
        </div>
    );
};

export default Register;