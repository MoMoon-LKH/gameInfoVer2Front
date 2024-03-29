import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comment from '../comment/Comment';
import './PostDetail.css'
import {AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike} from 'react-icons/ai';
import { useState, useEffect } from 'react';
import customAxios from '../config/ApiUrl';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

const PostDetail = (props) => {
    
    const {newsId} = useParams();
    const [post, setPost] = useState({});
    const navigator = useNavigate()

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

    const onClickUpdate = (e) => {
        customAxios.get('/auth/news/' + newsId)
        .then(response => {
            if(response.data == true) {
                navigator('/news/update/' + newsId, {state:{post: post}})
            } else {
                alert(response.data.message)
            }
        
        })
        .catch(error => {
            if(error.response.status == 401) {
                alert('로그인 후 이용해주세요')
                navigator('/login')
            } else {
                alert(error.response.data.message)
            }
        })
    }

    const onClickDelete = (e) => {
        customAxios.delete('/news/' + newsId)
        .then(response => {
            if(response.status == 200){
                alert("삭제되었습니다")
                navigator('/list/news/0')
            } else if(response.status == 401) {
                alert("해당 권한이 없습니다")
            } else {
                alert("삭제에 실패하였습니다")
            }
        })
        .catch(error => {
            alert("삭제에 실패하였습니다")
        })
    }


    return (
        <div>
            <div className='post-div'>
                <div className='post-header'>
                        <div className='post-category'> 뉴스 / {post.platformDto?.name}</div>
                        <div className='post-title'>
                            {post?.title}
                        </div>
                        <div className='post-header-sub'>
                            <div className='post-writer'>
                                {post?.memberDto?.nickname} ({post.memberDto?.id})
                            </div>
                            <div className='post-header-subs'>
                                <div className='post-header-sub-item'>
                                    조회수: {post?.views}
                                </div>
                                <div className='post-header-sub-item'>
                                    {post?.createDate}
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

                <div className='post-detail-btn'>
                    <button className='detail-btn' onClick={onClickUpdate}>수정</button>
                    <button className='detail-btn' onClick={onClickDelete}>삭제</button>
                </div>
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
            

            <Comment postId={newsId} type={'news'}/>   
        </div>
    );
};

export default PostDetail;