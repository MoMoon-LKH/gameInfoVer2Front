
import React from 'react';
import "./Comment.css"

const Comment = (props) => {

    const postId = props.postId;

    const comments = [
        {
            id: 1,
            memberId: 1,
            nickname: '작성자',
            content: '댓글 내용',
            createDate: '2023-02-20 15:12:30'
        },
        {
            id: 2,
            memberId: 2,
            nickname: '작성자2',
            content: '댓글 내용',
            createDate: '2023-02-20 15:12:30'
        }
    ]


    return (
      <div className='comment-div'>
            <div className='comment-title'>댓글</div>
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
                    </div>
                ))}
                
            </div>
      </div>
    );
}; 

export default Comment;