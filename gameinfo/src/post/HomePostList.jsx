import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import './HomePostList.css'

const HomePostList = (props) => {
    
    const example = [
        {id: 1, title: 'title1', commentCnt: 1},
        {id: 2, title: 'title2', commentCnt: 5},
        {id: 3, title: 'title3', commentCnt: 4}
    ];
    let [list, setList] = useState();

    return (
        <div className='post-list'>
            <div className='post-lists'>
            {props.list.map((post, index) => {
                    if (index % 2 === 0){
                        return(
                            <div className='post-item' key={post.id}>
                                <div className='item item-title'> 
                                    <Link className='title-a' to={'/news/' + post.id} key={post.id}>
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                })}        
            </div>
            <div className='post-lists'>
                {props.list.map((post, index) => {
                    if (index % 2 === 1){
                        return(
                            <div className='post-item' key={post.id}>
                                <div className='item item-title'> 
                                    <Link className='title-a' to={'/news/' + post.id} key={post.id}>
                                        {post.title}
                                    </Link>
                                </div>
                            </div>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
           

        </div>
    );
};

 export default HomePostList