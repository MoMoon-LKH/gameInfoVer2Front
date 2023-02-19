import React from 'react';
import './RegisterTerms.css';
import { Link, useNavigate} from 'react-router-dom';

const RegisterTerms = () => {

    const navigate = useNavigate();
    const terms = "terms";
    const personal = "personal";
    
    function btnTerms() {
        let termsCheck = document.getElementById('terms-checkbox').checked;
        let personalCheck = document.getElementById('personal-checkbox').checked;

        if(termsCheck < 1) {
            alert('이용약관에 동의 해주세요')
        } else if (personalCheck < 1) {
            alert('개인정보 수집 약관에 동의 해주세요')
        } else {
            navigate('/register')
        }
    }

    return (
        <div className='register-terms'>
            <div className='register-title'>
                회원가입
            </div>
            <div className='terms-body'>
                <div className='terms'>
                    <div className='terms-title'>
                       GameInfo 이용약관
                    </div>
                    <textarea readOnly value={terms}></textarea>
                    <div className='terms-check'>
                        <input id='terms-checkbox' className='terms-checkboxs' type={'checkbox'} />
                        <span>동의합니다</span>
                    </div>
                </div>
                <div className='terms'>
                    <div className='terms-title'>
                        개인정보 수집 및 이용에 대한 동의
                    </div>
                    <textarea readOnly value={personal}></textarea>
                    <div className='terms-check'>
                        <input id='personal-checkbox' className='terms-checkboxs' type={'checkbox'} />
                        <span>동의합니다</span>
                    </div>
                </div>
                
            </div>

            <div className='terms-btn-div'>
                <button className='terms-btn' onClick={btnTerms}>가입</button>
            </div>
        </div >
    );
};

export default RegisterTerms;