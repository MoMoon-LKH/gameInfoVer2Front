import './Header.css';

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './../auth/useAuth';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import customAxios from '../config/ApiUrl';

const Header = () => {

    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('gameinfo'))

    const logout = () => {
        customAxios.post("/auth/logout",{},
        {
            headers: {Authorization: auth.accessToken}
        })
        .then(response => {
            localStorage.removeItem('gameinfo')
            window.location.reload()
        })
        .catch(error => {
            
        })
    
    }

    return (
    <div className="header-nav">
        <div className='header-item'>
            <Link to={'/'}>
                <div className='logo'>
                    GameInfo
                </div>
            </Link>
        </div>

        {auth == null ? 
            <div className='header-item'>
                <div className='header-sub'>
                </div>
                <div className='header-sub'>
                    <Link to={'/login'}><button className='login-btn'>로그인</button></Link>
                </div>
            </div>
        :
            <div className='header-item'>
                <div className='header-sub'>
                    {auth.member.nickname} 님                    
                </div>
                <div className='header-sub'>                
                        <button className='login-btn' onClick={() => logout()}>로그아웃</button>
                </div>
            </div>
        }
    </div>
    );
};

export default Header;