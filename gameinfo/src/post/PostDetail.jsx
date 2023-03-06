import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import './PostDetail.css'
import {AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike} from 'react-icons/ai';
import { useState } from 'react';

const PostDetail = (props) => {
    
    const {postId} = useParams();

    const post = {
        title: '포스트 타이틀',
        content: '주의 <div>sdf</div>',
        commentCnt: 23,
        memberId: '1',
        nickname: '작성자',
        view: 15,
        likes: 0,
        dislikes: 0,
        createDate: '2023-02-20 13:50:00'
    }

    return (
        <div>
            <div className='post-div'>
            <div className='post-header'>
                    <div className='post-category'>category</div>
                    <div className='post-title'>
                        {post.title} [{post.commentCnt}]
                    </div>
                    <div className='post-header-sub'>
                        <div className='post-writer'>
                            {post.nickname} ({post.memberId})
                        </div>
                        <div className='post-header-subs'>
                            <div className='post-header-sub-item'>
                                조회수: {post.view}
                            </div>
                            <div className='post-header-sub-item'>
                                {post.createDate}
                            </div>
                        </div>
                    </div>
            </div>
            <div className='post-body'>
                    <div dangerouslySetInnerHTML={{__html: post.content}}></div>
            </div>

            <div className='post-likes-div'>
                <div className='post-likes-btn-div'>
                    <div className='post-likes-num'>
                        {post.likes}
                    </div>
                    <AiOutlineLike size={'30px'}/>
                </div>
                <div className='post-likes-btn-div'>
                <div className='post-likes-num'>
                        {post.dislikes}
                    </div>
                    <AiOutlineDislike size={'30px'}/>
                </div>
            </div>
            
            </div>

            <Comment postId={postId}/>   
        </div>
    );
};

export default PostDetail;