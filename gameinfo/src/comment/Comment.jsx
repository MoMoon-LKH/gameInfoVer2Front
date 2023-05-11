
import React, { useEffect, useState } from 'react';
import "./Comment.css"
import customAxios from '../config/ApiUrl';
import ReplyComment from './ReplyComment';

const Comment = (props) => {

    const postId = props.postId;
    const type = props.type;
    const [page, setPage] = useState(0)
    const [comments, setComments] = useState([])
    const [total, setTotal] = useState(0)
    const [content, setContent] = useState('');

    const getNewsComment = async (id) => {
        customAxios.get("/comment/news/" + id, {
            params: {
                page: page
            }
        })
        .then(response => {
            setTotal(response.data.total)
            setComments(response.data.list)
        })
    }

    

    const ajaxCreateComment = (data) => {
        customAxios.post("/comment/news", {
            content: data.content,
            postId: data.postId,
            replyMemberId: data?.replyId ?? null 
        })
        .then(response => {
            setTotal(response.total)
            setComments(response.data.list)
        })
    }

    const onClickCreateComment = () => {
        const comment = {
            content: content,
            postId: postId
        }

        ajaxCreateComment(comment)
    }

    const onClickCreateReply = (reply, group) => {
        const comment = {
            content: content,
            postId: postId,
            replyMemberId: reply,
            group: group
        }

        ajaxCreateComment(comment)
    }



    useEffect(() => {
        if(type === 'news'){
            getNewsComment(postId)
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
                       
                        <ReplyComment onClickCreateReply={onClickCreateReply(comment.memberId, comment.group)} 
                            content={content} setContent={setContent}/>
                    </div>
                ))}
                <div className='comment-block' >
                    <div className='comment-block-title'>댓글</div>
                    <textarea className='comment-text' onChange={(e) => setContent(e.target.value)}/>
                    <button className='comment-btn' onClick={onClickCreateComment}>등록</button>
                </div>
            </div>
      </div>
    );
}; 

export default Comment;