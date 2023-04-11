import './Category.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {NavDropdown} from 'react-bootstrap'

const Category = () => {

    const [show, setShow] = useState(false)

    const showDorpdown = (e) => {
        setShow(true)
    }

    const hideDropdown = (e) => {
        setShow(false)
    }

    return (
        <div className='category-content'>
            <div className="category-nav">
                <div className="category-div category-news"
                    onMouseOver={showDorpdown}
                    onMouseOut={hideDropdown}>
                    <Link className='category-link' 
                        to="/list/post/1">
                        <div className='category-text'>
                            뉴스
                        </div>
                    </Link>
                </div>
                

                <div className="category-div">
                    <Link className='category-link' 
                            to="/list/post/2">
                        <div className='category-text'>
                            리뷰
                        </div>
                    </Link>
                </div>

                <div className="category-div">
                    <Link className='category-link'
                        to="/list/post/3">
                        <div className='category-text'>
                            Games
                        </div>
                    </Link>

                </div>
            </div>
            <div className='drop-div'>
            {show &&
            <div className='drop-menu' onMouseOver={showDorpdown}
                    onMouseOut={hideDropdown}>
                
                <div className='drop-items'>
                    <div className='dropdown-news'>
                        <Link className='dropdown-link'
                            to="/list/post/4">
                            <div className='dropdown-item'>
                                PS5
                            </div>
                        </Link>
                    </div>
                    <div className='dropdown-news'>
                        <Link className='dropdown-link' 
                            to="/list/post/5">
                            <div className='dropdown-item'>
                                SWITCH
                            </div>
                        </Link>
                    </div>
                    <div className='dropdown-news'>
                        <Link className='dropdown-link' 
                            to="/list/post/6">
                            <div className='dropdown-item'>
                                XBOX
                            </div>
                        </Link>
                    </div>
                    <div className='dropdown-news'>
                        <Link className='dropdown-link' 
                            to="/list/post/7">
                            <div className='dropdown-item'>
                                PC
                            </div>
                        </Link>
                    </div>
                    <div className='dropdown-news'>
                        <Link className='dropdown-link' 
                            to="/list/post/8"
                            >
                            <div className='dropdown-item'>
                                모바일
                            </div>
                        </Link>
                    </div>
                </div>
                
            </div>
        }
        </div>
        </div>
    )
}

export default Category