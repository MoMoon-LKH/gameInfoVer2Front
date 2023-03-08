import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from './../auth/useAuth';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';

const Header = () => {

    const {auth} = useAuth()

    return (
    <div className="header-nav">
        <div className='header-item'>
            <Link to={'/'}>
                <div className='logo'>
                    GameInfo
                </div>
            </Link>
        </div>
        <div className='header-item'>
            <div className='header-sub'>
                <Link to={'/login'}><button className='login-btn'>로그인</button></Link>
            </div>
        </div>
    
    </div>
    );
};

export default Header;