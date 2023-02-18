import './Header.css';

import React from 'react';
import { Link } from 'react-router-dom';

const header = () => {
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
                <Link to={'/login'}><button>로그인</button></Link>
            </div>
        </div>
    </div>
    );
};

export default header;