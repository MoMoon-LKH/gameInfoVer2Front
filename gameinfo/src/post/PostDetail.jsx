import React from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import './PostDetail.css'
import {AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import axios from 'axios';
import customAxios from '../config/ApiUrl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor, { ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';

const PostDetail = (props) => {
    
    const {newsId} = useParams();
    const [post, setPost] = useState({});

    // const post = {
    //     title: '포스트 타이틀',
    //     content: '주의 <div>sdf</div>',
    //     commentCnt: 23,
    //     memberId: '1',
    //     nickname: '작성자',
    //     view: 15,
    //     likes: 0,
    //     dislikes: 0,
    //     createDate: '2023-02-20 13:50:00'
    // }

    const ajaxPostDetail = async (id) => {
        customAxios.get('/news/' + id)
        .then(response => {
            if(response.status === 200){
                setPost(response.data)
            }
        })
    }

    useEffect(() => {
        ajaxPostDetail(newsId)
    }, [newsId])

    return (
        <div>
            <div className='post-div'>
            <div className='post-header'>
                    <div className='post-category'>category</div>
                    <div className='post-title'>
                        {post.title}
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
                <CKEditor className='editor'
                    editor={Editor}
                    disabled={true}
                    config={{
                        toolbar: 'none',
                        isReadOnly: true
                    }}

                    data={post.content}
                />
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

            <Comment postId={newsId} type={'news'}/>   
        </div>
    );
};

export default PostDetail;