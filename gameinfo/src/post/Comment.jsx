
import React, { useEffect, useState } from 'react';
import "./Comment.css"
import customAxios from '../config/ApiUrl';

const Comment = (props) => {

    const postId = props.postId;
    const type = props.type;
    const [page, setPage] = useState(0)
    const [comments, setComments] = useState([])
    const [total, setTotal] = useState(0)
    const [content, setContent] = useState('');
    const [isReply, setIsReply] = useState(false);

    const getNewsComment = async () => {
        customAxios.get("/comment/news/" + postId, {
            params: {
                page: page,
            }
        })
        .then(response => {

        })
    }

    const replyDiv = () => {
        return ( 
            <div className='comment-block' style={isReply ? {display:'block'} : {display:'none'}}>
                <textarea className='comment-text' onChange={(e) => setContent(e.target.value)}/>
                <button className='comment-btn'>등록</button>
            </div>
        )
    }


    useEffect(() => {
        if(type === 'news'){

        }
            
    }, [postId, type])


    return (
      <div className='comment-div'>
            <div className='comment-title'>댓글 ({total})</div>
            <div className='comment-body'>
                {comments.map((comment) => (
                    <div className='comment' key={comment.id}>
                        <div className='comment-top'>
                            <div className='comment-top-left'>
                                <div className='comment-id'>{comment.id}</div>
                                <div className='comment-top-info comment-nickname' >
                                    {comment.nickname}
                                </div>
                                <div className='comment-top-info comment-create'>
                                    ({comment.createDate})
                                </div>        
                            </div>
                            <div className='comment-top-right'>
                                <div>like dislike</div>
                            </div>
                        </div>
                        
                        <div className='comment-content'>
                            {comment.content}
                        </div>
                        <div className='comment-reply'>
                            <div>
                                <button>답글</button>
                            </div>
                            
                        </div>
                    </div>
                ))}
                <div className='comment-block' >
                    <div className='comment-block-title'>댓글</div>
                    <textarea className='comment-text' />
                    <button className='comment-btn'>등록</button>
                </div>
            </div>
      </div>
    );
}; 

export default Comment;