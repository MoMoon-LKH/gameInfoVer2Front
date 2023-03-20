import React, { useEffect } from 'react';
import './Register.css'
import { useState, useCallback } from 'react';
import axios from 'axios';
import {backUrl} from './../config/ApiUrl';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [emailId, setEmailId] = useState("");
    const [authNum, setAuthNum] = useState("");
    const [phoneNo, setPhoneNo] = useState("");

    const [loginIdMsg, setLoginIdMsg] = useState("");
    const [pwdMsg, setPwdMsg] = useState("");
    const [confirmPwdMsg, setConfirmPwdMsg] = useState("");
    const [boolId, setBoolId] = useState(false);
    const [boolPwd, setBoolPwd] = useState(false);
    const [boolConfirmPwd, setBoolConfirmPwd] = useState(false);
    const [boolAuthNum, setBoolAuthNum] = useState(false);
    const [authNumMsg, setAuthNumMsg] = useState("");

    const confirmId = () => {
        if(loginId.length < 5) {
            setLoginIdMsg("최소 5자 이상 입력해주세요");
        } else {
            axios.get(backUrl + "/members/duplicate-loginId?loginId=" + loginId)
            .then(response => {
                    
                    setBoolId(true)
                    setLoginIdMsg("사용가능한 아이디입니다")
            })
            .catch(error => {
                if(error.response.data.status == 409) {
                    setBoolId(false)
                    setLoginIdMsg("중복되는 아이디가 존재합니다")
                }
            })
        }
    }

    const checkConfirmPwd = useCallback(() => {
        if(confirmPwd !== ''){
            if(pwd !== confirmPwd) {
                setConfirmPwdMsg("입력하신 비밀번호와 다릅니다");
                setBoolConfirmPwd(false);
            } else {
                setConfirmPwdMsg("");
                setBoolConfirmPwd(true);
            }
        }
    },[pwd, confirmPwd])


    const sendEmailAuthNum = () => {

        setBoolAuthNum(false)

        if(email != "") {
            alert("인증메일이 발송되었습니다");
            axios.post(backUrl + "/email/authenticate", {
                email: email
            })     
            .then(response => {
                setEmailId(response.data.id);
            })   
        } else {
            alert("인증메일을 입력해주세요")
        }
        
        
    }
   
    const confirmAuthNum = () => {

        if(emailId != ""){
            
            axios.get(backUrl + "/email/verify-number/" + emailId + "?authNum=" + authNum)
            .then(response => {
                if(response.data){
                    setBoolAuthNum(true)
                    setAuthNumMsg('인증 되었습니다')
                }
            })
            .catch(error => {
                if(error.response.data.status == 400) {
                    setAuthNumMsg(error.response.data.message)
                }

                if(error.resopnse.data.status == 404) {
                    setAuthNumMsg('재전송 후 인증해주시길 바랍니다')
                }
            })
        } else {
            setAuthNumMsg("인증메일을 보내주세요")
        }
    }   

    useEffect(()=>{

        const regPwd = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/);

        if(pwd !== "") {            
            if(!regPwd.test(pwd)){
                setPwdMsg("최소 8글자, 최소 하나의 문자, 숫자, 특수문자를 입력해주세요");
                setBoolPwd(false);
            } else {
                setPwdMsg("");
                setBoolPwd(true);
            }
        }

        checkConfirmPwd();
        
    }, [pwd, checkConfirmPwd]);

    useEffect(() => {
        checkConfirmPwd();
    }, [confirmPwd, checkConfirmPwd])


    useEffect(() => {
        setBoolId(false)
        if(loginId.length < 5) {
            setLoginIdMsg("최소 5자 이상 입력해주세요")
        } else {
            setLoginIdMsg("");
        }
    }, [loginId])

    const registerMember = () => {

        let bool = true;

        const registerInfo = {
            loginId: loginId,
            password: pwd,
            name: name,
            birthday: birthday,
            nickname: nickname,
            phoneNo: phoneNo.replace('-', ''),
            email: email,
            boolCertifiedEmail: boolAuthNum
        }

        if(!boolId) {
            bool = false;
            alert('아이디 중복확인 해주세요')
        }else if(!boolPwd || !boolConfirmPwd) {
            bool = false;
            alert('비밀번호를 확인해주세요')
        }else if(!boolAuthNum) {
            bool = false;
            alert('이메일 인증을 해주세요')
        }

        if(bool){
            ajaxRegister(registerInfo);
        }
    }

    const ajaxRegister = (info) => {

        axios.post(backUrl + "/members/register", info)
        .then(response => {
            alert("회원가입이 완료되었습니다")
            navigate('/login')

        })
        .catch(error => {
            const data = error.response.data;
            
            if(data.status === 409) {
                alert(data.message)
            }
        })
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
                    <span className='check-msg'> {loginIdMsg}</span>
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 비밀번호</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='pwd' className='register-input' type={'password'} onChange={e => setPwd(e.target.value)}/>
                    </div>
                    <div className='register-input-div'>
                        <div className='check-msg'>{pwdMsg}</div>
                    </div>
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 비밀번호 확인</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='confirmPwd' className='register-input' type={'password'} onChange={e => setConfirmPwd(e.target.value)}/>
                    </div>
                    
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 이름</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='name' className='register-input' type={'text'} onChange={e => setName(e.target.value)}/>
                    </div>
                </div>

                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 생년월일</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='birthday' className='register-input' type={'text'} 
                        onChange={e => setBirthday(e.target.value)} placeholder={' ex) 19960212 주민번호 앞자리'}/>
                    </div>
                </div>
                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 닉네임</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='nickname' className='register-input' type={'text'} onChange={e => setNickname(e.target.value)}/>
                    </div>
                </div>

                <div className='register-div-email'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'><span className='register-point'>*</span> 이메일</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='email' className='register-input' type={'text'} 
                        onChange={e => setEmail(e.target.value)} placeholder={' ex) test@gmail.com'}/>
                        <button className='verify-btn' onClick={() => sendEmailAuthNum()}>전송</button>
                        <div className='register-input-email'>
                            <div style={{fontSize: '13px'}}>인증번호 : </div>
                            <input type={'text'} onChange={e => setAuthNum(e.target.value)}/><button className='verify-btn' onClick={() => confirmAuthNum()}>확인</button>
                            <span className='check-msg'> {authNumMsg}</span>
                        </div>
                    </div>
                </div>

                <div className='register-div'>
                    <div className='register-sub-title'>
                        <div className='sub-title-content'> 핸드폰 번호</div>
                    </div>
                    <div className='register-input-div'>
                        <input id='phoneNo' className='register-input' type={'text'} onChange={e => setPhoneNo(e.target.value)}
                            placeholder={' ex) 010-xxxx-xxxx'}/>
                    </div>
                </div>

                <div className='register-btn-div'>
                    <button className='register-btn' onClick={() => registerMember()}>회원가입</button>
                </div>

            </div>
        </div>
    );
};

export default Register;