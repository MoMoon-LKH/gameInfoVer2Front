
import React from 'react';

const Comment = (props) => {

    const postId = props.postId;

    const comments = [
        {
            id: 1,
            memberId: 1,
            nickname: '작성자',
            content: '댓글 내용',
            createDate: '2023-02-20 15:12:30'
        }
    ]


    return (
      <div className='comment-div'>
            <div className='comment-title'>댓글</div>
            <div className='comment-body'>
                {comments.map((comment) => (
                    <div className='comments'>
                        <div className='comment-info'>
                            <div>{comment.id}</div>
                            <div>{comment.nickname}</div>
                        </div>
                        <div className='comment-content'>
                            {comment.content}
                        </div>
                        <div className='comment-create'>
                            {comment.createDate}
                        </div>        
                    </div>
                ))}
                
            </div>
      </div>
    );
}; 

export default Comment;