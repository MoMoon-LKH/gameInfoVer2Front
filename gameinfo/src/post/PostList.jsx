import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import './PostList.css';
import { useContext } from 'react';
import AuthContext from '../auth/AuthContext';
import useAuth from './../auth/useAuth';

const PostList = (props) => {
    
    let ids = props.ids;
    const example = [
        {id: 1, title: 'title1', commentCnt: 1},
        {id: 2, title: 'title2', commentCnt: 5},
        {id: 3, title: 'title3', commentCnt: 4}
    ];
    let [list, setList] = useState(example);

    return (
        <div className='post-list'>
            <div className='posts'>
                {list.map(post => (                    
                    <div className='post-item' >
                        <div className='item item-title'> 
                            <Link className='title-a' to={'/post/' + post.id} key={post.id}>
                                {post.title}
                            </Link>
                        </div>
                        <div className='item'>[{post.commentCnt}]</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

 export default PostList;