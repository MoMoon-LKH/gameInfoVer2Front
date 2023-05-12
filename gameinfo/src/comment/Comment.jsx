
import React, { useEffect, useState } from 'react';
import "./Comment.css"
import customAxios from '../config/ApiUrl';
import ReplyCommentWindow from './ReplyComment';

const Comment = (props) => {

    const postId = props.postId;
    const type = props.type;
    const [page, setPage] = useState(0)
    const [comments, setComments] = useState([])
    const [total, setTotal] = useState(0)
    const [content, setContent] = useState('');
    const [isReply, setIsReply] = useState(false)

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

    

   

    const onClickCreateComment = () => {

    
        customAxios.post("/comment/news", {
            content: content,
            postId: postId
        })
        .then(response => {
            setTotal(response.data.total)
        })
    
    }

    const onClickCreateReply = (reply, group) => {
        const comment = {
            content: content,
            postId: postId,
            replyMemberId: reply,
            group: group
        }

        customAxios.post("/comment/news", {
            content: content,
            postId: postId,
            replyMemberId: reply,
            group: group

        })
        .then(response => {
            setTotal(response.total)
        })
        .catch(error => {
            alert('댓글 등록에 실패하였습니다')
        })
    }



    useEffect(() => {
        if(type === 'news'){
            getNewsComment(postId)
        }
            
    }, [])


    return (
      <div className='comment-div'>
            <div className='comment-title'>댓글 ({total})</div>
            <div className='comment-body'>
                {comments.map((comment) => (
                    comment.sequence === 0 ?

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
                       
                        <ReplyCommentWindow onClickCreateReply={() => onClickCreateReply(comment.memberId, comment.groups)}
                            content={content} setIsReply={setIsReply} setContent={setContent}/>
                    </div>

                    : 
                    <div className='comment-replys-div' key={comment.id}>
                        
                        <div className='comment-replys'>
                        <div className='comment-replyNickname'>{comment.replyNickname}</div> 
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
                        
                            <ReplyCommentWindow onClickCreateReply={() => onClickCreateReply(comment.memberId, comment.groups)}
                                content={content} setIsReply={setIsReply} setContent={setContent}/>
                        </div>
                    </div>
                ))}
                {!isReply &&
                    <div className='comment-block' >
                        <div className='comment-block-title'>댓글</div>
                        <textarea className='comment-text' value={content} onChange={(e) => setContent(e.target.value)}/>
                        <button className='comment-btn' onClick={() => onClickCreateComment()}>등록</button>
                    </div>
                }
            </div>
      </div>
    );
}; 

export default Comment;