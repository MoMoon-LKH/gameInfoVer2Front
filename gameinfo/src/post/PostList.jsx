import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import './PostList.css';

const PostList = (props) => {
    
    let ids = props.ids;
    const example = [
        {id: 1, title: 'title1', commentCnt: 1},
        {id: 2, title: 'title2', commentCnt: 5},
        {id: 3, title: 'title3', commentCnt: 4}
    ];
    let [list, setList] = useState(example);

    const postList = list.map(post => (
        <Link to={'/post/' + post.id} key={post.id}>
            <div className='post-item' >
                    <div className='item'>{post.id} </div>
                    <div className='item'>{post.title}</div>
                    <div className='item'>[{post.commentCnt}]</div>
            </div>
        </Link>
    ));

    return (
        <div className='post-list'>
            {postList}
        </div>
    );
};

 export default PostList;